import { useEffect, useState } from "react";
import "./accents.css";
import "./ProgressBar.css";

// Horizontal progress bar with the gradient fill. value is 0–100.
export default function ProgressBar({ value = 0, label, showValue = false, size = "md", accent = "brand" }) {
  const pct = Math.max(0, Math.min(100, Math.round(value)));
  // Starts empty and fills up to the value just after it appears.
  const [shown, setShown] = useState(0);
  useEffect(() => { const f = requestAnimationFrame(() => setShown(pct)); return () => cancelAnimationFrame(f); }, [pct]);
  return (
    <div className={`progress progress--${size}`} data-accent={accent}>
      {(label || showValue) && (
        <div className="progress__meta">
          {label && <span className="progress__label">{label}</span>}
          {showValue && <span className="progress__value">{pct}%</span>}
        </div>
      )}
      <div className="progress__track" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label={label || "Progress"}>
        <div className="progress__fill" style={{ width: `${shown}%` }} />
      </div>
    </div>
  );
}
