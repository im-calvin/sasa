"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type FrameContextType = {
  selectedFrame: "" | "light" | "dark";
  setSelectedFrame: (frame: "" | "light" | "dark") => void;
};

const FrameContext = createContext<FrameContextType | undefined>(undefined);

export function FrameProvider({ children }: { children: ReactNode }) {
  const [selectedFrame, setSelectedFrame] = useState<"" | "light" | "dark">("");

  return (
    <FrameContext.Provider value={{ selectedFrame, setSelectedFrame }}>
      {children}
    </FrameContext.Provider>
  );
}

export function useFrame() {
  const context = useContext(FrameContext);
  if (!context) {
    throw new Error("useFrame must be used within a FrameProvider");
  }
  return context;
}
