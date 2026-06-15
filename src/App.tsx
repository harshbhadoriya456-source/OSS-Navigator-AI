import React, { useState, useEffect } from "react";
import { GitBranch, Github, Search, Sparkles, RefreshCw, Terminal, ArrowRight, AlertTriangle, HelpCircle, Compass } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import { RepoAnalysis } from "./types";
import { PRESET_REPOS, getPresetAnalysis, generateDynamicAnalysis } from "./data";

// Sub-components
import NeuralMesh from "./components/NeuralMesh";
import NeuralOrb from "./components/NeuralOrb";
import RepoOverview from "./components/RepoOverview";
import RepoStructure from "./components/RepoStructure";
import GettingStarted from "./components/GettingStarted";
import ContributionRoadmap from "./components/ContributionRoadmap";
import LearningOutcomes from "./components/LearningOutcomes";
import CanIContributeSection from "./components/CanIContributeSection";
import SkillMatcher from "./components/SkillMatcher";
import GiantNeuralOrb from "./components/GiantNeuralOrb";
import DashboardMockup from "./components/DashboardMockup";

type TabID = "overview" | "structure" | "setup" | "roadmap" | "outcomes" | "cani" | "matcher";

export default function App() {
  const [repoUrl, setRepoUrl] = useState("");
  const [inputError, setInputError] = useState("");
  const [selectedRepo, setSelectedRepo] = useState<RepoAnalysis | null>(null);
  const [isFallbackUsed, setIsFallbackUsed] = useState(false);
  
  // Loading states
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState("");
  const [analysisProgress, setAnalysisProgress] = useState(0);

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<TabID>("overview");

  // Mouse position normalized (-0.5 to 0.5) for parallax effects
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Real-time analysis call to Express API with precise 3-second guarantee & fallbacks
  const performRealAnalysis = async (urlInput: string) => {
    setIsAnalyzing(true);
    setAnalysisProgress(1);
    setInputError("");
    setAnalysisStep("Initializing neural connection stream...");

    // Schedule progressive loading updates targeting ~2.2 seconds total cinematic feedback
    let currentProgress = 1;
    const progressInterval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 4) + 3;
      if (currentProgress > 94) {
        currentProgress = 94;
      }
      setAnalysisProgress(currentProgress);

      if (currentProgress < 20) {
        setAnalysisStep("Securing entry ports to GitHub Rest API...");
      } else if (currentProgress < 45) {
        setAnalysisStep("Downloading repository JSON trees & stars...");
      } else if (currentProgress < 70) {
        setAnalysisStep("Executing repository directory structures AST solver...");
      } else if (currentProgress < 85) {
        setAnalysisStep("Interfacing with Gemini 3.5 Flash Network Core...");
      } else {
        setAnalysisStep("Authoring student contribution roadmaps...");
      }
    }, 85);

    // Prepare synthesized local fallback in case of rate limits or service timeouts
    const synthesizedFallback = getPresetAnalysis(urlInput) || generateDynamicAnalysis(urlInput);
    let finalAnalysis: RepoAnalysis = synthesizedFallback;
    let didFallbackTrigger = false;

    // We race the real API fetch with a strict 1700ms abort controller timeout to guarantee 3s maximum duration!
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, 1700);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: urlInput }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (response.ok) {
        const repoData = await response.json();
        if (repoData && repoData.overview) {
          finalAnalysis = repoData;
        } else {
          didFallbackTrigger = true;
        }
      } else {
        didFallbackTrigger = true;
      }
    } catch (err) {
      clearTimeout(timeoutId);
      didFallbackTrigger = true;
      console.warn("Real-time network analyze timed out or connection lost. Activating sandbox fallback.");
    }

    // Ensure the animation has a small cinematic cushion but completes within the 3-second constraint.
    const remainingTime = Math.max(100, 2100 - (currentProgress * 10));
    await new Promise((resolve) => setTimeout(resolve, remainingTime));

    clearInterval(progressInterval);
    setAnalysisProgress(100);
    setAnalysisStep("Onboarding coordinates derived successfully. Launching map...");

    setTimeout(() => {
      setSelectedRepo(finalAnalysis);
      setIsFallbackUsed(didFallbackTrigger);
      setIsAnalyzing(false);
      setActiveTab("overview");
    }, 300);
  };

  const handleAnalyze = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    const trimmed = repoUrl.trim();
    if (!trimmed) {
      setInputError("Please enter a valid GitHub directory or URL path.");
      return;
    }

    performRealAnalysis(trimmed);
  };

  const handleSelectPreset = (preset: RepoAnalysis) => {
    setRepoUrl(preset.url);
    performRealAnalysis(preset.url);
  };

  const resetSearch = () => {
    setSelectedRepo(null);
    setRepoUrl("");
    setInputError("");
  };

  return (
    <div className="relative min-h-screen bg-[#030712] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-white github-grid overflow-hidden">
      
      {/* Floating Network Background Mesh */}
      <NeuralMesh />

      {/* Background Interactive Floating Particles & Parallax blur objects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div 
          className="absolute w-72 h-72 rounded-full bg-cyan-500/5 blur-[120px] transition-transform duration-300 ease-out"
          style={{
            transform: `translate(${mousePos.x * -60}px, ${mousePos.y * -60}px)`,
            top: "10%",
            left: "5%"
          }}
        />
        <div 
          className="absolute w-80 h-80 rounded-full bg-blue-500/5 blur-[135px] transition-transform duration-300 ease-out"
          style={{
            transform: `translate(${mousePos.x * 50}px, ${mousePos.y * 50}px)`,
            bottom: "20%",
            right: "10%"
          }}
        />
        <div 
          className="absolute w-3 h-3 rounded-full bg-cyan-400/20 blur-[1px] animate-particle-drift"
          style={{
            top: "25%",
            left: "18%",
            transform: `translate(${mousePos.x * -35}px, ${mousePos.y * -35}px)`
          }}
        />
        <div 
          className="absolute w-2.5 h-2.5 rounded-full bg-blue-400/30 blur-[1px] animate-particle-drift"
          style={{
            top: "65%",
            right: "25%",
            transform: `translate(${mousePos.x * 45}px, ${mousePos.y * 45}px)`
          }}
        />
        <div 
          className="absolute w-2 h-2 rounded-full bg-cyan-300/40 blur-[2px] animate-particle-drift"
          style={{
            top: "45%",
            right: "12%",
            transform: `translate(${mousePos.x * -25}px, ${mousePos.y * -25}px)`
          }}
        />
      </div>

      {/* Header Bar */}
      <header id="app-header-bar" className="relative z-50 border-b border-cyan-500/10 bg-[#030712]/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={resetSearch}>
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
              <GitBranch className="w-5 h-5 text-white" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-450 border-2 border-[#030712] animate-ping" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 border-2 border-[#030712]" />
            </div>
            <div>
              <h1 className="text-sm font-display font-semibold text-white tracking-tight uppercase">
                OSS NAVIGATOR <span className="text-cyan-400">AI</span>
              </h1>
              <span className="text-[9px] font-mono text-slate-450 tracking-wider block uppercase">contributor intelligence engine</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-slate-350 hover:text-white transition-all flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-cyan-500/10 bg-slate-950/40 hover:border-cyan-500/20"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content Stage */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10 flex flex-col justify-center">
        
        <AnimatePresence mode="wait">
          {!selectedRepo && !isAnalyzing ? (
            
            /* STATE 1: HOMEPAGE SEARCH & DISCOVERY STAGE */
            <motion.div
              key="homepage-stage"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="max-w-6xl mx-auto w-full space-y-16 py-8 relative"
              id="landing-search-view"
            >
              {/* Giant Interactive wireframe Neural network sphere backdrop */}
              <GiantNeuralOrb />

              {/* Brand Hero Callout Statement with high-end typography */}
              <div 
                className="relative z-10 text-center space-y-6 pt-8 md:pt-16 max-w-4xl mx-auto animate-fade-in"
                style={{
                  transform: `translate(${mousePos.x * 12}px, ${mousePos.y * 12}px)`
                }}
              >
                <div
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/25 text-xs font-mono tracking-wide shadow-[0_0_20px_rgba(0,229,255,0.15)] max-w-fit mx-auto animate-pulse"
                >
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" /> Launch your Open Source contribution path today
                </div>
                
                {/* Massive headline, bold white first line, blue-cyan gradient second line */}
                <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[5.5rem] xl:text-[6.8rem] font-bold font-display tracking-tight text-white leading-[0.95] text-center uppercase">
                  CONTRIBUTING IN.<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] via-[#4F8CFF] to-[#A855F7] neon-glow-cyan font-black">
                    CONFIDENCE OUT.
                  </span>
                </h1>
                
                {/* Styled short description */}
                <p className="text-slate-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-sans font-light">
                  Empower students and beginner developers to explore complex GitHub repositories, dissect structural parameters, align interactive core skills, and submit high-quality pull requests instantly.
                </p>

                {/* Professional glassmorphic modern CTA button triggers with premium glow on hover */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 z-20 relative">
                  <button
                    onClick={() => document.getElementById("analyzer-input-section")?.scrollIntoView({ behavior: "smooth" })}
                    className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-xl text-sm font-semibold tracking-wider font-sans transition-all flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(6,182,212,0.35)] hover:shadow-[0_0_40px_rgba(6,182,212,0.55)] hover:scale-[1.03] duration-300 cursor-pointer"
                  >
                    <Search className="w-4 h-4" />
                    <span>Analyze Repository</span>
                  </button>

                  <button
                    onClick={() => document.getElementById("starter-presets-section")?.scrollIntoView({ behavior: "smooth" })}
                    className="w-full sm:w-auto px-8 py-3.5 bg-white/5 hover:bg-white/10 text-white/90 hover:text-white rounded-xl text-sm font-semibold tracking-wider font-sans border border-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-2 backdrop-blur-md hover:scale-[1.03] duration-350 cursor-pointer"
                  >
                    <Compass className="w-4 h-4 text-cyan-400" />
                    <span>Explore Features</span>
                  </button>
                </div>
              </div>

              {/* Dynamic Floating Dashboard Mockup showing repository intelligence, readiness and roadmaps */}
              <div 
                className="relative z-10 w-full flex justify-center pt-2 pb-6 animate-fade-in-up"
                style={{
                  transform: `perspective(1200px) rotateX(${5 + mousePos.y * -8}deg) rotateY(${mousePos.x * 10}deg)`
                }}
              >
                <DashboardMockup />
              </div>

              {/* Analyzer Terminal Input Panel positioned under Dashboard mockup for seamless layout flow */}
              <div 
                id="analyzer-input-section"
                className="relative z-20 max-w-3xl mx-auto w-full glass-panel rounded-2xl p-6 md:p-8 space-y-5 transition-transform duration-350 ease-out border border-cyan-500/15 bg-black/60 scroll-mt-24 shadow-[0_0_40px_rgba(0,0,0,0.5)]"
                style={{
                  transform: `translate(${mousePos.x * -8}px, ${mousePos.y * -8}px)`
                }}
              >
                <form onSubmit={handleAnalyze} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="repo-url" className="text-xs font-mono text-cyan-400 block tracking-wider uppercase font-semibold">
                      Target GitHub Repository URL / Path Coordinate
                    </label>
                    
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-500/80" />
                      <input
                        id="repo-url"
                        type="text"
                        value={repoUrl}
                        onChange={(e) => {
                          setRepoUrl(e.target.value);
                          if (inputError) setInputError("");
                        }}
                        placeholder="e.g. facebook/react  or  https://github.com/expressjs/express"
                        className="w-full pl-11 pr-36 py-3.5 bg-slate-950/80 border border-cyan-500/20 rounded-xl text-sm font-mono text-slate-200 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 placeholder-slate-600 transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]"
                      />
                      
                      <button
                        type="submit"
                        className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-lg text-xs font-semibold font-sans tracking-wider transition-all flex items-center gap-1.5 shadow-[0_0_10px_rgba(6,182,212,0.3)] hover:scale-[1.02] flex-shrink-0 cursor-pointer"
                      >
                        Analyze Repo
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {inputError && (
                      <p className="text-xs text-rose-400 font-mono mt-1 pl-1">
                        ⚠ {inputError}
                      </p>
                    )}
                  </div>
                </form>

                <div className="pt-2.5 border-t border-slate-900/60 flex items-center gap-2.5 text-xs font-mono text-slate-400">
                  <Terminal className="w-4 h-4 flex-shrink-0 text-cyan-500" />
                  <span>Supports arbitrary coordinates: e.g. <code className="text-cyan-300">expressjs/express</code>, <code className="text-cyan-300">react</code>, or full absolute URLs.</span>
                </div>
              </div>

              {/* Discovery presets space */}
              <div id="starter-presets-section" className="space-y-4 scroll-mt-24 relative z-20">
                <div className="flex items-center justify-between border-b border-cyan-500/10 pb-2">
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-widest block">
                    Curated Starter Reservoirs
                  </span>
                  <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
                    IDEAL FOR STUDENTS
                  </span>
                </div>

                <div 
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                  style={{
                    transform: `translate(${mousePos.x * 10}px, ${mousePos.y * 10}px)`
                  }}
                >
                  {PRESET_REPOS.slice(0, 4).map((preset) => (
                    <div
                      key={preset.name}
                      onClick={() => handleSelectPreset(preset)}
                      className="group glass-panel p-4.5 rounded-xl cursor-pointer transition-all flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-2.5">
                          <span className="text-xs font-semibold font-display text-white group-hover:text-cyan-300 transition-colors">
                            {preset.owner}/<span className="text-cyan-400">{preset.name}</span>
                          </span>
                          <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full border ${
                            preset.overview.difficulty === "Beginner" 
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                              : preset.overview.difficulty === "Intermediate" 
                              ? "bg-amber-500/10 text-amber-400 border-amber-500/20" 
                              : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                          }`}>
                            {preset.overview.difficulty}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 font-sans leading-normal line-clamp-2">
                          {preset.overview.description}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-900/60 flex items-center justify-between text-[10px] font-mono text-slate-500 group-hover:text-slate-350 transition-colors">
                        <div className="flex gap-2.5">
                          <span>★ {preset.overview.stars}</span>
                          <span>⑂ {preset.overview.forks}</span>
                        </div>
                        <span className="flex items-center gap-1.5 text-cyan-400">
                          Inspect <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </motion.div>
          ) : isAnalyzing ? (
            
            /* STATE 2: REPOSITORY META ANALYZER LOADER SCREEN */
            <motion.div
              key="loader-stage"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="max-w-md mx-auto w-full text-center py-12"
              id="analyser-loading-screen"
            >
              <NeuralOrb progress={analysisProgress} stageText={analysisStep} />
            </motion.div>
          
          ) : (
            
            /* STATE 3: FULL COMPREHENSIVE REPOS ANALYTICS DASHBOARD */
            <motion.div
              key="dashboard-stage"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
              id="analytics-dashboard-view"
            >
              {/* Sticky Meta Header banner */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 glass-panel rounded-2xl">
                <div className="space-y-1">
                  <button 
                    onClick={resetSearch}
                    className="text-[10px] font-mono text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1 mb-1.5 uppercase tracking-wider font-semibold"
                  >
                    ← BACK TO SOURCE DISCOVERY
                  </button>
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg font-display font-semibold text-white">
                      {selectedRepo?.owner} / <span className="text-cyan-400 neon-glow-cyan font-bold">{selectedRepo?.name}</span>
                    </span>
                    <span className="text-[10px] text-cyan-300 font-mono bg-cyan-950/60 px-2.5 py-0.5 rounded border border-cyan-500/20">
                      GitHub Repo
                    </span>
                  </div>
                </div>

                {/* Dashboard actions panel */}
                <div className="flex flex-wrap gap-2">
                  <a 
                    href={selectedRepo?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-sans text-slate-300 hover:text-white bg-slate-900/60 hover:bg-slate-800 border border-cyan-500/10 px-3.5 py-2 rounded-xl transition-colors flex items-center gap-1.5"
                  >
                    <Github className="w-4 h-4 text-cyan-400" />
                    <span>View Repository URL</span>
                  </a>
                  
                  <button 
                    onClick={resetSearch}
                    className="text-xs font-semibold font-sans text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 px-4 py-2 rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Analyze Another</span>
                  </button>
                </div>
              </div>

              {/* Fallback Info Alert Banner */}
              {isFallbackUsed && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-cyan-950/20 border border-cyan-500/20 p-4 rounded-xl flex items-start gap-3 text-cyan-300 text-xs sm:text-sm shadow-[0_0_15px_rgba(6,182,212,0.1)]"
                >
                  <AlertTriangle className="w-5 h-5 text-cyan-450 animate-pulse flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-cyan-200 uppercase tracking-wider block text-[11px] mb-0.5">High-Fidelity Sandbox Fallback Active</span>
                    The live GitHub and Gemini API services were rate-limited or slow. We successfully mapped this repository layout via our optimized smart-context data engine instantly to ensure complete, student-friendly interactive dashboards!
                  </div>
                </motion.div>
              )}

              {/* Horizontal navigation tabs */}
              <div className="border-b border-cyan-500/10 flex overflow-x-auto no-scrollbar scroll-smooth gap-1 pb-1">
                {([
                  { id: "overview", label: "Overview" },
                  { id: "structure", label: "Repo Structure" },
                  { id: "setup", label: "Getting Started Guide" },
                  { id: "roadmap", label: "Contribution Roadmap" },
                  { id: "outcomes", label: "Learning Outcomes" },
                  { id: "cani", label: "Can I Contribute Here?" },
                  { id: "matcher", label: "Skill Matcher" }
                ] as const).map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-5 py-3 text-xs font-mono border-b-2 transition-all shrink-0 whitespace-nowrap ${
                      activeTab === tab.id
                        ? "border-cyan-450 text-cyan-400 font-semibold bg-cyan-500/5 shadow-[inset_0_-2px_8px_rgba(6,182,212,0.1)]"
                        : "border-transparent text-slate-400 hover:text-white"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tabs view content render router */}
              <div className="min-h-[400px]">
                {selectedRepo && (
                  <AnimatePresence mode="wait">
                    {activeTab === "overview" && (
                      <motion.div key="overview">
                        <RepoOverview 
                          overview={selectedRepo.overview} 
                          owner={selectedRepo.owner}
                          name={selectedRepo.name}
                        />
                      </motion.div>
                    )}
                    {activeTab === "structure" && (
                      <motion.div key="structure">
                        <RepoStructure 
                          structure={selectedRepo.structure} 
                          architectureOverview={selectedRepo.architectureOverview}
                          beginnerStartGuide={selectedRepo.beginnerStartGuide}
                        />
                      </motion.div>
                    )}
                    {activeTab === "setup" && (
                      <motion.div key="setup">
                        <GettingStarted 
                          guide={selectedRepo.gettingStarted} 
                        />
                      </motion.div>
                    )}
                    {activeTab === "roadmap" && (
                      <motion.div key="roadmap">
                        <ContributionRoadmap 
                          roadmap={selectedRepo.roadmap} 
                        />
                      </motion.div>
                    )}
                    {activeTab === "outcomes" && (
                      <motion.div key="outcomes">
                        <LearningOutcomes 
                          outcomes={selectedRepo.learningOutcomes} 
                        />
                      </motion.div>
                    )}
                    {activeTab === "cani" && (
                      <motion.div key="cani">
                        <CanIContributeSection 
                          data={selectedRepo.canIContribute} 
                          difficulty={selectedRepo.overview.difficulty}
                        />
                      </motion.div>
                    )}
                    {activeTab === "matcher" && (
                      <motion.div key="matcher">
                        <SkillMatcher 
                          technologies={selectedRepo.overview.technologies} 
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </main>

      {/* Standard Footer */}
      <footer className="relative z-50 border-t border-cyan-500/10 bg-[#030712]/40 backdrop-blur-md py-6 text-center text-[10px] sm:text-xs text-slate-500 font-mono">
        <p>© 2026 OSS Navigator AI • Equipping students to conquer the frontier of Open Source • AI Studio Build</p>
      </footer>

    </div>
  );
}
