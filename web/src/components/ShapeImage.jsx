import { useId } from "react";
import "./accents.css";
import "./ShapeImage.css";

// A photo in a brand shape, from "Imagery in Shapes".
// shape: "squircle", "diamond" or "rings" for a cut-out person rising out of a brand shape
// (transparent-background photos), or "frame" for an ordinary photo in a rounded frame whose
// lower edge is cut by a gradient wave.
export default function ShapeImage({ src, alt = "", shape = "squircle", accent = "brand", className = "" }) {
  const id = useId();
  if (shape === "frame") {
    return (
      <figure className={`shape-image shape-image--frame ${className}`} data-accent={accent}>
        <img className="shape-image__framed" src={src} alt={alt} />
        <svg className="shape-image__wave" viewBox="0 0 100 24" preserveAspectRatio="none" aria-hidden="true" focusable="false">
          <defs>
            <linearGradient id={id} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" className="shape-image__wave-start" />
              <stop offset="1" className="shape-image__wave-end" />
            </linearGradient>
          </defs>
          <path d="M0 14 C 22 2, 48 26, 72 12 S 94 4, 100 8 L 100 24 L 0 24 Z" fill={`url(#${id})`} />
        </svg>
      </figure>
    );
  }
  return (
    <figure className={`shape-image shape-image--${shape} ${className}`} data-accent={accent}>
      <span className="shape-image__shape" aria-hidden="true" />
      {shape === "rings" && <span className="shape-image__rings" aria-hidden="true" />}
      <img className="shape-image__photo" src={src} alt={alt} />
    </figure>
  );
}
