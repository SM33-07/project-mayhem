"use client";

import React, { createContext, useContext, useRef, useEffect } from "react";
import { useStore } from "zustand";
import { createCaseStore, CaseStore, CaseStoreApi } from "./hooks/useCaseStore";
import { puzzlesConfig } from "./lib/puzzles.config";

export const CaseFileStoreContext = createContext<CaseStoreApi | undefined>(undefined);

export interface CaseFileProviderProps {
  children: React.ReactNode;
}

export function CaseFileProvider({ children }: CaseFileProviderProps) {
  const storeRef = useRef<CaseStoreApi | null>(null);
  if (!storeRef.current) {
    storeRef.current = createCaseStore();
  }

  useEffect(() => {
    async function loadDbQuestions() {
      try {
        const res = await fetch("/api/questions?caseId=05");
        const data = await res.json();
        if (data.success && data.questions) {
          data.questions.forEach((q: any) => {
            const p = puzzlesConfig.find((x) => x.slug === q.puzzleKey);
            if (p) {
              p.clue = q.question;
              p.answer = q.answer;
            }
          });
        }
      } catch (err) {
        console.error("Failed to load Case 5 questions from DB:", err);
      }
    }
    loadDbQuestions();
  }, []);

  return (
    <CaseFileStoreContext.Provider value={storeRef.current}>
      {children}
    </CaseFileStoreContext.Provider>
  );
}

export function useCaseStore<T>(selector: (store: CaseStore) => T): T {
  const context = useContext(CaseFileStoreContext);
  if (!context) {
    throw new Error("useCaseStore must be used within a CaseFileProvider");
  }
  return useStore(context, selector);
}
