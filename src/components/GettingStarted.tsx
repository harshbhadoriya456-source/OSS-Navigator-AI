import { useState } from "react";
import { GettingStartedGuide } from "../types";
import { GitFork, Terminal, Copy, Check, ShieldAlert, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";

interface Props {
  guide: GettingStartedGuide;
}

export default function GettingStarted({ guide }: Props) {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => {
      setCopiedText(null);
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
      id="getting-started-section"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Step 1: Fork */}
        <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-md relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform duration-300">
            <GitFork className="w-24 h-24 text-white" />
          </div>
          <div className="space-y-3 relative z-10">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center font-mono text-xs text-cyan-400">
              01
            </div>
            <h4 className="text-sm font-display font-semibold text-white">Fork the Repository</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              {guide.forkDesc}
            </p>
          </div>
        </div>

        {/* Step 2: Clone */}
        <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-md relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform duration-300">
            <Terminal className="w-24 h-24 text-white" />
          </div>
          <div className="space-y-3 relative z-10 flex flex-col justify-between h-full">
            <div className="space-y-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center font-mono text-xs text-cyan-400">
                02
              </div>
              <h4 className="text-sm font-display font-semibold text-white">Clone to Local Machine</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Open your terminal, select your target folder directory, and run the git clone command to transfer files locally.
              </p>
            </div>

            <div className="mt-4 p-2.5 bg-slate-950/80 border border-slate-800 rounded-lg flex items-center justify-between gap-2.5">
              <code className="text-[10px] font-mono text-slate-300 overflow-x-auto select-all truncate whitespace-nowrap">
                {guide.cloneCommand}
              </code>
              <button
                onClick={() => copyToClipboard(guide.cloneCommand)}
                className="p-1 px-2 rounded bg-slate-800 hover:bg-slate-700/80 border border-slate-700/30 text-slate-400 hover:text-white transition-colors flex items-center gap-1 text-[10px] font-mono leading-none flex-shrink-0 cursor-pointer"
              >
                {copiedText === guide.cloneCommand ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 text-cyan-400" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Prerequisites */}
        <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-md flex flex-col justify-between">
          <div className="space-y-3">
            <h4 className="text-sm font-display font-semibold text-slate-300 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-cyan-400" /> Terminal Prerequisites
            </h4>
            <p className="text-xs text-slate-400 leading-normal mb-2">
              Make sure these engineering tools are configured on your operating system before running builds:
            </p>
            <div className="space-y-1.5">
              {guide.prerequisites.map((req, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-450 mt-0.5 flex-shrink-0" />
                  <span className="font-mono text-[11px] text-slate-300">{req}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Step 3: Local Setup Code Console */}
      <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-md space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500" />
          <div className="w-3 h-3 rounded-full bg-amber-500" />
          <div className="w-3 h-3 rounded-full bg-cyan-400" />
          <span className="text-xs font-mono text-slate-500 ml-2">CONTRIBUTOR bash CLI instructions</span>
        </div>

        <div className="space-y-3.5">
          {guide.setupCommands.map((step, index) => (
            <div
              key={index}
              className="p-4 bg-slate-950/80 border border-slate-800/60 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-slate-800 transition-colors"
            >
              <div className="space-y-1 max-w-xl">
                <span className="text-[10px] font-mono text-cyan-450 uppercase tracking-wider block">
                  Step {index + 3}: {step.description}
                </span>
                <span className="text-xs text-slate-400 leading-relaxed block">
                  Verify Node configurations, execute task presets, and trigger target configurations.
                </span>
              </div>

              <div className="flex items-center gap-2 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800/80 self-start sm:self-auto flex-shrink-0">
                <code className="text-xs font-mono text-yellow-500">{step.command}</code>
                <button
                  onClick={() => copyToClipboard(step.command)}
                  className="p-1.5 text-slate-500 hover:text-white hover:bg-slate-800/60 rounded-md transition-colors"
                  title="Copy command"
                >
                  {copiedText === step.command ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
