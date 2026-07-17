"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { SiGithub } from "react-icons/si";
import { HiOutlineSun, HiOutlineMoon, HiMenu, HiX } from "react-icons/hi";
import { CONTACT_INFO } from '@/app/constants/contact';

const navLinks = [
  { href: "/#about", label: "About" }, // Use absolute paths
  { href: "/#projects", label: "Projects" },
  { href: "/#experience", label: "Experience" },
  { href: "/#certificates", label: "Certificates" },
  { href: "/#contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#0D1117] border-b border-white/5">
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-display font-bold text-lg text-white">
          <span className="text-orange-500">TECH</span>CABZ
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-white/80 hover:text-white text-sm px-4 py-2 transition-colors">
              {link.label}
            </Link>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <a href={CONTACT_INFO.socials.github} target="_blank" className="p-2 text-white hover:text-orange-500 transition-colors">
            <SiGithub size={20} />
          </a>
          <button onClick={() => setTheme(isDark ? "light" : "dark")} className="p-2 text-white hover:text-orange-500 transition-colors">
            {mounted && (isDark ? <HiOutlineSun size={20} /> : <HiOutlineMoon size={20} />)}
          </button>
          
          <Link href={CONTACT_INFO.resume} className="hidden sm:block bg-[#F97316] text-white text-sm px-4 py-2 rounded-md hover:bg-[#f97316]/90 transition-all">
           Download Resume
          </Link>

          <button className="md:hidden p-2 text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-[#0D1117] border-b border-white/10 p-6 flex flex-col gap-4 animate-in slide-in-from-top-5">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setIsMenuOpen(false)} className="text-white text-lg font-medium p-2 border-b border-white/5">
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}