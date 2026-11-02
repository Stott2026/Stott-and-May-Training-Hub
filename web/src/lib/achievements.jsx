import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useApi } from "./api.js";
import { useProgress, today } from "./progress.jsx";
import { useSite } from "./site.jsx";

// Points, levels, badges and streaks, worked out from the learner's progress and the
// "Badges and levels" settings in Sanity. Like progress, it all stays in this browser for now.
// When something new is earned, it is queued as a celebration (shown by <Celebration />).
const SEEN_KEY = "sm-hub-rewards";
const AchievementsContext = createContext({ enabled: false });

// How each badge rule in the Studio (studio/schemaTypes/options.js, BADGE_RULES) is checked.
const RULES = {
  "first-section": (s) => s.sections >= 1,
  "first-module": (s) => s.modules >= 1,
  "five-modules": (s) => s.modules >= 5,
  "ten-modules": (s) => s.modules >= 10,
  "all-modules": (s) => s.moduleCount > 0 && s.modules >= s.moduleCount,
  "path-step": (s) => s.pathSteps >= 1,
  "path-complete": (s) => s.pathStepCount > 0 && s.pathSteps >= s.pathStepCount,
  "quick-checks": (s) => s.quickChecks >= 10,
  "first-activity": (s) => s.activities >= 1,
  "five-activities": (s) => s.activities >= 5,
  "tool-setup": (s) => s.toolsSetUp >= 1,
  "core-setup": (s) => s.coreCount > 0 && s.coreSetUp >= s.coreCount,
  "big-five": (s) => s.bigFiveDays >= 5,
  "quiz-taken": (s) => s.quizRounds >= 1,
  "quiz-ace": (s) => s.quizAce,
  "streak-3": (s) => s.bestStreak >= 3,
  "streak-5": (s) => s.bestStreak >= 5,
};

// Working days in a row, so a weekend never breaks a streak. Learning at the weekend
// still counts towards the days learnt but isn't needed to keep a streak going.
const isWeekend = (d) => d.getDay() === 0 || d.getDay() === 6;
const key = (d) => d.toLocaleDateString("en-CA");
function previousWorkingDay(d) {
  const p = new Date(d);
  do p.setDate(p.getDate() - 1); while (isWeekend(p));
  return p;
}
function streaks(days) {
  const set = new Set(days);
  const working = [...set].map((k) => new Date(`${k}T12:00:00`)).filter((d) => !isWeekend(d)).sort((a, b) => a - b);
  // Longest run ever, for badges.
  let best = 0, run = 0, last = null;
  for (const d of working) {
    run = last && key(previousWorkingDay(d)) === key(last) ? run + 1 : 1;
    best = Math.max(best, run);
    last = d;
  }
  // Current run: it ends today, or on the last working day if they haven't learnt yet today.
  let d = new Date(`${today()}T12:00:00`);
  if (isWeekend(d) || !set.has(key(d))) d = previousWorkingDay(d);
  let current = 0;
  while (set.has(key(d))) { current++; d = previousWorkingDay(d); }
  return { current, best };
}

function readSeen() {
  try { return JSON.parse(localStorage.getItem(SEEN_KEY)); } catch { return null; }
}
function writeSeen(seen) {
  try { localStorage.setItem(SEEN_KEY, JSON.stringify(seen)); } catch { /* storage blocked */ }
}

