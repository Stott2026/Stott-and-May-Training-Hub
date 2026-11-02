import { useEffect, useState } from "react";
import Eyebrow from "./Eyebrow.jsx";
import IconBadge from "./IconBadge.jsx";
import ProgressBar from "./ProgressBar.jsx";
import { Icon } from "./icons.jsx";
import { useAchievements } from "../lib/achievements.jsx";
import "./AchievementsCard.css";

// Counts up to a number when it first appears (or changes), for a bit of life. Jumps straight
// there for people who prefer reduced motion.
function useCountUp(target, ms = 900) {
  const [n, setN] = useState(target);
  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) { setN(target); return; }
    let frame, start;
    const from = 0;
    const step = (t) => {
      start ??= t;
      const k = Math.min(1, (t - start) / ms);
      setN(Math.round(from + (target - from) * (1 - (1 - k) ** 3)));
      if (k < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target, ms]);
  return n;
}

// The home page's achievements: level, points to the next level, streak and the badge shelf.
export default function AchievementsCard() {
  const a = useAchievements();
  const points = useCountUp(a.points ?? 0);
  if (!a.enabled) return null;
  const from = a.level?.points ?? 0;
  const toNext = a.next ? a.next.points - a.points : 0;
  const pct = a.next ? ((a.points - from) / (a.next.points - from)) * 100 : 100;
  const earned = a.badges.filter((b) => b.earned).length;

  return (
    <section id="achievements" className="achievements" aria-labelledby="achievements-title">
      <div className="achievements__level">
        <div className="achievements__medal" aria-hidden="true">
          <Icon name="crown" size={30} />
          <span className="achievements__medal-number">{a.levelIndex + 1}</span>
        </div>
        <div className="achievements__level-body">
          <Eyebrow>{a.title || "Your achievements"}</Eyebrow>
          <h2 id="achievements-title" className="achievements__level-title">
            Level {a.levelIndex + 1}: {a.level.title}
          </h2>
          <p className="achievements__points"><strong>{points.toLocaleString("en-GB")}</strong> points</p>
          <ProgressBar value={pct} size="md" label={a.next ? `${toNext.toLocaleString("en-GB")} points to ${a.next.title}` : "Top level reached"} />
        </div>
        <div className={`achievements__streak${a.streak > 0 ? " is-on" : ""}`}>
          <Icon name="flame" size={26} />
          <span className="achievements__streak-number">{a.streak}</span>
          <span className="achievements__streak-label">day streak</span>
        </div>
      </div>

      <div className="achievements__badges-head">
        <h3 className="achievements__badges-title">Badges</h3>
        <span className="achievements__badges-count">{earned} of {a.badges.length} earned</span>
      </div>
      <ul className="achievements__badges">
        {a.badges.map((b, i) => (
          <li key={b._key ?? b.rule} className={`badge-tile${b.earned ? " is-earned" : ""}`} style={{ "--n": i }}>
            {b.earned ? <IconBadge name={b.icon || "award"} variant="solid" shape="circle" /> : (
              <span className="badge-tile__locked" aria-hidden="true">
                <Icon name={b.icon || "award"} size={22} />
                <span className="badge-tile__lock"><Icon name="lock" size={12} /></span>
              </span>
            )}
            <span className="badge-tile__name">{b.title}</span>
            <span className="badge-tile__how">{b.description}</span>
            <span className="visually-hidden">{b.earned ? "Earned" : "Not earned yet"}</span>
          </li>
        ))}
      </ul>
      <p className="achievements__note">Points, badges and streaks are saved on this computer for now. Streaks count working days, so weekends never break them.</p>
    </section>
  );
}
