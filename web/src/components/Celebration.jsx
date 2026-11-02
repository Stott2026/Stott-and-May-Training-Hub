import { useEffect } from "react";
import { Link } from "react-router";
import IconBadge from "./IconBadge.jsx";
import { Icon } from "./icons.jsx";
import { useAchievements } from "../lib/achievements.jsx";
import "./Celebration.css";

// A pop-up with a burst of confetti when someone earns a badge or moves up a level.
// It closes itself after a few seconds; the next one (if any) follows.
export default function Celebration() {
  const { celebration: c, dismiss } = useAchievements();
  useEffect(() => {
    if (!c) return;
    const t = setTimeout(dismiss, 7000);
    return () => clearTimeout(t);
  }, [c, dismiss]);

  return (
    <div className="celebration-region" role="status" aria-live="polite">
      {c && (
        <div key={c.id} className={`celebration celebration--${c.kind}`}>
          <div className="celebration__confetti" aria-hidden="true">
            {Array.from({ length: 16 }, (_, i) => <span key={i} style={{ "--i": i }} />)}
          </div>
          <IconBadge name={c.kind === "level" ? "crown" : c.badge.icon || "award"} variant="solid" shape="circle" size="lg" />
          <div className="celebration__text">
            <p className="celebration__eyebrow">{c.kind === "level" ? `Level ${c.number} reached` : "Badge earned"}</p>
            <p className="celebration__title">{c.kind === "level" ? `You're now a ${c.level.title}` : c.badge.title}</p>
            <p className="celebration__note">
              {c.kind === "level" ? "Keep going to reach the next level." : c.badge.description}{" "}
              <Link to="/achievements" onClick={dismiss} className="celebration__link">See your badges</Link>
            </p>
          </div>
          <button type="button" className="celebration__close" onClick={dismiss} aria-label="Close">
            <Icon name="x" size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
