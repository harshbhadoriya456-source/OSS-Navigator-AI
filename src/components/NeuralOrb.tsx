import React from "react";
import { motion } from "motion/react";
import { Sparkles, Terminal, Activity, HelpCircle, GitPullRequest } from "lucide-react";

interface NeuralOrbProps {
  progress: number;
  stageText: string;
}

export default function NeuralOrb({ progress, stageText }: NeuralOrbProps) {
  // Map progress bands to descriptive status icons/modes
  const getSubtextAndIcon = () => {
    if (progress < 25) {
      return {
        label: "REST CONNECT",
        icon: <Terminal className="w-3.5 h-3.5 text-cyan-400" />,
        color: "from-cyan-500 to-blue-500",
        shadow: "shadow-cyan-500/20",
        pulse: "duration-[1.5s]"
      };
    } else if (progress < 50) {
      return {
        label: "BLUEPRINT PARSE",
        icon: <Activity className="w-3.5 h-3.5 text-cyan-400" />,
        color: "from-cyan-400 to-teal-400",
        shadow: "shadow-cyan-400/20",
        pulse: "duration-[1.2s]"
      };
    } else if (progress < 75) {
      return {
        label: "AI COGNITION",
        icon: <Sparkles className="w-3.5 h-3.5 text-blue-400" />,
        color: "from-blue-500 to-cyan-500",
        shadow: "shadow-blue-500/25",
        pulse: "duration-[0.8s]"
      };
    } else if (progress < 95) {
      return {
        label: "ROADMAP COMPILING",
        icon: <GitPullRequest className="w-3.5 h-3.5 text-cyan-400" />,
        color: "from-cyan-500 to-blue-550",
        shadow: "shadow-cyan-500/20",
        pulse: "duration-[0.6s]"
      };
    } else {
      return {
        label: "INTELLIGENCE SYNTHESIS",
        icon: <Sparkles className="w-3.5 h-3.5 text-emerald-405" />,
        color: "from-blue-500 to-emerald-400",
        shadow: "shadow-emerald-500/25",
        pulse: "duration-[0.4s]"
      };
    }
  };

  const orbState = getSubtextAndIcon();

  return (
    <div id="neural-orb-container" className="flex flex-col items-center justify-center space-y-8 py-6">
      
      {/* Dynamic Graphic Stage */}
      <div className="relative w-72 h-72 flex items-center justify-center">
        
        {/* Outer Halo Auras */}
        <div className="absolute inset-0 rounded-full bg-cyan-500/5 blur-3xl" />
        <div className="absolute w-60 h-60 rounded-full bg-blue-500/5 blur-2xl animate-pulse" />
        
        {/* Rotating Orbital Ring 1: Tech Coordinate Dashes */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
          className="absolute w-64 h-64 border-2 border-dashed border-slate-800/60 rounded-full flex items-center justify-center"
        >
          {/* Visual tick marks on the ring */}
          <div className="absolute top-0 w-2 h-2 rounded-full bg-slate-700" />
          <div className="absolute bottom-0 w-2 h-2 rounded-full bg-slate-700" />
          <div className="absolute left-0 w-2 h-2 rounded-full bg-slate-700" />
          <div className="absolute right-0 w-2 h-2 rounded-full bg-slate-700" />
        </motion.div>
 
        {/* Rotating Orbital Ring 2: Core Matrix Ring (Reverse Rotate) */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
          className="absolute w-52 h-52 border border-cyan-500/25 rounded-full"
        >
          {/* Interactive node dots drifting along the orbit */}
          <div className="absolute top-1/4 right-0 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
          <div className="absolute bottom-1/4 left-0 w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_#3b82f6]" />
        </motion.div>
 
        {/* Pulsing Breathing Ring 3 */}
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="absolute w-40 h-40 border border-slate-700/40 rounded-full bg-slate-950/40 backdrop-blur-md flex items-center justify-center"
        />
 
        {/* Rotating Vector Compass (Fast Action) */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
          className="absolute w-36 h-36 border-t-2 border-b-2 border-cyan-500/10 rounded-full"
        />
 
        {/* Dynamic Glowing Core Orb */}
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            boxShadow: [
              "0 0 20px rgba(6,182,212,0.2)",
              "0 0 40px rgba(6,182,212,0.5)",
              "0 0 20px rgba(6,182,212,0.2)"
            ]
          }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className={`absolute w-28 h-28 rounded-full bg-gradient-to-tr ${orbState.color} ${orbState.shadow} flex flex-col items-center justify-center transition-all duration-700 ease-in-out`}
        >
          {/* Inner Core Glass Effect */}
          <div className="absolute inset-1.5 rounded-full bg-slate-950/90 flex flex-col items-center justify-center text-center p-2">
            
            {/* Real-time Percentage Indicator */}
            <motion.span 
              key={progress}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-2xl font-mono font-bold tracking-tight text-white block leading-none"
            >
              {progress}%
            </motion.span>
            
            <span className="text-[8px] font-mono font-semibold tracking-widest text-slate-500 uppercase mt-1">
              SYS LOAD
            </span>
          </div>
        </motion.div>
 
        {/* Quantum Orbital Particles */}
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={i}
            animate={{
              rotate: [0, 360],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              repeat: Infinity,
              duration: 3 + i * 1.5,
              ease: "easeInOut"
            }}
            style={{
              transformOrigin: "center center",
              position: "absolute",
              width: "100%",
              height: "100%",
            }}
          >
            <div 
              className={`w-1 h-1 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee]`}
              style={{
                position: "absolute",
                top: `${20 + i * 10}%`,
                left: `${15 + i * 12}%`,
              }}
            />
          </motion.div>
        ))}

      </div>

      {/* Dynamic Status and Phase Details */}
      <div className="text-center space-y-2.5 max-w-sm mx-auto">
        <motion.div 
          key={orbState.label}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-950/80 border border-slate-900 shadow-md text-[10px] font-mono tracking-widest text-slate-400"
        >
          {orbState.icon}
          <span>{orbState.label}</span>
        </motion.div>

        <motion.h4 
          className="text-[13px] font-display font-medium text-slate-200 uppercase tracking-wide px-4 leading-relaxed"
        >
          {stageText}
        </motion.h4>

        {/* Real-time Matrix System Status Line */}
        <div className="flex items-center justify-center gap-1.5 text-[9px] font-mono text-slate-500">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>CYBERNETIVE CORE SYNC: ACTIVE</span>
          <span className="text-slate-700">|</span>
          <span>FPS: 60/60</span>
        </div>
      </div>

    </div>
  );
}
