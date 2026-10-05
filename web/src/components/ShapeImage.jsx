import "./accents.css";
import "./ShapeImage.css";

// A cut-out photo of a person rising out of a brand shape, from "Imagery in Shapes".
// shape: "squircle", "diamond" or "rings". Photos with transparent backgrounds work best.
export default function ShapeImage({ src, alt = "", shape = "squircle", accent = "brand", className = "" }) {
  return (
    <figure className={`shape-image shape-image--${shape} ${className}`} data-accent={accent}>
      <span className="shape-image__shape" aria-hidden="true" />
      {shape === "rings" && <span className="shape-image__rings" aria-hidden="true" />}
      <img className="shape-image__photo" src={src} alt={alt} />
    </figure>
  );
}
