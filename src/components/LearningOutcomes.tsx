import { LearningOutcome } from "../types";
import { Cpu, GitBranch, Layers, Globe, CornerDownRight, Code, BookOpen, GraduationCap } from "lucide-react";
import { motion } from "motion/react";

interface Props {
  outcomes: LearningOutcome[];
}

export default function LearningOutcomes({ outcomes }: Props) {
  const getIcon = (name: string) => {
    switch (name) {
      case "Cpu":
        return <Cpu className="w-5 h-5 text-indigo-400" />;
      case "GitBranch":
        return <GitBranch className="w-5 h-5 text-emerald-400" />;
      case "Layers":
        return <Layers className="w-5 h-5 text-violet-400" />;
      case "Globe":
        return <Globe className="w-5 h-5 text-sky-400" />;
      case "CornerDownRight":
        return <CornerDownRight className="w-5 h-5 text-amber-400" />;
      case "Code":
        return <Code className="w-5 h-5 text-rose-400" />;
      default:
        return <BookOpen className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
      id="learning-outcomes-section"
    >
      {/* Dynamic Skill Header Badge */}
      <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="text-lg font-display font-semibold text-white flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-indigo-400" /> Professional Learning Outcomes
          </h3>
          <p className="text-xs text-slate-400 max-w-xl">
            Contributing to this repository isn't just about polishing checklists — it equips you with enterprise-grade engineering paradigms that translate directly to industry careers.
          </p>
        </div>
      </div>

      {/* Grid of Outcome cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {outcomes.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="bg-slate-900/40 border border-slate-850 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-800 hover:bg-slate-900/60 transition-all duration-250 group"
          >
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-center group-hover:scale-105 transition-transform">
                {getIcon(item.icon)}
              </div>

              <div className="space-y-1.5">
                <h4 className="text-sm font-semibold text-white font-display tracking-tight leading-relaxed">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed font-sans">
                  {item.desc}
                </p>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-900/60 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
              Gain Mastery
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
