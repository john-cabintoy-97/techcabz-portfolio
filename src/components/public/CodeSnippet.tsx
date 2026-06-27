"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const codeLines = [
  "function hireMe() {",
  "  const dev = 'John Rey';",
  "  return {",
  "    stack: ['Web', 'Mobile'],",
  "    status: 'Available'",
  "  };",
  "}"
];

export function CodeSnippet() {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);

  useEffect(() => {
    let lineIndex = 0;
    
    const interval = setInterval(() => {
      if (lineIndex < codeLines.length) {
        setDisplayedLines((prev) => [...prev, codeLines[lineIndex]]);
        lineIndex++;
      } else {
        // Reset after a delay to loop the "typing" effect
        setTimeout(() => {
          setDisplayedLines([]);
          lineIndex = 0;
        }, 2000);
      }
    }, 600); // Speed of each line appearing

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      className="hidden lg:block absolute right-[5%] top-[25%] z-20 w-80 p-4 rounded-xl bg-[#1e1e1e]/80 border border-gray-700/50 backdrop-blur-sm shadow-2xl"
    >
      <div className="flex gap-2 mb-3">
        <div className="w-3 h-3 rounded-full bg-red-500/80" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <div className="w-3 h-3 rounded-full bg-green-500/80" />
      </div>
      <pre className="text-xs font-mono text-gray-300">
        {displayedLines.map((line, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {line}
          </motion.div>
        ))}
        {/* Blinking Cursor at the end of the last line */}
        {displayedLines.length < codeLines.length && (
          <motion.span 
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 0.5 }}
            className="inline-block w-[6px] h-[12px] bg-yellow-400 ml-1"
          />
        )}
      </pre>
    </motion.div>
  );
}