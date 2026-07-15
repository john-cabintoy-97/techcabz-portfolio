"use client";

import { useState } from "react";

interface ConfettiPiece {
  id: number;
  left: number;
  color: string;
  duration: number;
  delay: number;
  size: number;
  rounded: boolean;
}

const CONFETTI_COLORS = [
  "#E24B4A",
  "#EF9F27",
  "#7F77DD",
  "#1D9E75",
  "#D4537E",
  "#378ADD",
];

function makeConfetti(count: number): ConfettiPiece[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    duration: 2 + Math.random() * 1.5,
    delay: Math.random() * 0.6,
    size: 6 + Math.random() * 5,
    rounded: Math.random() > 0.5,
  }));
}

export default function GiftReveal({
  name = "Babe Julie",
  message = "Wishing you a day as wonderful as you are. Good Health, Happiness, and Love always. Stay simple and beautiful babe! Happy Birthday!",
}: {
  name?: string;
  message?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    setConfetti(makeConfetti(40));
  };

  return (
    <div className="relative flex min-h-[420px] w-full items-center justify-center overflow-hidden">
      {/* Gift box */}
      {!isOpen && (
        <button
          type="button"
          onClick={handleOpen}
          aria-label={`Open gift for ${name}`}
          className="group flex cursor-pointer flex-col items-center border-none bg-transparent p-0 transition-transform duration-150 active:scale-95"
        >
          <svg width="220" height="220" viewBox="0 0 220 220">
            <ellipse cx="110" cy="190" rx="85" ry="10" fill="rgba(0,0,0,0.08)" />
            <rect x="35" y="100" width="150" height="90" rx="6" fill="#E24B4A" />
            <rect
              x="35"
              y="100"
              width="150"
              height="90"
              rx="6"
              fill="none"
              stroke="#A32D2D"
              strokeWidth="1"
            />
            <rect x="95" y="100" width="30" height="90" fill="#FAC775" />
            <g className="origin-[30px_130px] transition-transform duration-500 group-hover:-translate-y-2 group-hover:-rotate-3">
              <rect x="25" y="72" width="170" height="34" rx="8" fill="#F09595" />
              <rect
                x="25"
                y="72"
                width="170"
                height="34"
                rx="8"
                fill="none"
                stroke="#A32D2D"
                strokeWidth="1"
              />
              <rect x="95" y="72" width="30" height="34" fill="#FAC775" />
              <path
                d="M110 74 C90 40, 60 40, 66 62 C70 78, 95 76, 110 74 Z"
                fill="#FAC775"
              />
              <path
                d="M110 74 C130 40, 160 40, 154 62 C150 78, 125 76, 110 74 Z"
                fill="#FAC775"
              />
              <circle cx="110" cy="74" r="9" fill="#EF9F27" />
            </g>
          </svg>
          <p className="mt-3.5 animate-gift-bob text-sm text-neutral-500 dark:text-neutral-400">
            Tap the gift to open it
          </p>
        </button>
      )}

      {/* Greeting */}
      {isOpen && (
        <div className="relative flex w-full flex-col items-center pt-2">
          <Balloon className="left-[4%] top-[10px] animate-gift-float" color="#D4537E" />
          <Balloon
            className="left-[18%] top-[40px] animate-gift-float2"
            color="#EF9F27"
            small
          />
          <Balloon
            className="right-[4%] top-[10px] animate-gift-float [animation-delay:0.3s]"
            color="#7F77DD"
          />
          <Balloon
            className="right-[18%] top-[36px] animate-gift-float2 [animation-delay:0.2s]"
            color="#1D9E75"
            small
          />

          <h1 className="mt-[150px] animate-gift-pop text-center text-3xl font-medium text-[#B7285C] opacity-0">
            Happy Birthday, {name}!
          </h1>
          <p className="mt-1.5 animate-gift-pop text-center text-[15px] text-neutral-500 opacity-0 [animation-delay:0.15s] dark:text-neutral-400">
            {message}
          </p>

          <div className="mt-4 animate-gift-pop opacity-0 [animation-delay:0.3s]">
            <Bouquet />
          </div>

          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {confetti.map((c) => (
              <span
                key={c.id}
                className={`absolute -top-5 animate-gift-fall ${c.rounded ? "rounded-full" : "rounded-sm"}`}
                style={{
                  left: `${c.left}%`,
                  width: c.size,
                  height: c.size * 0.4,
                  background: c.color,
                  animationDuration: `${c.duration}s`,
                  animationDelay: `${c.delay}s`,
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Balloon({
  color,
  className = "",
  small = false,
}: {
  color: string;
  className?: string;
  small?: boolean;
}) {
  const w = small ? 56 : 60;
  const h = small ? 140 : 150;
  return (
    <div className={`absolute ${className}`}>
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
        <line
          x1={w / 2}
          y1={h - 70}
          x2={w / 2}
          y2={h}
          stroke="#B4B2A9"
          strokeWidth="1.5"
        />
        <ellipse cx={w / 2} cy={h - 105} rx={w / 2 - 2} ry={h / 2 - 30} fill={color} />
        <path
          d={`M${w / 2 - 8} ${h - 74} L${w / 2} ${h - 62} L${w / 2 + 8} ${h - 74} Z`}
          fill={color}
        />
      </svg>
    </div>
  );
}

function Bouquet() {
  return (
    <svg width="340" height="280" viewBox="0 0 340 280" className="animate-gift-wiggle origin-[170px_260px]">
      <path d="M170 260 L150 150" stroke="#3B6D11" strokeWidth="4" fill="none" />
      <path d="M170 260 L170 140" stroke="#3B6D11" strokeWidth="4" fill="none" />
      <path d="M170 260 L190 150" stroke="#3B6D11" strokeWidth="4" fill="none" />
      <path d="M170 260 L120 165" stroke="#3B6D11" strokeWidth="4" fill="none" />
      <path d="M170 260 L220 165" stroke="#3B6D11" strokeWidth="4" fill="none" />
      <ellipse cx="140" cy="200" rx="9" ry="4" fill="#639922" transform="rotate(-30 140 200)" />
      <ellipse cx="200" cy="200" rx="9" ry="4" fill="#639922" transform="rotate(30 200 200)" />

      <g transform="translate(120,165)">
        <path d="M0 40 C-14 20 -14 0 0 -12 C14 0 14 20 0 40 Z" fill="#D85A30" />
        <path d="M0 30 C-8 16 -8 2 0 -6 C8 2 8 16 0 30 Z" fill="#F0997B" />
      </g>
      <g transform="translate(220,165)">
        <path d="M0 40 C-14 20 -14 0 0 -12 C14 0 14 20 0 40 Z" fill="#D85A30" />
        <path d="M0 30 C-8 16 -8 2 0 -6 C8 2 8 16 0 30 Z" fill="#F0997B" />
      </g>

      <g transform="translate(150,150)">
        <path d="M0 0 C-16 -6 -20 -22 -8 -30 C-2 -22 -2 -10 0 0 Z" fill="#D4537E" />
        <path d="M0 0 C16 -6 20 -22 8 -30 C2 -22 2 -10 0 0 Z" fill="#D4537E" />
        <path d="M0 -2 C-8 -14 -6 -26 0 -32 C6 -26 8 -14 0 -2 Z" fill="#ED93B1" />
      </g>
      <g transform="translate(190,150)">
        <path d="M0 0 C-16 -6 -20 -22 -8 -30 C-2 -22 -2 -10 0 0 Z" fill="#D4537E" />
        <path d="M0 0 C16 -6 20 -22 8 -30 C2 -22 2 -10 0 0 Z" fill="#D4537E" />
        <path d="M0 -2 C-8 -14 -6 -26 0 -32 C6 -26 8 -14 0 -2 Z" fill="#ED93B1" />
      </g>

      <g transform="translate(170,140)">
        <circle cx="0" cy="-28" r="7" fill="#712B13" />
        <ellipse cx="0" cy="-14" rx="16" ry="9" fill="#E24B4A" />
        <ellipse cx="-13" cy="-6" rx="16" ry="9" fill="#E24B4A" transform="rotate(-55 -13 -6)" />
        <ellipse cx="13" cy="-6" rx="16" ry="9" fill="#E24B4A" transform="rotate(55 13 -6)" />
        <ellipse cx="-10" cy="8" rx="16" ry="9" fill="#993C1D" opacity="0.85" transform="rotate(-110 -10 8)" />
        <ellipse cx="10" cy="8" rx="16" ry="9" fill="#993C1D" opacity="0.85" transform="rotate(110 10 8)" />
      </g>

      <path
        d="M155 258 C170 270 190 270 205 258 L200 268 C185 276 175 276 160 268 Z"
        fill="#D4537E"
      />
    </svg>
  );
}
