import "./Eyebrow.css";

// Small uppercase label that sits above headings, e.g. "OUR VALUES".
export default function Eyebrow({ children, tone = "brand", as: Tag = "p", className = "" }) {
  return <Tag className={`eyebrow eyebrow--${tone} ${className}`}>{children}</Tag>;
}
