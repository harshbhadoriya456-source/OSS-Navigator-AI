import { CanIContribute } from "../types";
import { HelpCircle, ThumbsUp, Check, AlertTriangle, ShieldCheck, HeartPulse, Sparkles, Code2, Award, FileText } from "lucide-react";
import { motion } from "motion/react";

interface Props {
  data?: CanIContribute;
  difficulty?: "Beginner" | "Intermediate" | "Advanced";
}

export default function CanIContributeSection({ data, difficulty }: Props) {
  // Safe Fallback calculation if not returned by API or is missing
  const activeData: CanIContribute = data || {
    contributionScore: difficulty === "Beginner" ? 92 : difficulty === "Intermediate" ? 75 : 45,
    beginnerScore: difficulty === "Beginner" ? 95 : difficulty === "Intermediate" ? 72 : 38,
    learningScore: difficulty === "Beginner" ? 85 : difficulty === "Intermediate" ? 90 : 96,
    complexityScore: difficulty === "Beginner" ? 30 : difficulty === "Intermediate" ? 64 : 88,
    recommendation: difficulty === "Beginner" ? "Strongly Recommended" : difficulty === "Intermediate" ? "Recommended" : "Not Recommended Yet",
    reasoning: difficulty === "Advanced"
      ? "This project features high density parameters and highly advanced toolchains. It is an amazing environment for seasoned software engineers, but onboarding developers may face step learning curves first."
      : "Excellent onboarding support patterns. Clear tags point newcomers directly toward isolated files where changes won't ripple, and local test runners are configured automatically."
  };

  const getRecommendationBadge = (rec: string) => {
    switch (rec) {
      case "Strongly Recommended":
        return {
          bg: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
          icon: <ShieldCheck className="w-5 h-5 text-emerald-400 animate-pulse" />,
          glow: "shadow-[0_0_12px_rgba(16,185,129,0.3)]"
        };
      case "Recommended":
        return {
          bg: "bg-cyan-500/10 border-cyan-500/30 text-cyan-400",
          icon: <ThumbsUp className="w-5 h-5 text-cyan-400" />,
          glow: "shadow-[0_0_12px_rgba(6,182,212,0.3)]"
        };
      default:
        return {
          bg: "bg-amber-500/10 border-amber-500/30 text-amber-400",
          icon: <AlertTriangle className="w-5 h-5 text-amber-400" />,
          glow: "shadow-[0_0_12px_rgba(245,158,11,0.3)]"
        };
    }
  };

  const badge = getRecommendationBadge(activeData.recommendation);

  const metricColors = {
    contribution: "from-cyan-400 to-blue-500 bg-cyan-400",
    beginner: "from-emerald-400 to-teal-500 bg-emerald-400",
    learning: "from-indigo-400 to-fuchsia-500 bg-indigo-400",
    complexity: "from-rose-400 to-orange-500 bg-rose-400"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
      id="can-i-contribute-section"
    >
      {/* Overview Block */}
      <div className="flex flex-col md:flex-row gap-6 bg-slate-900/40 border border-slate-800 p-6 rounded-2xl backdrop-blur-md">
        
        {/* Large Suitability Badge */}
        <div className="flex flex-col items-center justify-center p-6 bg-slate-950/60 rounded-2xl border border-slate-850 w-full md:w-80 text-center space-y-4">
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">Suitability Rating</span>
          <div className={`p-4 rounded-full border ${badge.bg} ${badge.glow} flex items-center justify-center`}>
            {badge.icon}
          </div>
          <div className="space-y-1">
            <h4 className="text-xl font-display font-bold text-white tracking-tight">
              {activeData.recommendation}
            </h4>
            <span className="text-xs font-mono text-slate-450 block uppercase">
              Difficulty: {difficulty || "Intermediate"}
            </span>
          </div>
        </div>

        {/* Suitability Statement and Commentary */}
        <div className="flex-1 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-1 text-xs text-indigo-400 font-mono">
              <Sparkles className="w-4 h-4 flex-shrink-0" /> AI Mentor Verification
            </div>
            <h3 className="text-lg font-display font-semibold text-white">Should You Contribute Here?</h3>
            <p className="text-sm text-slate-300 leading-relaxed font-sans">
              {activeData.reasoning}
            </p>
          </div>

          <div className="p-4 bg-slate-950/40 border border-slate-800/80 rounded-xl flex items-start gap-3">
            <HeartPulse className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="text-[11px] font-mono text-rose-400 uppercase tracking-wider block">Contributor Safety Tip</span>
              <p className="text-xs text-slate-400 leading-normal">
                {activeData.complexityScore > 75 
                  ? "🧠 High density complexity observed. We advise starting exclusively with documentation updates, clean issue descriptions, or testing refactors before submitting deep functional code logic revisions."
                  : "💡 Excellent sandboxed candidate! Feel free to checkout low-risk files and play with variable inputs directly. This codebase is fully resilient."}
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Grid of Scores */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Contributor Index */}
        <div className="glass-panel p-5 rounded-2xl space-y-4">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono">Accessibility Score</span>
            <span className="text-xs font-mono text-cyan-400 font-bold">{activeData.contributionScore}%</span>
          </div>
          <div className="space-y-1">
            <h5 className="text-sm font-semibold text-white">Is Code Accessible?</h5>
            <p className="text-[11px] text-slate-400 leading-normal">Measures visual documentation transparency and simple file structure rules.</p>
          </div>
          <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${activeData.contributionScore}%` }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className={`h-full bg-gradient-to-r ${metricColors.contribution}`}
            />
          </div>
        </div>

        {/* Beginner Index */}
        <div className="glass-panel p-5 rounded-2xl space-y-4">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono">Beginner Score</span>
            <span className="text-xs font-mono text-emerald-400 font-bold">{activeData.beginnerScore}%</span>
          </div>
          <div className="space-y-1">
            <h5 className="text-sm font-semibold text-white">First Issue Ease</h5>
            <p className="text-[11px] text-slate-400 leading-normal">Presence of low-dependency files, clear task lists, and fast sandbox setups.</p>
          </div>
          <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${activeData.beginnerScore}%` }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`h-full bg-gradient-to-r ${metricColors.beginner}`}
            />
          </div>
        </div>

        {/* Learning Gain Index */}
        <div className="glass-panel p-5 rounded-2xl space-y-4">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono">Learning gain</span>
            <span className="text-xs font-mono text-indigo-400 font-bold">{activeData.learningScore}%</span>
          </div>
          <div className="space-y-1">
            <h5 className="text-sm font-semibold text-white">Skill Acquisition</h5>
            <p className="text-[11px] text-slate-400 leading-normal">Quantity of modern conventions, tests suites, and frameworks to learn from.</p>
          </div>
          <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${activeData.learningScore}%` }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className={`h-full bg-gradient-to-r ${metricColors.learning}`}
            />
          </div>
        </div>

        {/* Code Complexity Index */}
        <div className="glass-panel p-5 rounded-2xl space-y-4">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono">Complexity Rating</span>
            <span className="text-xs font-mono text-rose-400 font-bold">{activeData.complexityScore}%</span>
          </div>
          <div className="space-y-1">
            <h5 className="text-sm font-semibold text-white">Mental Overhead</h5>
            <p className="text-[11px] text-slate-400 leading-normal">Quantity of modules, advanced patterns, concurrency constraints, or mathematics.</p>
          </div>
          <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${activeData.complexityScore}%` }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className={`h-full bg-gradient-to-r ${metricColors.complexity}`}
            />
          </div>
        </div>

      </div>

      {/* Guide Steps Card */}
      <div className="bg-slate-900/20 border border-slate-850 rounded-2xl p-6 space-y-4">
        <h4 className="text-sm font-mono text-slate-400 uppercase tracking-wider flex items-center gap-2">
          <Award className="w-4 h-4 text-indigo-400" /> Newcomer Suitability Checklist
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          
          <div className="flex gap-2.5 items-start bg-slate-950/40 border border-slate-900 rounded-xl p-3.5">
            <div className="p-1 rounded bg-indigo-500/10 text-indigo-300 mt-0.5">
              <Check className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-slate-200 font-semibold block mb-0.5">Community Welcome</span>
              <p className="text-[11px] text-slate-400">Tagged labels and clear rules are provided for community pull requests.</p>
            </div>
          </div>

          <div className="flex gap-2.5 items-start bg-slate-950/40 border border-slate-900 rounded-xl p-3.5">
            <div className="p-1 rounded bg-indigo-500/10 text-indigo-300 mt-0.5">
              <Check className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-slate-200 font-semibold block mb-0.5">Isolations level</span>
              <p className="text-[11px] text-slate-400">Core business logic is highly decoupled from presentation scripts.</p>
            </div>
          </div>

          <div className="flex gap-2.5 items-start bg-slate-950/40 border border-slate-900 rounded-xl p-3.5">
            <div className="p-1 rounded bg-indigo-500/10 text-indigo-300 mt-0.5">
              <Check className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-slate-200 font-semibold block mb-0.5">Automated suites</span>
              <p className="text-[11px] text-slate-400">CI triggers and visual tests run instantly to check and assert stability parameters.</p>
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
}
