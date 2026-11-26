import { useMemo } from "react";

// A short burst of confetti for a high score or a booked meeting (Games.css). Shown only when the
// device doesn't ask for reduced motion; decoration only, so screen readers skip it.
const reduced = () => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

export default function Confetti({ pieces = 36 }) {
  const bits = useMemo(
    () => Array.from({ length: pieces }, (_, i) => ({
      left: Math.random() * 100,
      delay: Math.random() * 0.35,
      drift: (Math.random() - 0.5) * 160,
      spin: (Math.random() - 0.5) * 900,
      tone: i % 3,
      round: i % 4 === 0,
    })),
    [pieces]
  );
  if (reduced()) return null;
  return (
    <div className="confetti" aria-hidden="true">
      {bits.map((b, i) => (
        <span
          key={i}
          className={`confetti__bit confetti__bit--${b.tone}${b.round ? " confetti__bit--round" : ""}`}
          style={{ left: `${b.left}%`, animationDelay: `${b.delay}s`, "--drift": `${b.drift}px`, "--spin": `${b.spin}deg` }}
        />
      ))}
    </div>
  );
}
