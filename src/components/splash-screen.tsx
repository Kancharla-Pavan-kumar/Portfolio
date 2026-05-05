"use client";

import * as React from "react";

import { GooeyText } from "@/components/ui/gooey-text-morphing";

const SPLASH_TEXTS = ["Pavan Kumar", "Portfolio", "Fullstack Developer"];
const TOTAL_DURATION = 3000; // 3 seconds total

export function SplashScreen({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = React.useState(false);
  const [fadeOut, setFadeOut] = React.useState(false);
  const [done, setDone] = React.useState(false);

  React.useEffect(() => {
    // Only show splash once per browser session
    const hasSeenSplash = sessionStorage.getItem("splash-shown");
    if (hasSeenSplash) {
      setDone(true);
      return;
    }

    setShowSplash(true);

    // Start fade-out near the end
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, TOTAL_DURATION - 500);

    // Remove splash after total duration
    const removeTimer = setTimeout(() => {
      setShowSplash(false);
      setDone(true);
      sessionStorage.setItem("splash-shown", "true");
    }, TOTAL_DURATION);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (done) {
    return <>{children}</>;
  }

  if (!showSplash) {
    return null;
  }

  return (
    <>
      {/* Splash overlay */}
      <div
        className={`fixed inset-0 z-[9999] flex items-center justify-center bg-background transition-opacity duration-500 ${
          fadeOut ? "opacity-0" : "opacity-100"
        }`}
      >
        <GooeyText
          texts={SPLASH_TEXTS}
          morphTime={0.6}
          cooldownTime={0.4}
          className="h-[120px] w-full"
          textClassName="font-bold tracking-tight"
        />
      </div>
    </>
  );
}
