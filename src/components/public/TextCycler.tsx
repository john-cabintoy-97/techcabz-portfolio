"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const titles = ["Full-Stack Web Developer", "Mobile Developer"];

export function TextCycler() {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentTitle = titles[index];
    
    // Typing speed logic
    const timeout = setTimeout(() => {
      setText((prev) => 
        isDeleting 
          ? currentTitle.substring(0, prev.length - 1) 
          : currentTitle.substring(0, prev.length + 1)
      );

      if (!isDeleting && text === currentTitle) {
        setTimeout(() => setIsDeleting(true), 2000); // Pause before deleting
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % titles.length);
      }
    }, isDeleting ? 50 : 100); // Typing speed vs deleting speed

    return () => clearTimeout(timeout);
  }, [text, isDeleting, index]);

  return (
   <span className="font-bold tracking-tight text-[#F97316] bg-clip-text bg-gradient-to-r">
      {text}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="inline-block w-[4px] h-[1em] bg-yellow-400 ml-1 align-middle"
      />
    </span>
  );
}