export function AchievementsProvider({ children }) {
  const { rewards } = useSite();
  const progress = useProgress();
  const enabled = !!rewards?.levels?.length;
  // The modules and the Start here path, to know when a module or step is finished.
  const modules = useApi(enabled ? "/modules" : null);
  const home = useApi(enabled ? "/home" : null);
  // The tech tools, to know which are core systems. Not needed for anything else, so a
  // failure here just leaves the tool badges unearned.
  const tech = useApi(enabled ? "/tech" : null);
  const ready = enabled && !!modules.data && !!home.data;

  const result = useMemo(() => {
    if (!ready) return null;
    const finished = (m) => m?.sectionKeys?.length > 0 && progress.countDone(m.slug, m.sectionKeys) >= m.sectionKeys.length;
    const steps = (home.data.startHere?.steps ?? []).filter((s) => s.modules?.filter(Boolean).length);
    const best = progress.quizScores.reduce((b, q) => Math.max(b, q.score), 0);
    const streak = streaks(progress.days);
    const stats = {
      sections: progress.sectionsDone,
      modules: modules.data.filter(finished).length,
      moduleCount: modules.data.length,
      pathSteps: steps.filter((s) => s.modules.filter(Boolean).every(finished)).length,
      pathStepCount: steps.length,
      quickChecks: progress.quickChecksRight,
      activities: progress.activitiesDone,
      toolsSetUp: progress.toolsSetUp.length,
      coreCount: (tech.data?.tools ?? []).filter((t) => t.core && t.setupCount > 0).length,
      coreSetUp: (tech.data?.tools ?? []).filter((t) => t.core && t.setupCount > 0 && progress.toolsSetUp.includes(t.slug)).length,
      bigFiveDays: progress.bigFiveDays,
      quizRounds: progress.quizScores.length,
      quizAce: progress.quizScores.some((q) => q.total > 0 && q.score === q.total),
      bestStreak: streak.best,
    };
    const p = rewards.points ?? {};
    const points = stats.sections * (p.section ?? 0) + stats.modules * (p.module ?? 0) + stats.quickChecks * (p.quickCheck ?? 0) + best * (p.quizAnswer ?? 0) + stats.activities * (p.activity ?? 0) + stats.toolsSetUp * (p.toolSetup ?? 0);
    const levels = [...rewards.levels].sort((a, b) => (a.points ?? 0) - (b.points ?? 0));
    const levelIndex = Math.max(0, levels.findLastIndex((l) => points >= (l.points ?? 0)));
    const badges = (rewards.badges ?? []).filter((b) => RULES[b.rule]).map((b) => ({ ...b, earned: RULES[b.rule](stats) }));
    return { points, levels, levelIndex, level: levels[levelIndex], next: levels[levelIndex + 1] ?? null, badges, streak: streak.current, stats };
  }, [ready, rewards, modules.data, home.data, tech.data, progress]);

  // Spot anything new since last time and queue a celebration. The very first time, everything
  // already earned is noted quietly, so nobody gets a flood of pop-ups.
  const [celebrations, setCelebrations] = useState([]);
  useEffect(() => {
    if (!result) return;
    const earned = result.badges.filter((b) => b.earned).map((b) => b.rule);
    const seen = readSeen();
    if (!seen) { writeSeen({ badges: earned, level: result.levelIndex }); return; }
    const fresh = result.badges.filter((b) => b.earned && !seen.badges.includes(b.rule));
    const levelledUp = result.levelIndex > (seen.level ?? 0);
    if (!fresh.length && !levelledUp) return;
    writeSeen({ badges: [...new Set([...seen.badges, ...earned])], level: Math.max(result.levelIndex, seen.level ?? 0) });
    setCelebrations((c) => [
      ...c,
      ...fresh.map((b) => ({ id: `badge-${b.rule}`, kind: "badge", badge: b })),
      ...(levelledUp ? [{ id: `level-${result.levelIndex}`, kind: "level", level: result.level, number: result.levelIndex + 1 }] : []),
    ]);
  }, [result]);

  const value = useMemo(() => ({
    enabled: !!result,
    title: rewards?.title,
    intro: rewards?.intro,
    ...result,
    celebration: celebrations[0] ?? null,
    dismiss: () => setCelebrations((c) => c.slice(1)),
  }), [result, rewards, celebrations]);

  return <AchievementsContext.Provider value={value}>{children}</AchievementsContext.Provider>;
}

export const useAchievements = () => useContext(AchievementsContext);
