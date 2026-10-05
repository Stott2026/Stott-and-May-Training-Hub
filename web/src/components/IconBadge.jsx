import { Icon } from "./icons.jsx";
import "./accents.css";
import "./IconBadge.css";

// A line icon sitting in a soft gradient tile, as in the brand iconography.
// variant "soft" (light tint) or "solid" (full gradient).
export default function IconBadge({ name, size = "md", variant = "soft", accent = "brand", shape = "rounded" }) {
  const iconSize = { sm: 18, md: 22, lg: 28 }[size];
  return (
    <span className={`icon-badge icon-badge--${size} icon-badge--${variant} icon-badge--${shape}`} data-accent={accent}>
      <Icon name={name} size={iconSize} />
    </span>
  );
}
