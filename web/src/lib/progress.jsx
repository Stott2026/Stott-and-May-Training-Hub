import { createContext, useContext, useEffect, useState } from "react";

// Learner progress, kept in this browser only (as in the prototype). Phase 2 moves it to the database.
// Sections are stored by module address and section key, so reordering sections in Sanity keeps progress.
const STORAGE_KEY = "sm-hub-progress";
const ProgressContext = createContext(null);

function load() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return { completed: saved?.completed ?? {}, quizScores: saved?.quizScores ?? [] };
  } catch {
    return { completed: {}, quizScores: [] };
  }
}

export function ProgressProvider({ children }) {
  const [progress, setProgress] = useState(load);
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)); } catch { /* storage full or blocked */ }
  }, [progress]);

  const value = {
    isDone: (slug, key) => !!progress.completed[`${slug}/${key}`],
    toggle: (slug, key) => setProgress((p) => {
      const id = `${slug}/${key}`;
      return { ...p, completed: { ...p.completed, [id]: !p.completed[id] } };
    }),
    // How many of a module's sections are complete. sectionKeys comes from the API.
    countDone: (slug, sectionKeys = []) => sectionKeys.filter((k) => progress.completed[`${slug}/${k}`]).length,
    quizScores: progress.quizScores,
    addQuizScore: (score, total) => setProgress((p) => ({ ...p, quizScores: [...p.quizScores, { score, total, date: new Date().toISOString() }] })),
  };
  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export const useProgress = () => useContext(ProgressContext);
