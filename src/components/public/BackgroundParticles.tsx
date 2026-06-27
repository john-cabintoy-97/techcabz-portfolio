"use client";
import Particles from "@tsparticles/react";
import { useTheme } from "next-themes";

export function BackgroundParticles() {
  const { theme } = useTheme();
  return (
    <div className="absolute inset-0 z-0 w-full h-full pointer-events-none">
      <Particles
        id="tsparticles"
        options={{
          background: { color: "transparent" },
          particles: {
            number: { value: 50 },
            color: { value: theme === "dark" ? "#56857D" : "#334155" },
            links: {
              enable: true,
              distance: 150,
              color: theme === "dark" ? "#56857D" : "#334155",
              opacity: theme === "dark" ? 0.2 : 0.7,
              width: 1,
            },
            move: { enable: true, speed: 0.5 },
            size: { value: 3 },
            opacity: { value: theme === "dark" ? 0.2 : 0.7 },
          },
          interactivity: {
            events: { onHover: { enable: true, mode: "grab" } },
          },
        }}
      />
    </div>
  );
}
