import IconBadge from "../IconBadge.jsx";

// A tool's logo if one has been uploaded in Sanity, otherwise its icon in a soft tile.
export default function ToolMark({ tool, size = "md" }) {
  if (tool?.logo?.url) {
    return <span className={`tool-mark tool-mark--${size}`}><img src={`${tool.logo.url}?h=96&fit=max&auto=format`} alt="" /></span>;
  }
  return <IconBadge name={tool?.icon || "laptop"} size={size} accent={tool?.accent || "brand"} />;
}
