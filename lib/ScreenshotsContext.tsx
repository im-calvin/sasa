"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type ScreenshotsContextType = {
  screenshots: string[];
  addScreenshot: (screenshot: string) => void;
  clearScreenshots: () => void;
};

const ScreenshotsContext = createContext<ScreenshotsContextType | undefined>(
  undefined,
);

export function ScreenshotsProvider({ children }: { children: ReactNode }) {
  const [screenshots, setScreenshots] = useState<string[]>([]);

  function addScreenshot(screenshot: string) {
    setScreenshots((prev) => [...prev, screenshot]);
  }

  function clearScreenshots() {
    setScreenshots([]);
  }

  return (
    <ScreenshotsContext.Provider
      value={{ screenshots, addScreenshot, clearScreenshots }}
    >
      {children}
    </ScreenshotsContext.Provider>
  );
}

export function useScreenshots() {
  const context = useContext(ScreenshotsContext);
  if (!context) {
    throw new Error("useScreenshots must be used within a ScreenshotsProvider");
  }
  return context;
}
