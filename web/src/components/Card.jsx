import "./accents.css";
import "./Card.css";

// White card with the brand gradient top border.
// tone: "surface" (white) or "soft" (light gradient tint). accent: "brand", "sky" or "lime".
// Set interactive when the whole card is a button or link.
export default function Card({ as: Tag = "div", tone = "surface", accent = "brand", topBar = true, interactive = false, className = "", children, ...rest }) {
  const classes = ["card", `card--${tone}`, topBar && "card--bar", interactive && "card--interactive", className].filter(Boolean).join(" ");
  return (
    <Tag className={classes} data-accent={accent} {...rest}>
      {children}
    </Tag>
  );
}
