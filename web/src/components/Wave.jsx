import { useId } from "react";
import "./Wave.css";

const PATH = "M0,18 C100,5 200,24 350,14 C500,4 600,22 700,12";

// The thin brand wave line. variant="line" is the divider; variant="glow" is the
// soft glowing wave used at the bottom of hero panels.
export default function Wave({ variant = "line", height = 28, className = "" }) {
  const id = useId();
  if (variant === "glow") {
    return (
      <svg className={`wave wave--glow ${className}`} viewBox="0 0 700 60" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id={`${id}-fill`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" className="wave__fill-top" />
            <stop offset="1" className="wave__fill-bottom" />
          </linearGradient>
        </defs>
        <path d="M0,40 C120,22 220,48 360,30 C500,12 600,40 700,20 L700,60 L0,60 Z" fill={`url(#${id}-fill)`} />
        <path d="M0,40 C120,22 220,48 360,30 C500,12 600,40 700,20" className="wave__glow-line" />
      </svg>
    );
  }
  return (
    <svg className={`wave wave--line ${className}`} style={{ height }} viewBox="0 0 700 28" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${id}-stroke`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" className="wave__stop-start" />
          <stop offset="1" className="wave__stop-end" />
        </linearGradient>
      </defs>
      <path d={PATH} stroke={`url(#${id}-stroke)`} className="wave__line" />
    </svg>
  );
}
