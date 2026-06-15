import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy initialize Gemini client to avoid crashing if GEMINI_API_KEY is not set immediately
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required. Please set it in Settings > Secrets.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// Parse owner and repo from various formats of GitHub input
function parseRepoUrl(urlInput: string): { owner: string; repo: string } | null {
  const trimmed = urlInput.trim().replace(/\/+$/, "");
  if (!trimmed) return null;

  // Pattern matches:
  // - https://github.com/owner/repo
  // - owner/repo
  // - github.com/owner/repo
  let cleanInput = trimmed;
  if (cleanInput.startsWith("http://") || cleanInput.startsWith("https://")) {
    try {
      const url = new URL(cleanInput);
      if (url.hostname === "github.com") {
        const parts = url.pathname.split("/").filter(Boolean);
        if (parts.length >= 2) {
          return { owner: parts[0], repo: parts[1].replace(".git", "") };
        }
      }
    } catch (_) {
      // ignore parsing errors and try regex
    }
  }

  // Strip github.com/ if present
  cleanInput = cleanInput.replace(/^(https?:\/\/)?(www\.)?github\.com\//i, "");

  const parts = cleanInput.split("/").filter(Boolean);
  if (parts.length >= 2) {
    return { owner: parts[0], repo: parts[1].replace(".git", "") };
  }

  return null;
}

// API endpoint for repository analysis
app.post("/api/analyze", async (req, res) => {
  const { url } = req.body;
  if (!url) {
    res.status(400).json({ error: "Repository URL or identifier is required." });
    return;
  }

  const parsed = parseRepoUrl(url);
  if (!parsed) {
    res.status(400).json({ error: "Invalid repository coordinate. Must be a GitHub URL or 'owner/repo' format." });
    return;
  }

  const { owner, repo } = parsed;

  try {
    // 1. Fetch from GitHub API
    const headers: Record<string, string> = {
      "User-Agent": "OSS-Navigator-AI-Intelligence-Engine",
      "Accept": "application/vnd.github.v3+json",
    };

    // Attempt to download repo details
    const repoResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}`, { headers });
    if (!repoResponse.ok) {
      if (repoResponse.status === 404) {
        res.status(404).json({ error: `Repository '${owner}/${repo}' was not found on GitHub. Please check spelling or verify if it is public.` });
        return;
      }
      const errText = await repoResponse.text();
      console.error("GitHub API error status:", repoResponse.status, errText);
      throw new Error(`GitHub metadata request failed with status: ${repoResponse.status}`);
    }

    const repoData = await repoResponse.json();

    // Attempt to download root directory list to understand structure
    let rootContents: any[] = [];
    try {
      const contentsResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents`, { headers });
      if (contentsResponse.ok) {
        rootContents = await contentsResponse.json();
      }
    } catch (contentsErr) {
      console.warn("Failed to retrieve directory structure details:", contentsErr);
    }

    // Prepare metadata for Gemini
    const metadata = {
      owner: repoData.owner?.login || owner,
      name: repoData.name || repo,
      description: repoData.description || "No description provided.",
      stars: repoData.stargazers_count,
      forks: repoData.forks_count,
      language: repoData.language || "Unknown",
      openIssues: repoData.open_issues_count || 0,
      url: repoData.html_url || `https://github.com/${owner}/${repo}`,
      files: rootContents.map(f => ({ name: f.name, type: f.type, path: f.path })),
      updated_at: repoData.updated_at,
    };

    // 2. Invoke Gemini to generate full intelligence report
    const ai = getGeminiClient();
    const prompt = `You are an expert developer and contributor onboarding tutor. Analyze this GitHub repository and generate a beginner-friendly developer roadmap in JSON format.
Below is the real repository metadata fetched from GitHub API:
${JSON.stringify(metadata, null, 2)}

Your response MUST be a single clean JSON object matching the following structure exactly (do NOT include any markdown block formatting around the JSON, just raw JSON. It should match the RepoAnalysis type):
{
  "owner": "${metadata.owner}",
  "name": "${metadata.name}",
  "url": "${metadata.url}",
  "overview": {
    "purpose": "Detailed explanation of what the project does, its core value, and how it solves real problems, specifically tailored for beginner developers.",
    "description": "Short 1-2 sentence high-level summary of the repository.",
    "technologies": [
      { "name": "TechnologyName", "color": "Tailwind-compatible color hex or valid hex like #F7DF1E" }
    ],
    "difficulty": "Beginner" | "Intermediate" | "Advanced",
    "stars": "${metadata.stars >= 1000 ? (metadata.stars / 1000).toFixed(1) + 'K' : metadata.stars}",
    "forks": "${metadata.forks >= 1000 ? (metadata.forks / 1000).toFixed(1) + 'K' : metadata.forks}",
    "language": "${metadata.language}",
    "openIssues": ${metadata.openIssues},
    "friendlinessScore": 1-100 score number indicating how onboarding-friendly this repo is,
    "onboardingTime": "Estimated time to get standard dev environment running locally, e.g. '30 minutes', '2 hours', '1 day'",
    "recommendedContributions": "Short summary advising what part of the code a beginner should look at first.",
    "healthScore": 1-100 score representing repository overall engineering health, safety guidelines, and commit patterns,
    "readyScore": 1-100 score representing contribution onboarding maturity level,
    "contributorsCount": 10-1000 approximate number of active contributors,
    "lastUpdated": "Human-friendly timespan since last updated, e.g. '2 days ago', 'last week'"
  },
  "structure": [
    {
      "id": "unique-id-1",
      "path": "Name of root level folder or main file found in 'files' list above",
      "type": "folder" | "file",
      "purpose": "Beginner-friendly description of what this directory or file does in the project.",
      "importance": "High" | "Medium" | "Low"
    }
  ],
  "gettingStarted": {
    "forkDesc": "Actionable instructions on how they should fork github.com/${metadata.owner}/${metadata.name}.",
    "cloneCommand": "git clone https://github.com/YOUR_USERNAME/${metadata.name}.git",
    "setupCommands": [
      {
        "description": "Install dependencies (e.g. npm install, pip install, bundle install, etc.)",
        "command": "Dependency installation command"
      },
      {
        "description": "Run locally (e.g. npm run dev, python main.py, rails server, cargo run, etc.)",
        "command": "Local run command"
      },
      {
        "description": "Create branch (e.g. checkout clean branch)",
        "command": "git checkout -b contribution-patch"
      },
      {
        "description": "Make contribution (e.g. record modifications)",
        "command": "git add . && git commit -m 'feat: custom improvement'"
      },
      {
        "description": "Create Pull Request (e.g. push back to origin fork)",
        "command": "git push origin contribution-patch"
      }
    ],
    "prerequisites": [
      "Prerequisite item (e.g. Node.js v18.x+, Python 3.10+, or Git)"
    ]
  },
  "roadmap": {
    "suggestedFirstSteps": [
      {
        "title": "Descriptive task title",
        "desc": "Actionable explanation of how to begin, where to find info, etc.",
        "category": "Code" | "Docs" | "Community"
      }
    ],
    "beginnerIdeas": [
      {
        "title": "Specific simple beginner issue proposal",
        "filesInvolved": "e.g. 'docs/README.md', 'src/utils/logger.ts'",
        "difficulty": "Easy" | "Medium",
        "description": "Concrete explanation of what file to change and what code logic to write."
      }
    ],
    "prChecklist": [
      "Item for pull request submittal, e.g. 'Create a separate branch', 'Be sure to format code', 'Verify tests'"
    ]
  },
  "learningOutcomes": [
    {
      "title": "Educational skill name",
      "desc": "What the developer will learn by exploring this repository.",
      "icon": "Lucide icon name (choose from: Cpu, Layers, Globe, Code, Key, Radio, Database, Shield, Layout, GitBranch, Settings)"
    }
  ],
  "architectureOverview": "Beginner-friendly explanation of the structural architecture pattern of this system, design patterns and how parts communicate.",
  "beginnerStartGuide": "Step-by-step guidance describing exactly where a beginner developer should click or look first in the codebase, and what file blocks to read.",
  "canIContribute": {
    "contributionScore": 1-100 score indicating newcomer accessibility,
    "beginnerScore": 1-100 ease of entry indicator,
    "learningScore": 1-100 value of concept knowledge acquired,
    "complexityScore": 1-100 code baseline complexity rating,
    "recommendation": "Strongly Recommended" | "Recommended" | "Not Recommended Yet",
    "reasoning": "A short, highly encouraging, personalized commentary summarizing why they should get involved, potential speed-bumps, and mentor advice."
  }
}

Please make sure all structure entries match actual files/folders found in the metadata or make intelligent logical inferences. Provide a highly accurate, exciting, educational response. Ensure output is perfectly parseable JSON. Do not add any extra wrapping characters, markdown, or text.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("Received an empty response from Gemini content generator.");
    }

    try {
      const parsedAnalysis = JSON.parse(text.trim());
      res.json(parsedAnalysis);
    } catch (parseError) {
      console.error("Failed to parse Gemini output as JSON. Output was:", text);
      res.status(502).json({
        error: "Failed to parse the Gemini output format as valid structured JSON.",
        rawOutput: text
      });
    }

  } catch (error: any) {
    console.error("Analysis controller caught an error:", error);
    res.status(500).json({ error: error.message || "An unexpected error occurred during repository analysis." });
  }
});

// Serve frontend assets
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // Configure Vite dev server middleware
    const vite = await createViteServer({
      server: { middlewareMode: true, host: "0.0.0.0", port: PORT },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development server middleware mounted in Express.");
  } else {
    // Serve static files in production
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[OSS Navigator AI Server] running on http://localhost:${PORT}`);
  });
}

startServer();
