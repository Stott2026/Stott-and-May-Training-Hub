import { createContext, useContext, useEffect, useState } from "react";

// Learner progress, kept in this browser only (as in the prototype). Phase 2 moves it to the database.
// Sections are stored by module address and section key, so reordering sections in Sanity keeps progress.
// Also kept: quick checks answered right (by question), activities finished (by module, section
// and activity), tech tool set-up ticks and which tools are fully set up, the daily Big 5 ticks
// (by day), and the days someone learnt something,
// for points, badges and streaks.
const STORAGE_KEY = "sm-hub-progress";
const ProgressContext = createContext(null);

function load() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return { completed: saved?.completed ?? {}, quizScores: saved?.quizScores ?? [], quickChecks: saved?.quickChecks ?? {}, activities: saved?.activities ?? {}, setup: saved?.setup ?? {}, toolsSetUp: saved?.toolsSetUp ?? {}, bigFive: saved?.bigFive ?? {}, days: saved?.days ?? [] };
  } catch {
    return { completed: {}, quizScores: [], quickChecks: {}, activities: {}, setup: {}, toolsSetUp: {}, bigFive: {}, days: [] };
  }
}

// Today in this computer's time zone, as 2026-11-02.
export const today = () => new Date().toLocaleDateString("en-CA");
const withToday = (days) => (days.includes(today()) ? days : [...days, today()].slice(-60));

export function ProgressProvider({ children }) {
  const [progress, setProgress] = useState(load);
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)); } catch { /* storage full or blocked */ }
  }, [progress]);

  const value = {
    isDone: (slug, key) => !!progress.completed[`${slug}/${key}`],
    toggle: (slug, key) => setProgress((p) => {
      const id = `${slug}/${key}`;
      const done = !p.completed[id];
      return { ...p, completed: { ...p.completed, [id]: done }, days: done ? withToday(p.days) : p.days };
    }),
    // How many of a module's sections are complete. sectionKeys comes from the API.
    countDone: (slug, sectionKeys = []) => sectionKeys.filter((k) => progress.completed[`${slug}/${k}`]).length,
    sectionsDone: Object.values(progress.completed).filter(Boolean).length,
    quizScores: progress.quizScores,
    addQuizScore: (score, total) => setProgress((p) => ({ ...p, quizScores: [...p.quizScores, { score, total, date: new Date().toISOString() }], days: withToday(p.days) })),
    quickChecksRight: Object.keys(progress.quickChecks).length,
    markQuickCheck: (id) => setProgress((p) => (p.quickChecks[id] ? p : { ...p, quickChecks: { ...p.quickChecks, [id]: true }, days: withToday(p.days) })),
    isActivityDone: (id) => !!progress.activities[id],
    activitiesDone: Object.keys(progress.activities).length,
    markActivity: (id) => setProgress((p) => (p.activities[id] ? p : { ...p, activities: { ...p.activities, [id]: true }, days: withToday(p.days) })),
    // Tech tools: set-up checklist ticks ("slug/item"), and tools whose whole checklist is done.
    isSetupTicked: (slug, item) => !!progress.setup[`${slug}/${item}`],
    toggleSetup: (slug, item, total) => setProgress((p) => {
      const setup = { ...p.setup, [`${slug}/${item}`]: !p.setup[`${slug}/${item}`] };
      const all = [...Array(total).keys()].every((i) => setup[`${slug}/${i}`]);
      return { ...p, setup, toolsSetUp: all ? { ...p.toolsSetUp, [slug]: true } : p.toolsSetUp, days: setup[`${slug}/${item}`] ? withToday(p.days) : p.days };
    }),
    toolsSetUp: Object.keys(progress.toolsSetUp),
    // The daily Big 5 check: today's ticks by tool, and the days every check was done.
    bigFiveToday: progress.bigFive[today()]?.ticks ?? {},
    bigFiveDays: Object.values(progress.bigFive).filter((d) => d.complete).length,
    toggleBigFive: (slug, total) => setProgress((p) => {
      const day = p.bigFive[today()] ?? { ticks: {} };
      const ticks = { ...day.ticks, [slug]: !day.ticks[slug] };
      const complete = day.complete || Object.values(ticks).filter(Boolean).length >= total;
      // Only the last two weeks of days are kept.
      const recent = Object.fromEntries(Object.entries(p.bigFive).sort(([a], [b]) => b.localeCompare(a)).slice(0, 14));
      return { ...p, bigFive: { ...recent, [today()]: { ticks, complete } }, days: withToday(p.days) };
    }),
    days: progress.days,
  };
  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export const useProgress = () => useContext(ProgressContext);
