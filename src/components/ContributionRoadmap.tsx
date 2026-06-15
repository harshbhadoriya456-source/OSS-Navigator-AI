import { useState } from "react";
import { ContributionRoadmap as IRoadmap } from "../types";
import { BookOpen, Code, Users, CheckCircle2, ListTodo, Activity, ArrowUpRight, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Props {
  roadmap: IRoadmap;
}

export default function ContributionRoadmap({ roadmap }: Props) {
  const [activeCategory, setActiveCategory] = useState<"All" | "Code" | "Docs" | "Community">("All");
  const [checkedPRItems, setCheckedPRItems] = useState<{ [key: number]: boolean }>({});

  const filteredSteps = roadmap.suggestedFirstSteps.filter(
    (step) => activeCategory === "All" || step.category === activeCategory
  );

  const toggleCheck = (idx: number) => {
    setCheckedPRItems((prev) => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const completedCount = Object.values(checkedPRItems).filter(Boolean).length;
  const totalCount = roadmap.prChecklist.length;
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const categoryIcon = (cat: string) => {
    switch (cat) {
      case "Docs":
        return <BookOpen className="w-4 h-4 text-emerald-400" />;
      case "Code":
        return <Code className="w-4 h-4 text-cyan-400" />;
      case "Community":
        return <Users className="w-4 h-4 text-amber-400" />;
      default:
        return <Activity className="w-4 h-4 text-slate-400" />;
    }
  };

  const categoryBadgeStyle = (cat: string) => {
    switch (cat) {
      case "Docs":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "Code":
        return "bg-cyan-500/10 text-cyan-400 border-cyan-500/20";
      case "Community":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      default:
        return "bg-slate-500/10 text-slate-400 border-slate-500/20";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
      id="contribution-roadmap-section"
    >
      {/* Filters & Intro */}
      <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-md space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-lg font-display font-semibold text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-cyan-450 animate-pulse" /> Contributor Roadmaps
            </h3>
            <p className="text-xs text-slate-400">
              Pick your entry point and conquer your first open-source badge. Filter by skill category.
            </p>
          </div>

          {/* Filtering buttons */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-slate-950/80 border border-slate-800/50 rounded-xl self-start md:self-auto">
            {(["All", "Docs", "Code", "Community"] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 cursor-pointer ${
                  activeCategory === cat
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/20 font-semibold"
                    : "text-slate-400 hover:text-white hover:bg-slate-900/50 border border-transparent"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Suggested steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <AnimatePresence mode="popLayout">
            {filteredSteps.map((step, idx) => (
              <motion.div
                layout
                key={step.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="p-5 bg-slate-950/40 border border-slate-850/80 rounded-xl space-y-3 flex flex-col justify-between hover:border-slate-800 transition-colors"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border ${categoryBadgeStyle(step.category)} flex items-center gap-1.5`}>
                      {categoryIcon(step.category)}
                      {step.category}
                    </span>
                    <span className="text-[10px] font-mono text-slate-600">Step {idx + 1}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-white font-display tracking-tight leading-snug">
                    {step.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    {step.desc}
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-900 flex items-center gap-1.5 text-[10px] font-mono text-cyan-400 group cursor-pointer hover:text-cyan-350 transition-colors self-start">
                  <span>Get Started Guide Available</span>
                  <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Beginner issue ticket structures */}
        <div className="bg-slate-900/40 border border-slate-800/80 p-6 rounded-2xl backdrop-blur-md space-y-4">
          <div className="space-y-1">
            <h3 className="text-sm font-mono text-cyan-400 uppercase tracking-wider">Beginner Friendly Issue Ideas</h3>
            <p className="text-xs text-slate-400">
              Highly prioritized tasks often labeled as <code className="text-cyan-400 bg-cyan-500/5 px-1 py-0.5 rounded text-[11px] font-mono">good first issue</code>.
            </p>
          </div>

          <div className="space-y-3.5 max-h-[360px] overflow-y-auto pr-1">
            {roadmap.beginnerIdeas.map((idea, i) => (
              <div key={i} className="p-4 bg-slate-950/60 border border-slate-850 rounded-xl space-y-3 group hover:border-slate-850 transition-colors">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <h4 className="text-xs font-semibold text-white font-mono group-hover:text-cyan-300 transition-colors">
                    📝 {idea.title}
                  </h4>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                    idea.difficulty === "Easy" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-amber-500/10 text-amber-400 border-amber-450/20"
                  }`}>
                    {idea.difficulty}
                  </span>
                </div>

                <p className="text-xs text-slate-400 leading-normal font-sans">
                  {idea.description}
                </p>

                <div className="pt-2.5 border-t border-slate-900/60 flex items-center justify-between gap-2.5 text-[10px] font-mono text-slate-500">
                  <span>Files to check:</span>
                  <code className="text-cyan-300 text-[10.5px] truncate max-w-[200px] bg-cyan-500/5 px-2 py-0.5 rounded-md border border-cyan-500/10">{idea.filesInvolved}</code>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PR Checklist Terminal style */}
        <div className="bg-slate-900/40 border border-slate-800/80 p-6 rounded-2xl backdrop-blur-md flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800/85 pb-3">
              <div className="space-y-1">
                <h3 className="text-sm font-mono text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                  <ListTodo className="w-4 h-4 text-emerald-400" /> Pull Request Checklist
                </h3>
                <p className="text-xs text-slate-500">
                  Perform these checks step by step before pushing branch commits.
                </p>
              </div>

              {/* Progress counter circular-like info */}
              <div className="text-right">
                <span className="text-xs font-mono text-white block">{completedCount} of {totalCount} done</span>
                <span className="text-[10px] font-mono text-slate-500">{percentage}% completed</span>
              </div>
            </div>

            {/* Checklist progress bar */}
            <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-emerald-400 h-full transition-all duration-300"
                style={{ width: `${percentage}%` }}
              />
            </div>

            {/* Scrollable list items */}
            <div className="space-y-2 max-h-[240px] overflow-y-auto pr-1">
              {roadmap.prChecklist.map((item, idx) => {
                const isChecked = !!checkedPRItems[idx];
                return (
                  <button
                    key={idx}
                    onClick={() => toggleCheck(idx)}
                    className={`w-full text-left p-3 rounded-xl border flex items-start gap-3 transition-colors ${
                      isChecked
                        ? "bg-emerald-500/5 border-emerald-500/15 text-slate-300"
                        : "bg-slate-950/40 border-slate-850/60 text-slate-400 hover:border-slate-800"
                    }`}
                  >
                    <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 transition-transform ${isChecked ? "text-emerald-400 scale-110" : "text-slate-700"}`} />
                    <span className="text-xs leading-relaxed font-sans">{item}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-800/60 text-[11px] text-slate-500 leading-normal flex items-start gap-2">
            <HelpCircle className="w-4 h-4 text-slate-600 mt-0.5 flex-shrink-0" />
            <span>Fulfilling these requirements minimizes maintainer friction and accelerates approval speeds. Try checking everything off!</span>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
