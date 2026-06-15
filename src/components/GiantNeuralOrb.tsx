import React from "react";
import { motion } from "motion/react";

export default function GiantNeuralOrb() {
  return (
    <div className="absolute inset-x-0 top-0 h-[100vh] overflow-hidden pointer-events-none z-0 flex items-center justify-center">
      {/* Mega Radial Background Glow Overlays */}
      <div className="absolute top-[10%] w-[80vw] h-[80vw] max-w-[800px] rounded-full bg-gradient-to-tr from-cyan-500/5 via-blue-500/5 to-purple-500/5 blur-[140px] opacity-80" />
      <div className="absolute top-[20%] w-[60vw] h-[60vw] max-w-[600px] rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-600/10 blur-[110px] animate-pulse" />
      
      {/* Giant Neural Wireframe Orbit Assembly */}
      <div className="relative w-[34rem] h-[34rem] sm:w-[48rem] sm:h-[48rem] md:w-[60rem] md:h-[60rem] lg:w-[68rem] lg:h-[68rem] flex items-center justify-center opacity-65 scale-90 sm:scale-100 transition-all">
        
        {/* Core Glowing Nebula */}
        <div className="absolute w-[22rem] h-[22rem] sm:w-[32rem] sm:h-[32rem] rounded-full bg-cyan-500/20 blur-3xl opacity-40 animate-pulse duration-[8s]" />
        <div className="absolute w-[18rem] h-[18rem] sm:w-[26rem] sm:h-[26rem] rounded-full bg-purple-500/10 blur-[130px] opacity-50" />
        
        {/* Rotating Concentric SVG Wireframe Sphere */}
        <svg 
          viewBox="0 0 800 800" 
          className="absolute w-full h-full animate-orb-float"
          style={{ transition: "transform 10s ease-out" }}
        >
          <defs>
            <linearGradient id="cyanPurple" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#4F8CFF" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#A855F7" stopOpacity="0.4" />
            </linearGradient>
            
            <linearGradient id="purpleBlue" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#A855F7" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#4F8CFF" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#00E5FF" stopOpacity="0.1" />
            </linearGradient>

            <linearGradient id="glowingEdge" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#4F8CFF" stopOpacity="0.1" />
            </linearGradient>

            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Outer Ring boundary */}
          <circle 
            cx="400" 
            cy="400" 
            r="380" 
            fill="none" 
            stroke="url(#cyanPurple)" 
            strokeWidth="1" 
            strokeDasharray="6 12 ml-2" 
            className="opacity-25" 
          />

          {/* Concentric Latitude Circles (Latitude Grid) */}
          <circle cx="400" cy="400" r="300" fill="none" stroke="url(#cyanPurple)" strokeWidth="1" strokeDasharray="3 4" className="opacity-40" />
          <circle cx="400" cy="400" r="220" fill="none" stroke="url(#purpleBlue)" strokeWidth="1" className="opacity-30" />
          <circle cx="400" cy="400" r="140" fill="none" stroke="url(#cyanPurple)" strokeWidth="1" strokeDasharray="12 8" className="opacity-35" />
          <circle cx="400" cy="400" r="70" fill="none" stroke="url(#purpleBlue)" strokeWidth="1.5" className="opacity-55" />

          {/* 3D Wireframe Longitudinal Ellipses */}
          {/* Angle 0 */}
          <ellipse cx="400" cy="400" rx="300" ry="80" fill="none" stroke="url(#cyanPurple)" strokeWidth="1" className="opacity-40" transform="rotate(15 400 400)" />
          {/* Angle 45 */}
          <ellipse cx="400" cy="400" rx="300" ry="120" fill="none" stroke="url(#purpleBlue)" strokeWidth="1" className="opacity-40" transform="rotate(45 400 400)" />
          {/* Angle 90 */}
          <ellipse cx="400" cy="400" rx="300" ry="180" fill="none" stroke="url(#cyanPurple)" strokeWidth="1" strokeDasharray="4 6" className="opacity-35" transform="rotate(75 400 400)" />
          {/* Angle 135 */}
          <ellipse cx="400" cy="400" rx="300" ry="140" fill="none" stroke="url(#purpleBlue)" strokeWidth="0.75" className="opacity-25" transform="rotate(115 400 400)" />
          {/* Angle -45 */}
          <ellipse cx="400" cy="400" rx="300" ry="220" fill="none" stroke="url(#cyanPurple)" strokeWidth="1.2" className="opacity-30" transform="rotate(145 400 400)" />
          {/* Reverse Ellipses */}
          <ellipse cx="400" cy="400" rx="140" ry="300" fill="none" stroke="url(#cyanPurple)" strokeWidth="1" className="opacity-25" transform="rotate(30 400 400)" />
          <ellipse cx="400" cy="400" rx="200" ry="300" fill="none" stroke="url(#purpleBlue)" strokeWidth="1" className="opacity-30" transform="rotate(105 400 400)" />

          {/* Intersecting Neural Connections Path Coordinates - Synthesizing Network look */}
          <path d="M 190 280 L 280 190 M 280 190 L 400 140 M 400 140 L 520 190 M 520 190 L 610 280 M 610 280 L 660 400 M 660 400 L 610 520 M 610 520 L 520 610 M 520 610 L 410 660 M 410 660 L 280 610 M 280 610 L 190 520 M 190 520 L 140 400 Z" fill="none" stroke="url(#cyanPurple)" strokeWidth="1" strokeDasharray="4 4" className="opacity-35" />
          <path d="M 280 190 L 520 190 L 520 610 L 280 610 Z" fill="none" stroke="url(#purpleBlue)" strokeWidth="0.5" className="opacity-20" />
          <path d="M 140 400 L 660 400" fill="none" stroke="url(#cyanPurple)" strokeWidth="0.75" className="opacity-30" strokeDasharray="10 5" />
          <path d="M 400 100 L 400 700" fill="none" stroke="url(#purpleBlue)" strokeWidth="0.75" className="opacity-30" strokeDasharray="2 10" />

          {/* Glowing Connecting Node Junctions (The Neural Synapses) */}
          <circle cx="280" cy="190" r="5" fill="#00E5FF" filter="url(#glow)" className="opacity-80 animate-pulse" />
          <circle cx="520" cy="190" r="4" fill="#4F8CFF" className="opacity-75" />
          <circle cx="610" cy="280" r="6" fill="#A855F7" filter="url(#glow)" className="opacity-85" />
          <circle cx="660" cy="400" r="5" fill="#00E5FF" className="opacity-90" />
          <circle cx="610" cy="520" r="4" fill="#4F8CFF" className="opacity-80" />
          <circle cx="520" cy="610" r="6" fill="#A855F7" filter="url(#glow)" className="opacity-90" />
          <circle cx="280" cy="610" r="4" fill="#00E5FF" className="opacity-75" />
          <circle cx="190" cy="520" r="5" fill="#4F8CFF" className="opacity-80" />
          <circle cx="140" cy="400" r="6" fill="#A855F7" filter="url(#glow)" className="opacity-85" />
          <circle cx="190" cy="280" r="4" fill="#00E5FF" className="opacity-70 animate-ping duration-1000" />
          <circle cx="400" cy="140" r="5" fill="#4F8CFF" className="opacity-85" />
          
          {/* Inner sphere orbiting cluster */}
          <circle cx="400" cy="260" r="4" fill="#00E5FF" className="opacity-85" />
          <circle cx="540" cy="420" r="5" fill="#A855F7" className="opacity-80" />
          <circle cx="340" cy="480" r="3.5" fill="#4F8CFF" className="opacity-90" />
          <circle cx="480" cy="500" r="5" fill="#00E5FF" className="opacity-75" />
        </svg>

        {/* Outer Rotating Satellites Assemblies */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 24, ease: "linear" }}
          className="absolute w-[80%] h-[80%] pointer-events-none"
        >
          <div className="absolute top-1/4 left-1/4 w-3.5 h-3.5 rounded-full bg-cyan-400 shadow-[0_0_12px_#00E5FF] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-3 h-3 rounded-full bg-purple-400 shadow-[0_0_12px_#A855F7]" />
        </motion.div>

        <motion.div
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
          className="absolute w-[105%] h-[105%] pointer-events-none"
        >
          <div className="absolute top-1/2 right-0 w-2.5 h-2.5 rounded-full bg-blue-400 shadow-[0_0_8px_#4F8CFF]" />
          <div className="absolute bottom-1/2 left-0 w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_8px_#00E5FF] animate-ping" />
        </motion.div>
        
        {/* Subtle Horizontal Interstellar Glow bar */}
        <div className="absolute w-[120%] h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent blur-[2px]" />
      </div>
    </div>
  );
}
