import { useState } from "react";
import { RepoStructureItem } from "../types";
import { Folder, File, Search, ChevronRight, HelpCircle, CornerDownRight, Layout, Compass } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Props {
  structure: RepoStructureItem[];
  architectureOverview?: string;
  beginnerStartGuide?: string;
}

export default function RepoStructure({ structure, architectureOverview, beginnerStartGuide }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState<RepoStructureItem | null>(null);

  const filteredItems = structure.filter((item) =>
    item.path.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.purpose.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getImportanceStyles = (importance: string) => {
    switch (importance) {
      case "High":
        return "bg-rose-500/10 text-rose-400 border-rose-500/20";
      case "Medium":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "Low":
        return "bg-slate-500/10 text-slate-400 border-slate-500/20";
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
      id="repo-structure-section"
    >
      {/* Intro Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md">
        <div className="space-y-1">
          <h3 className="text-lg font-display font-semibold text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-indigo-400" /> Repository Blueprints
          </h3>
          <p className="text-xs text-slate-400 max-w-xl">
            Large repositories can look intimidating. Here is a beginner-focused layout detailing what key files and folders do. Click any row to view its details.
          </p>
        </div>

        {/* Live Filter bar */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Filter files & folders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-xs font-sans pl-9 pr-4 py-2 bg-slate-950/80 boundary border border-slate-800 rounded-lg text-slate-300 focus:outline-none focus:border-indigo-500 placeholder-slate-600 transition-colors"
          />
        </div>
      </div>

      {/* Premium Architecture & Start Guides */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* Architecture Overview */}
        <div className="glass-panel rounded-2xl p-5 border border-cyan-500/10 space-y-3 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-3 opacity-[0.03] text-cyan-400 group-hover:scale-110 transition-transform">
            <Layout className="w-24 h-24" />
          </div>
          <div className="flex items-center gap-2 text-cyan-400">
            <Layout className="w-5 h-5 flex-shrink-0" />
            <h4 className="text-sm font-display font-semibold uppercase tracking-wider">Architecture Overview</h4>
          </div>
          <p className="text-xs text-slate-350 leading-relaxed font-sans">
            {architectureOverview || "This repository utilizes an optimized, modern modular pattern. Core application layers reside in the primary source directory, decoupling state changes cleanly from helper utilities."}
          </p>
        </div>

        {/* Where Beginners Should Start */}
        <div className="glass-panel rounded-2xl p-5 border border-emerald-500/10 space-y-3 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-3 opacity-[0.03] text-emerald-400 group-hover:scale-110 transition-transform">
            <Compass className="w-24 h-24" />
          </div>
          <div className="flex items-center gap-2 text-emerald-400">
            <Compass className="w-5 h-5 flex-shrink-0 animate-pulse" />
            <h4 className="text-sm font-display font-semibold uppercase tracking-wider">Where to Start First</h4>
          </div>
          <p className="text-xs text-slate-350 leading-relaxed font-sans">
            {beginnerStartGuide || "Begin by reading 'package.json' or key dependency configurations to check command structures. Then inspect the smallest, most isolated helper utilities inside the source directories to learn the style conventions safely."}
          </p>
        </div>

      </div>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        
        {/* Tree List (Spans 3 Columns) */}
        <div className="lg:col-span-3 bg-slate-900/20 border border-slate-850 rounded-2xl p-4 space-y-2">
          <div className="flex justify-between items-center px-2 py-1.5 border-b border-slate-800/60 pb-2 mb-2 text-[10px] font-mono text-slate-500 uppercase tracking-wider">
            <span>Path Name</span>
            <span>Importance</span>
          </div>

          <div className="divide-y divide-slate-900/40 space-y-1.5 max-h-[420px] overflow-y-auto pr-1">
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.04 }}
                  onClick={() => setSelectedItem(item)}
                  className={`w-full text-left p-2.5 rounded-xl border flex items-center justify-between transition-all group ${
                    selectedItem?.id === item.id
                      ? "bg-indigo-500/10 border-indigo-500/40 text-white"
                      : "bg-slate-900/40 border-transparent hover:border-slate-800/80 hover:bg-slate-900/60 text-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {item.type === "folder" ? (
                      <Folder className={`w-4 h-4 flex-shrink-0 ${selectedItem?.id === item.id ? "text-indigo-400" : "text-indigo-300/80 group-hover:text-indigo-400"}`} />
                    ) : (
                      <File className={`w-4 h-4 flex-shrink-0 ${selectedItem?.id === item.id ? "text-slate-200" : "text-slate-400 group-hover:text-slate-300"}`} />
                    )}
                    <span className="font-mono text-xs truncate max-w-[200px] sm:max-w-xs">{item.path}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${getImportanceStyles(item.importance)}`}>
                      {item.importance} Priority
                    </span>
                    <ChevronRight className={`w-3.5 h-3.5 text-slate-500 group-hover:translate-x-0.5 transition-transform ${selectedItem?.id === item.id ? "rotate-90 text-indigo-400" : ""}`} />
                  </div>
                </motion.button>
              ))
            ) : (
              <div className="py-12 text-center text-xs text-slate-500 font-mono">
                No matching structure matches your query.
              </div>
            )}
          </div>
        </div>

        {/* Explain Card Panel (Spans 2 Columns) */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {selectedItem ? (
              <motion.div
                key={selectedItem.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl h-full flex flex-col justify-between backdrop-blur-sm"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-1.5 text-xs text-indigo-400 font-mono">
                    <CornerDownRight className="w-4 h-4 flex-shrink-0" /> Selected Node Analysis
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      {selectedItem.type === "folder" ? (
                        <Folder className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                      ) : (
                        <File className="w-5 h-5 text-slate-300 flex-shrink-0" />
                      )}
                      <h4 className="text-sm font-mono font-semibold text-white truncate max-w-xs">
                        {selectedItem.path}
                      </h4>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 block uppercase">
                      Type: {selectedItem.type.toUpperCase()}
                    </span>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 space-y-2">
                    <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">Beginner Friendly Explanation</span>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      {selectedItem.purpose}
                    </p>
                  </div>
                </div>

                <div className="mt-8 p-3.5 bg-indigo-500/5 border border-indigo-500/10 rounded-xl">
                  <span className="text-[10px] font-mono text-indigo-300 uppercase tracking-wider block mb-1">Contributor Tip</span>
                  <p className="text-[11px] text-slate-400 leading-normal">
                    {selectedItem.importance === "High"
                      ? "💡 Crucial framework files. Make backups and inspect imports before editing anything inside here."
                      : selectedItem.importance === "Medium"
                      ? "💡 Great candidate for testing or small environment adaptations."
                      : "💡 Isolated utility tools. Perfect places for safe experimental updates without break risks."}
                  </p>
                </div>
              </motion.div>
            ) : (
              <div className="bg-slate-900/10 border border-dashed border-slate-800/60 p-8 rounded-2xl h-full flex flex-col justify-center items-center text-center">
                <HelpCircle className="w-8 h-8 text-slate-600 mb-3" />
                <span className="text-xs font-mono text-slate-500 uppercase tracking-widest block mb-1">Blueprint Inspector</span>
                <p className="text-[11px] text-slate-500 max-w-[200px]">
                  Click on any file or folder element on the left to read user-friendly breakdown guides here.
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </motion.div>
  );
}
