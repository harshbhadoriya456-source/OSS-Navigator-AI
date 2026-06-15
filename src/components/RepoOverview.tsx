import { RepoOverview as IRepoOverview } from "../types";
import { Star, GitFork, AlertCircle, Sparkles, ShieldCheck, Clock, Award, Code2, HeartHandshake, Users, Calendar, Activity, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";

interface Props {
  overview: IRepoOverview;
  owner: string;
  name: string;
}

export default function RepoOverview({ overview, owner, name }: Props) {
  // Determine difficulty styling
  const difficultyBadgeColor = (diff: string) => {
    switch (diff) {
      case "Beginner":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "Intermediate":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "Advanced":
        return "bg-rose-500/10 text-rose-400 border-rose-500/20";
      default:
        return "bg-slate-500/10 text-slate-400 border-slate-500/20";
    }
  };

  const difficultyDesc = (diff: string) => {
    switch (diff) {
      case "Beginner":
        return "Great for first-time open-source contributors! Low complexity templates, heavy automation, and explicit styling guides.";
      case "Intermediate":
        return "Requires foundational understanding of backend/frontend libraries, event listeners, and standard dependency cycles.";
      case "Advanced":
        return "Deep logic pathways, core monorepo layouts, low-level compilers, algorithms performance, or intensive asynchronous routing hierarchies.";
      default:
        return "";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
      id="repo-overview-section"
    >
      {/* Visual Header Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* Core Stats / Identity Card */}
        <div className="lg:col-span-2 glass-panel rounded-2xl p-6 flex flex-col justify-between transition-colors">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center gap-1 w-fit shadow-[0_0_10px_rgba(6,182,212,0.15)]">
                <Sparkles className="w-3.5 h-3.5" /> Project Overview
              </span>
              
              {overview.language && (
                <span className="text-xs font-mono text-cyan-300 bg-slate-950/60 px-2.5 py-1 rounded-md border border-cyan-500/15">
                  PRIMARY: <span className="text-white font-semibold">{overview.language}</span>
                </span>
              )}
            </div>
            
            <h3 className="text-2xl font-display font-bold text-white tracking-tight">
              {owner} / <span className="text-cyan-400 neon-glow-cyan">{name}</span>
            </h3>
            
            <p className="text-slate-200 leading-relaxed text-sm">
              {overview.description}
            </p>
          </div>

          <div className="mt-6 pt-5 border-t border-slate-800/60 flex flex-wrap gap-4 items-center justify-between">
            {/* Tech Stack Horizontal List */}
            <div className="flex flex-wrap gap-1.5 items-center">
              <span className="text-xs text-slate-400 mr-1.5 font-mono">STACK:</span>
              {overview.technologies.map((tech) => (
                <span
                  key={tech.name}
                  className="text-xs font-mono px-2.5 py-1 rounded-md bg-slate-900/90 text-slate-200 border border-cyan-500/10 flex items-center gap-1.5"
                >
                  <span
                    className="w-2 h-2 rounded-full inline-block"
                    style={{ backgroundColor: tech.color || "#06b6d4" }}
                  />
                  {tech.name}
                </span>
              ))}
            </div>

            {/* Stars & Forks Counters */}
            <div className="flex gap-3">
              <div className="flex items-center gap-1.5 text-xs font-mono text-slate-300 bg-slate-950/80 px-2.5 py-1 rounded-md border border-cyan-500/15">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20" />
                <span>{overview.stars}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-300 bg-slate-950/80 px-2.5 py-1 rounded-md border border-cyan-500/15">
                <GitFork className="w-3.5 h-3.5 text-cyan-400" />
                <span>{overview.forks}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Difficulty Assessment Card */}
        <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between transition-colors">
          <div className="space-y-4">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">Contributor Level</span>
            
            <div>
              <span className={`inline-block text-sm font-semibold px-3 py-1 rounded-full border ${difficultyBadgeColor(overview.difficulty)}`}>
                {overview.difficulty} Difficulty
              </span>
            </div>

            <p className="text-xs text-slate-200 leading-relaxed font-sans">
              {difficultyDesc(overview.difficulty)}
            </p>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-800/60 flex items-center gap-2 text-xs text-cyan-400/95 font-mono">
            <ShieldCheck className="w-4 h-4 text-cyan-400 flex-shrink-0" />
            <span>Structured roadmap included below</span>
          </div>
        </div>

      </div>

      {/* Intelligence Dashboard Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Onboarding Friendliness Score */}
        <div className="glass-panel rounded-2xl p-4.5 space-y-3">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono">Contributor Harmony</span>
            <Award className="w-4 h-4 text-cyan-400" />
          </div>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-bold font-display text-white">
                {overview.friendlinessScore || (overview.difficulty === "Beginner" ? 92 : overview.difficulty === "Intermediate" ? 75 : 45)}
              </span>
              <span className="text-xs text-slate-400 font-mono">/100</span>
            </div>
            <span className="text-[10px] text-slate-400 font-sans block mt-1 font-medium text-cyan-300">Beginner-friendliness index</span>
          </div>
          <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-cyan-500 h-full shadow-[0_0_8px_rgba(6,182,212,0.8)] animate-pulse" 
              style={{ width: `${overview.friendlinessScore || (overview.difficulty === "Beginner" ? 92 : overview.difficulty === "Intermediate" ? 75 : 45)}%` }} 
            />
          </div>
        </div>

        {/* Repository Health Score */}
        <div className="glass-panel rounded-2xl p-4.5 space-y-3">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono">Repository Health</span>
            <Activity className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-bold font-display text-white">
                {overview.healthScore || (overview.difficulty === "Beginner" ? 94 : overview.difficulty === "Intermediate" ? 85 : 68)}
              </span>
              <span className="text-xs text-slate-400 font-mono">/100</span>
            </div>
            <span className="text-[10px] text-slate-400 font-sans block mt-1 font-medium text-emerald-400">Code maintenance rating</span>
          </div>
          <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-emerald-400 h-full shadow-[0_0_8px_rgba(52,211,153,0.8)]" 
              style={{ width: `${overview.healthScore || (overview.difficulty === "Beginner" ? 94 : overview.difficulty === "Intermediate" ? 85 : 68)}%` }} 
            />
          </div>
        </div>

        {/* Contribution Readiness Score */}
        <div className="glass-panel rounded-2xl p-4.5 space-y-3">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono">Contribution Readiness</span>
            <CheckCircle2 className="w-4 h-4 text-teal-400" />
          </div>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-bold font-display text-white">
                {overview.readyScore || (overview.difficulty === "Beginner" ? 95 : overview.difficulty === "Intermediate" ? 78 : 55)}
              </span>
              <span className="text-xs text-slate-400 font-mono">/100</span>
            </div>
            <span className="text-[10px] text-slate-400 font-sans block mt-1 font-medium text-teal-400">Onboarding preparation readiness</span>
          </div>
          <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-teal-400 h-full shadow-[0_0_8px_rgba(45,212,191,0.8)]" 
              style={{ width: `${overview.readyScore || (overview.difficulty === "Beginner" ? 95 : overview.difficulty === "Intermediate" ? 78 : 55)}%` }} 
            />
          </div>
        </div>

        {/* Contributor Count */}
        <div className="glass-panel rounded-2xl p-4.5 space-y-3 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono">Contributor Count</span>
            <Users className="w-4 h-4 text-blue-400" />
          </div>
          <div>
            <span className="text-2xl font-bold font-display text-white block">
              {overview.contributorsCount || (name === "react" ? "~1,720+" : name === "express" ? "~315+" : name === "tailwindcss" ? "~220+" : "~45+")}
            </span>
            <span className="text-[10px] text-slate-400 font-sans block mt-1">Active builders on this repository</span>
          </div>
        </div>

        {/* Onboarding Time Estimate */}
        <div className="glass-panel rounded-2xl p-4.5 space-y-3 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono">Onboarding Overhead</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <span className="text-lg font-bold text-slate-200 block truncate">
              {overview.onboardingTime || "Under 30 minutes"}
            </span>
            <span className="text-[10px] text-slate-400 font-sans block mt-1">Est. local setup duration</span>
          </div>
        </div>

        {/* Open Issues Count */}
        <div className="glass-panel rounded-2xl p-4.5 space-y-3 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono">Available Outlets</span>
            <AlertCircle className="w-4 h-4 text-rose-400" />
          </div>
          <div>
            <span className="text-2xl font-bold font-display text-white">
              {overview.openIssues !== undefined ? overview.openIssues : "N/A"}
            </span>
            <span className="text-[10px] text-slate-450 font-sans block mt-1">Active tasks listed on GitHub</span>
          </div>
        </div>

        {/* Primary Language */}
        <div className="glass-panel rounded-2xl p-4.5 space-y-3 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono">Foundational Language</span>
            <Code2 className="w-4 h-4 text-fuchsia-400" />
          </div>
          <div>
            <span className="text-lg font-semibold text-slate-200 block truncate">
              {overview.language || "Multi-stack"}
            </span>
            <span className="text-[10px] text-slate-450 font-sans block mt-1 font-medium">Primary source language</span>
          </div>
        </div>

        {/* Last Updated */}
        <div className="glass-panel rounded-2xl p-4.5 space-y-3 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono">Last Synchronized</span>
            <Calendar className="w-4 h-4 text-cyan-300" />
          </div>
          <div>
            <span className="text-lg font-medium text-slate-200 block truncate">
              {overview.lastUpdated || "Recently"}
            </span>
            <span className="text-[10px] text-slate-400 font-sans block mt-1">Metadata capture sync date</span>
          </div>
        </div>

      </div>

      {/* Conceptual Deep Dive / Project Purpose */}
      <div className="glass-panel rounded-2xl p-6 transition-colors">
        <h4 className="text-xs font-mono text-cyan-400 mb-3 flex items-center gap-2">
          <AlertCircle className="w-4 h-4" /> Understanding the Repository Goal
        </h4>
        <p className="text-slate-200 text-sm leading-relaxed">
          {overview.purpose}
        </p>
      </div>

      {/* Recommended Contribution Callout */}
      {overview.recommendedContributions && (
        <div className="bg-cyan-950/20 border border-cyan-500/20 p-6 rounded-2xl flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 text-cyan-400 flex-shrink-0">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <div className="space-y-1.5">
            <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
              Recommended First Contribution Guidance
            </h4>
            <p className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed">
              {overview.recommendedContributions}
            </p>
          </div>
        </div>
      )}

    </motion.div>
  );
}
