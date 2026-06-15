import React, { useState, useMemo } from "react";
import { RepoTechnology } from "../types";
import { Check, Sparkles, BookOpen, AlertCircle, Compass, Terminal, ShieldAlert, Cpu } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Props {
  technologies?: RepoTechnology[];
}

// Preset popular developers skills to toggle
const POPULAR_SKILLS = [
  "React", "TypeScript", "JavaScript", "Node.js", "Express", "Python", "Rust", 
  "Tailwind CSS", "Vite", "PostgreSQL", "Docker", "Git", "HTML/CSS", "Next.js"
];

export default function SkillMatcher({ technologies = [] }: Props) {
  const [selectedSkills, setSelectedSkills] = useState<string[]>(["JavaScript", "Git", "HTML/CSS"]);
  const [customSkill, setCustomSkill] = useState("");

  const repoTechNames = useMemo(() => {
    return technologies.map(t => t.name.toLowerCase());
  }, [technologies]);

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const handleAddCustomSkill = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanSkill = customSkill.trim();
    if (cleanSkill && !selectedSkills.map(s => s.toLowerCase()).includes(cleanSkill.toLowerCase())) {
      setSelectedSkills(prev => [...prev, cleanSkill]);
      setCustomSkill("");
    }
  };

  const clearSkills = () => {
    setSelectedSkills([]);
  };

  // Calculations
  const calculations = useMemo(() => {
    if (technologies.length === 0) {
      return { score: 100, matched: [], missing: [], prepTime: "0 mins", recommendation: "You have all tools in hand!" };
    }

    const matched: string[] = [];
    const missing: string[] = [];

    technologies.forEach(tech => {
      const isMatched = selectedSkills.some(skill => 
        skill.toLowerCase() === tech.name.toLowerCase() ||
        (tech.name.toLowerCase().includes("react") && skill.toLowerCase().includes("react")) ||
        (tech.name.toLowerCase().includes("ts") && skill.toLowerCase().includes("ts")) ||
        (tech.name.toLowerCase().includes("node") && skill.toLowerCase().includes("node"))
      );

      if (isMatched) {
        matched.push(tech.name);
      } else {
        missing.push(tech.name);
      }
    });

    const totalRepoTechs = technologies.length;
    const matchRatio = matched.length / totalRepoTechs;
    const score = Math.round(matchRatio * 100);

    // Dynamic preparation estimates based on quantity of missing core languages
    let prepTime = "0 mins";
    let recommendation = "You are fully equipped to build! Dive into the backlog.";

    if (score < 100) {
      if (score >= 60) {
        prepTime = "30 - 45 mins";
        recommendation = `Excellent alignment! You possess matching core skill sets. Spending ${prepTime} investigating the project's utility files or custom modules should get you fully up to speed.`;
      } else if (score >= 30) {
        prepTime = "2 - 3 hours";
        recommendation = `Good baseline! We recommend spending ${prepTime} looking at simple code blocks or reviewing specific definitions for ${missing.slice(0, 2).join(" & ")} before making logic changes.`;
      } else {
        prepTime = "1 - 2 days";
        recommendation = `This codebase uses languages outside your current direct spectrum. Allocate ${prepTime} to run the local examples and review documentation for ${missing.join(", ")} before hacking.`;
      }
    }

    return { score, matched, missing, prepTime, recommendation };
  }, [technologies, selectedSkills]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
      id="skill-matcher-section"
    >
      {/* Intro Box */}
      <div className="flex flex-col md:flex-row gap-6 bg-slate-900/40 border border-slate-800 p-6 rounded-2xl backdrop-blur-md">
        
        {/* Dynamic Circular alignment Gauge */}
        <div className="flex flex-col items-center justify-center p-6 bg-slate-950/60 rounded-2xl border border-slate-850 w-full md:w-80 text-center space-y-4">
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">Aignment Engine</span>
          
          <div className="relative w-36 h-36 flex items-center justify-center">
            {/* Background circle */}
            <svg className="absolute w-full h-full transform -rotate-90">
              <circle
                cx="72"
                cy="72"
                r="64"
                className="stroke-slate-800/80 fill-none"
                strokeWidth="8"
              />
              <motion.circle
                cx="72"
                cy="72"
                r="64"
                className="stroke-cyan-400 fill-none"
                strokeWidth="8"
                strokeDasharray={2 * Math.PI * 64}
                initial={{ strokeDashoffset: 2 * Math.PI * 64 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 64 * (1 - calculations.score / 100) }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </svg>
            <div className="text-center space-y-0.5">
              <span className="text-3xl font-display font-extrabold text-white">
                {calculations.score}%
              </span>
              <span className="text-[9px] font-mono text-cyan-300 block uppercase tracking-wider">Matching</span>
            </div>
          </div>
          
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-slate-200">
              Skill Match Score
            </h4>
            <span className="text-[10px] text-slate-500 font-mono">
              Based on {technologies.length} core technologies
            </span>
          </div>
        </div>

        {/* Dynamic alignment review */}
        <div className="flex-1 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-1.5 text-xs text-cyan-400 font-mono">
              <Sparkles className="w-4 h-4 flex-shrink-0" /> Target Gap Analysis
            </div>
            <h3 className="text-lg font-semibold text-white">Your Skill Alignment Map</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              {calculations.recommendation}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Matched Core Specialties */}
            <div className="p-4 bg-slate-950/40 border border-slate-900 rounded-xl space-y-2">
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold font-mono">
                <Check className="w-4 h-4 flex-shrink-0" /> Specialties Met ({calculations.matched.length})
              </div>
              <div className="flex flex-wrap gap-1.5">
                {calculations.matched.length > 0 ? (
                  calculations.matched.map(m => (
                    <span key={m} className="text-[10px] font-mono bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-md">
                      {m}
                    </span>
                  ))
                ) : (
                  <span className="text-[10px] text-slate-500 font-mono">No target technologies matched yet.</span>
                )}
              </div>
            </div>

            {/* Missing Gaps */}
            <div className="p-4 bg-slate-950/40 border border-slate-900 rounded-xl space-y-2">
              <div className="flex items-center gap-1.5 text-xs text-amber-400 font-semibold font-mono">
                <AlertCircle className="w-4 h-4 flex-shrink-0" /> Missing Gaps ({calculations.missing.length})
              </div>
              <div className="flex flex-wrap gap-1.5">
                {calculations.missing.length > 0 ? (
                  calculations.missing.map(m => (
                    <span key={m} className="text-[10px] font-mono bg-amber-500/10 border border-amber-500/20 text-amber-300 px-2 py-0.5 rounded-md">
                      {m}
                    </span>
                  ))
                ) : (
                  <span className="text-[10px] font-mono bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-md">
                    ✨ Gapless! Fully aligned
                  </span>
                )}
              </div>
            </div>

          </div>

          <div className="p-3.5 bg-cyan-950/10 border border-cyan-500/10 rounded-xl flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-3.5 text-cyan-400" />
              <span className="text-[11px] text-slate-400 font-sans">Recommended Onboard preparation:</span>
            </div>
            <span className="text-xs font-mono font-bold text-white bg-slate-950 px-3 py-1 rounded-full border border-slate-800">
              {calculations.prepTime}
            </span>
          </div>

        </div>

      </div>

      {/* Select Your Skills Interface */}
      <div className="bg-slate-900/20 border border-slate-850 rounded-2xl p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/60 pb-4">
          <div className="space-y-1">
            <h4 className="text-sm font-mono text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Terminal className="w-4 h-4 text-indigo-400" /> Toggle Interactive Skillset
            </h4>
            <p className="text-xs text-slate-400">Select which tools and frameworks you currently feel confident with or write yours below.</p>
          </div>
          {selectedSkills.length > 0 && (
            <button 
              onClick={clearSkills}
              className="text-[10px] font-mono border border-slate-800 hover:border-slate-700 bg-slate-950/40 text-slate-400 hover:text-slate-200 px-2.5 py-1 rounded-md transition-colors"
            >
              Clear Checklist
            </button>
          )}
        </div>

        {/* Preset list buttons */}
        <div className="flex flex-wrap gap-2.5">
          {POPULAR_SKILLS.map(skill => {
            const isSelected = selectedSkills.includes(skill);
            return (
              <button
                key={skill}
                onClick={() => toggleSkill(skill)}
                className={`text-xs px-3 py-1.5 rounded-xl border font-sans font-medium transition-all ${
                  isSelected 
                    ? "bg-indigo-500/15 border-indigo-500/40 text-indigo-300 shadow-[0_0_8px_rgba(99,102,241,0.1)]" 
                    : "bg-slate-950/40 border-slate-850 hover:border-slate-800 text-slate-400 hover:text-slate-300"
                }`}
              >
                {skill}
              </button>
            );
          })}
        </div>

        {/* Custom skill input form */}
        <form onSubmit={handleAddCustomSkill} className="flex gap-2.5 max-w-sm pt-2">
          <input
            type="text"
            placeholder="Type custom skill (e.g. Docker, GraphQL)..."
            value={customSkill}
            onChange={(e) => setCustomSkill(e.target.value)}
            className="flex-1 text-xs font-sans px-3 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-slate-300 focus:outline-none focus:border-indigo-500 placeholder-slate-600 transition-colors"
          />
          <button
            type="submit"
            className="text-xs font-semibold bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-xl transition-colors shrink-0 cursor-pointer"
          >
            Add Skill
          </button>
        </form>

      </div>
    </motion.div>
  );
}
