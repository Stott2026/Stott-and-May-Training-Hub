import "./accents.css";
import "./Avatar.css";

// Circular photo with the brand gradient ring, as in the brand card creative.
export default function Avatar({ src, alt = "", size = 56, accent = "brand", initials }) {
  return (
    <span className="avatar" data-accent={accent} style={{ width: size, height: size }}>
      {src ? <img src={src} alt={alt} /> : <span className="avatar__initials" aria-hidden={!alt}>{initials}</span>}
    </span>
  );
}
