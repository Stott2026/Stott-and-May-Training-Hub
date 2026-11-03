import { createContext, useContext, useEffect, useState } from "react";

// Compliance course progress: lessons completed and assessment attempts, by course address.
// For now this is kept in this browser only, so it is a practice record, not an official one.
// The official record (who passed what, when, with what score) moves to the database later.
const STORAGE_KEY = "sm-hub-compliance";
const ComplianceContext = createContext(null);

function load() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? {}; } catch { return {}; }
}

// "2026-11-03" → 3 November 2026
export const longDate = (iso) => new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

export function addMonths(iso, months) {
  const d = new Date(iso);
  d.setMonth(d.getMonth() + months);
  return d.toISOString();
}

export function ComplianceProvider({ children }) {
  const [state, setState] = useState(load);
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch { /* storage full or blocked */ }
  }, [state]);

  const course = (slug) => state[slug] ?? { lessons: {}, attempts: [] };
  const update = (slug, change) => setState((s) => ({ ...s, [slug]: change(s[slug] ?? { lessons: {}, attempts: [] }) }));

  const value = {
    lessonsDone: (slug, keys = []) => keys.filter((k) => course(slug).lessons[k]).length,
    isLessonDone: (slug, key) => !!course(slug).lessons[key],
    completeLesson: (slug, key) => update(slug, (c) => ({ ...c, lessons: { ...c.lessons, [key]: new Date().toISOString() } })),
    attempts: (slug) => course(slug).attempts,
    addAttempt: (slug, attempt) => update(slug, (c) => ({ ...c, attempts: [...c.attempts, { ...attempt, date: new Date().toISOString() }].slice(-20) })),
    // The most recent passing attempt, if any.
    lastPass: (slug) => [...course(slug).attempts].reverse().find((a) => a.passed) ?? null,
    // not-started, in-progress, ready (all lessons done, assessment to take), passed, due (renewal due within 30 days or overdue)
    status: (c) => {
      const pass = [...course(c.slug).attempts].reverse().find((a) => a.passed);
      if (pass) {
        const due = new Date(addMonths(pass.date, c.renewMonths ?? 12));
        const soon = new Date();
        soon.setDate(soon.getDate() + 30);
        return due < soon ? { id: "due", due: due.toISOString() } : { id: "passed", due: due.toISOString(), pass };
      }
      const done = (c.lessonKeys ?? []).filter((k) => course(c.slug).lessons[k]).length;
      if (done === 0 && !course(c.slug).attempts.length) return { id: "not-started" };
      return done >= (c.lessonKeys?.length ?? 0) ? { id: "ready" } : { id: "in-progress" };
    },
  };
  return <ComplianceContext.Provider value={value}>{children}</ComplianceContext.Provider>;
}

export const useCompliance = () => useContext(ComplianceContext);

export const REGIONS = { global: "Global", uk: "UK", "us-ny": "US (New York)" };
export const STATUS_LABELS = { "not-started": "Not started", "in-progress": "In progress", ready: "Ready for the assessment", passed: "Passed", due: "Renewal due" };

// Groups on the Compliance page, in order. Mirrors COMPLIANCE_CATEGORIES in studio/schemaTypes/options.js.
export const CATEGORIES = [
  { title: "Cybersecurity & Data Protection", value: "data" },
  { title: "Financial & Business Integrity", value: "integrity" },
  { title: "Ethics & Responsible Business Practices", value: "ethics" },
  { title: "Workplace Conduct & Diversity", value: "conduct" },
  { title: "Health, Safety & Well-being", value: "safety" },
  { title: "International & US Compliance", value: "us" },
];
