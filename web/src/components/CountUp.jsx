import { useEffect, useState } from "react";

// A number that counts up to its value when it first appears (and when the value changes), then
// settles with a tiny bounce (motion.css). Shows the final number straight away for anyone whose
// device asks for reduced motion.
const reduced = () => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

export default function CountUp({ value = 0, duration = 900 }) {
  const target = Number(value) || 0;
  const [n, setN] = useState(() => (reduced() ? target : 0));
  const [done, setDone] = useState(reduced());
  useEffect(() => {
    if (reduced() || target === 0) { setN(target); setDone(true); return; }
    setDone(false);
    let frame;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      setN(Math.round(target * (1 - Math.pow(1 - t, 3))));
      if (t < 1) frame = requestAnimationFrame(tick);
      else setDone(true);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);
  return <span className={`count-up${done ? " is-done" : ""}`}>{n.toLocaleString("en-GB")}</span>;
}
