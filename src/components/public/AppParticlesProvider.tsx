"use client";

import { useCallback, type PropsWithChildren } from "react";
import { ParticlesProvider } from "@tsparticles/react";
import type { Engine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

export function AppParticlesProvider({ children }: PropsWithChildren) {
  const init = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return <ParticlesProvider init={init}>{children}</ParticlesProvider>;
}
