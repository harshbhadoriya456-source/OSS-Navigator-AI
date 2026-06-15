import React from "react";
import { motion } from "motion/react";
import { 
  Sparkles, Terminal, Activity, FileCode, CheckCircle2, 
  GitBranch, ShieldCheck, Cpu, Code2, Users, Star, 
  Layers, Compass, Award
} from "lucide-react";

export default function DashboardMockup() {
  return (
    <div id="ai-dashboard-mockup" className="relative w-full max-w-5xl mx-auto px-4 pt-16 pb-24">
      {/* Absolute Glow Spotlight Behind Mockup */}
      <div className="absolute inset-0 top-1/4 -z-10 flex items-center justify-center">
        <div className="w-[120%] h-[250px] bg-gradient-to-r from-cyan-500/10 via-blue-600/5 to-purple-600/10 blur-[130px] rounded-full opacity-60" />
      </div>

      {/* Floating Wrapper */}
      <motion.div
        initial={{ opacity: 0, y: 40, rotateX: 10 }}
        animate={{ opacity: 1, y: 0, rotateX: 6 }}
        whileHover={{ rotateX: 2, scale: 1.015, y: -4 }}
        transition={{ duration: 0.9, cubicBezier: [0.16, 1, 0.3, 1] }}
        style={{ perspective: 1200 }}
        className="w-full"
      >
        {/* Dynamic 3D Perspective Container with Border Glow */}
        <div className="relative rounded-2xl border border-cyan-500/20 bg-black/65 backdrop-blur-xl shadow-[0_30px_100px_rgba(0,0,0,0.8),0_0_50px_rgba(6,182,212,0.15)] overflow-hidden">
          
          {/* Top Decorative Mac Window Controls Bar */}
          <div className="flex items-center justify-between border-b border-slate-800/80 px-4 py-3 bg-black/40">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500/60" />
              <span className="w-3 h-3 rounded-full bg-amber-500/60" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/60" />
              <span className="text-[10px] font-mono text-slate-500 ml-4">ai-navigator-terminal@sandbox:~</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 px-2 py-0.5 rounded-md flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 text-cyan-400" /> AI CORE COGNITIVE ACTIVE
              </span>
              <span className="text-[10px] font-mono text-slate-500">v1.4.0</span>
            </div>
          </div>

          {/* Interactive Mockup Dashboard Body */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 p-5 lg:p-6 bg-gradient-to-b from-[#0e1324]/30 to-black/80">
            
            {/* Sidebar Column */}
            <div className="lg:col-span-1 space-y-4 border-r border-slate-800/60 pr-0 lg:pr-4">
              <div className="p-3 bg-slate-950/80 border border-slate-900 rounded-xl space-y-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-md bg-gradient-to-tr from-cyan-450 to-blue-500 flex items-center justify-center">
                    <GitBranch className="w-3 h-3 text-white" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-white block">facebook/react</span>
                    <span className="text-[9px] font-mono text-slate-500 uppercase">Interactive Index</span>
                  </div>
                </div>
                <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>★ 122K Stars</span>
                  <span>⑂ 25.1K Forks</span>
                </div>
              </div>

              {/* Mock Repository Structure Explorer */}
              <div className="space-y-2">
                <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block font-bold">Project Filesystem</span>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-1.5 p-1.5 bg-cyan-950/20 text-cyan-300 rounded border border-cyan-500/10">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" /> /packages/react/src
                  </div>
                  <div className="flex items-center gap-1.5 p-1.5 text-slate-450 pl-5">
                    <FileCode className="w-3 h-3 text-slate-500" /> ReactBaseClasses.js
                  </div>
                  <div className="flex items-center gap-1.5 p-1.5 text-slate-450 pl-5">
                    <FileCode className="w-3 h-3 text-slate-500" /> ReactHooks.js
                  </div>
                  <div className="flex items-center gap-1.5 p-1.5 text-slate-430 pl-5 bg-indigo-950/10 text-indigo-300 rounded">
                    <FileCode className="w-3 h-3 text-indigo-400" /> ReactChildren.js
                  </div>
                  <div className="flex items-center gap-1.5 p-1.5 text-slate-450 pl-3">
                    <span>📁 /fixtures</span>
                  </div>
                  <div className="flex items-center gap-1.5 p-1.5 text-slate-450 pl-3">
                    <span>📄 package.json</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Dashboard Content Area */}
            <div className="lg:col-span-3 space-y-4">
              
              {/* Row 1: Header / Title Info and Readiness */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                
                {/* Repository Analysis Panel */}
                <div className="p-4 bg-slate-950/50 border border-slate-800/80 rounded-xl space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-450">
                    <span>COGNITIVE MATRIX</span>
                    <Activity className="w-3.5 h-3.5 text-cyan-400" />
                  </div>
                  <h5 className="text-sm font-semibold text-white">Repository Analysis</h5>
                  <p className="text-[11px] text-slate-400 leading-normal">
                    Fibers & reconciler logic processed. Modular architecture safely decoupled into 12 high-level domain contexts.
                  </p>
                </div>

                {/* Contribution Readiness Circular meter */}
                <div className="p-4 bg-[#0a1122]/60 border border-cyan-500/10 rounded-xl flex items-center justify-between gap-3">
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono text-cyan-400 uppercase tracking-wider block font-bold">READINESS</span>
                    <h5 className="text-sm font-bold text-white">Highly Ready</h5>
                    <p className="text-[10px] text-slate-450">Sandbox environments verified.</p>
                  </div>
                  <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="28" cy="28" r="24" className="stroke-slate-850 fill-none" strokeWidth="3" />
                      <circle cx="28" cy="28" r="24" className="stroke-cyan-400 fill-none" strokeWidth="3" strokeDasharray="150" strokeDashoffset="15" />
                    </svg>
                    <span className="absolute text-[10px] font-mono font-bold text-cyan-350">94%</span>
                  </div>
                </div>

                {/* Contributor Difficulty Rating */}
                <div className="p-4 bg-slate-950/50 border border-slate-800/80 rounded-xl space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-455">
                    <span>DIFFICULTY STANDARD</span>
                    <Award className="w-3.5 h-3.5 text-purple-400" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 rounded">
                      Beginner Friendly
                    </span>
                    <span className="text-xs font-mono text-slate-400 font-bold">92/100</span>
                  </div>
                  <p className="text-[10px] text-slate-450 leading-relaxed">
                    Clear local scripts, clean directory paths, and comprehensive mock parameters configuration.
                  </p>
                </div>

              </div>

              {/* Row 2: Skill Match Assessment Map */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                
                {/* Simulated Skill Matcher module */}
                <div className="p-4 bg-slate-950/60 border border-slate-850 rounded-xl space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-900 pb-1.5">
                    <div className="flex items-center gap-1">
                      <Cpu className="w-3.5 h-3.5 text-cyan-400" /> 
                      <span className="text-xs font-semibold text-white">Skill Matches Analyzer</span>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-400 font-semibold bg-cyan-950/60 px-2 py-0.5 rounded">75% Aligned</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="p-2 bg-emerald-500/5 border border-emerald-500/10 rounded-lg text-center">
                      <span className="text-[10px] font-mono text-slate-400 block">React</span>
                      <span className="text-[9px] font-semibold text-emerald-400">Match 100%</span>
                    </div>
                    <div className="p-2 bg-emerald-500/5 border border-emerald-500/10 rounded-lg text-center">
                      <span className="text-[10px] font-mono text-slate-400 block">TypeScript</span>
                      <span className="text-[9px] font-semibold text-emerald-400">Match 100%</span>
                    </div>
                    <div className="p-2 bg-amber-500/5 border border-amber-500/10 rounded-lg text-center">
                      <span className="text-[10px] font-mono text-slate-400 block">Node.js</span>
                      <span className="text-[9px] font-semibold text-amber-400">Learn (30m)</span>
                    </div>
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono leading-tight">
                    ✨ Spark recommendation: spends 30 minutes reading the core helper units first.
                  </div>
                </div>

                {/* Dashboard Learning Roadmap list */}
                <div className="p-4 bg-[#0d091a]/30 border border-purple-500/10 rounded-xl space-y-2.5">
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-white">
                    <Compass className="w-3.5 h-3.5 text-purple-400" />
                    <span>Learning Contribution Roadmap</span>
                  </div>
                  <div className="space-y-1.5 text-[11px]">
                    <div className="flex items-center gap-2 text-slate-300">
                      <span className="w-4 h-4 rounded-full bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-mono text-[9px] font-bold border border-cyan-500/30">1</span>
                      <span>Review ReactBaseClasses.js definitions</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-350">
                      <span className="w-4 h-4 rounded-full bg-purple-500/10 text-purple-450 flex items-center justify-center font-mono text-[9px] font-bold border border-purple-500/30">2</span>
                      <span>Run unit mock assertions globally</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                      <span className="w-4 h-4 rounded-full bg-slate-900 text-slate-500 flex items-center justify-center font-mono text-[9px] font-bold border border-slate-800">3</span>
                      <span>Submit local changes via checkout branch</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Code visual block */}
              <div className="p-3 bg-slate-950 border border-slate-900 rounded-xl space-y-1.5 font-mono text-[10px] text-slate-500 leading-normal">
                <div className="flex items-center justify-between text-[9px] text-[#00E5FF] font-semibold border-b border-slate-900 pb-1 mb-1">
                  <span>SYSTEM FEEDBACK SIMULATOR</span>
                  <span className="animate-pulse">● CONNECTION ESTABLISHED</span>
                </div>
                <div><span className="text-[#A855F7]">info</span> - Fetching structural data for facebook/react...</div>
                <div><span className="text-[#00E5FF]">success</span> - Parse compiled in 241ms. Ready metrics deployed.</div>
                <div className="text-slate-400"><span className="text-emerald-400">$</span> git checkout -b feature/react-alignment</div>
              </div>

            </div>

          </div>

        </div>

        {/* Decorative Shadow Overlay Under Mockup */}
        <div className="h-6 w-[90%] mx-auto bg-cyan-500/20 blur-xl opacity-30 rounded-full" />
      </motion.div>
    </div>
  );
}
