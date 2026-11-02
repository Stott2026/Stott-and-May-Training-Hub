import { Link } from "react-router";
import Card from "../Card.jsx";
import ProgressBar from "../ProgressBar.jsx";
import { Icon } from "../icons.jsx";
import ToolMark from "./ToolMark.jsx";
import { useProgress } from "../../lib/progress.jsx";

// A tool's tile on the Technology page: what it is, when it's taught, and how far through
// setting it up the learner is.
export default function ToolCard({ tool }) {
  const { isSetupTicked } = useProgress();
  const total = tool.setupCount ?? 0;
  const ticked = [...Array(total).keys()].filter((i) => isSetupTicked(tool.slug, i)).length;
  return (
    <Card as={Link} to={`/tech/${tool.slug}`} interactive accent={tool.accent || "brand"} className="tool-card">
      <div className="tool-card__top">
        <ToolMark tool={tool} />
        {total > 0 && ticked === total && <span className="tool-card__status"><Icon name="badge-check" size={14} /> Set up</span>}
      </div>
      <p className="tool-card__role">{tool.role}</p>
      <h3 className="tool-card__name">{tool.name}</h3>
      <p className="tool-card__summary">{tool.summary}</p>
      {total > 0 && <ProgressBar value={(ticked / total) * 100} size="sm" accent={tool.accent} label={`${ticked} of ${total} set up`} />}
      <div className="tool-card__footer">
        <span>{tool.week || (tool.family ? `Part of ${tool.family}` : "In your toolkit")}</span>
        <span className="tool-card__go">Learn it <Icon name="arrow-right" size={14} /></span>
      </div>
    </Card>
  );
}
