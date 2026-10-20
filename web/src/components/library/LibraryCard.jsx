import Button from "../Button.jsx";
import Card from "../Card.jsx";
import Eyebrow from "../Eyebrow.jsx";
import IconBadge from "../IconBadge.jsx";
import { Icon } from "../icons.jsx";
import { canDownload, downloadUrl, fileDetails, kindOf } from "../../lib/library.js";
import "./LibraryCard.css";

// One file in the Library: what it is, the session facts, and a download button.
export default function LibraryCard({ item }) {
  const kind = kindOf(item.kind);
  const accent = item.module?.accent ?? "brand";
  return (
    <Card as="article" accent={accent} className="library-card">
      <div className="library-card__head">
        <IconBadge name={kind.icon} accent={accent} />
        <Eyebrow>{[item.label, kind.label].filter(Boolean).join(" · ")}</Eyebrow>
      </div>
      <h3 className="library-card__title">{item.title}</h3>
      <p className="library-card__summary">{item.summary}</p>
      {(item.duration || item.audience) && (
        <ul className="library-card__facts">
          {item.duration && <li><Icon name="clock" size={16} /> {item.duration}</li>}
          {item.audience && <li><Icon name="users" size={16} /> {item.audience}</li>}
        </ul>
      )}
      <div className="library-card__actions">
        {canDownload ? (
          <Button href={downloadUrl(item)} icon="download" size="sm" download aria-label={`Download ${item.title} (${fileDetails(item.file)})`}>
            Download
          </Button>
        ) : (
          <Button size="sm" icon="download" disabled title="Downloads work in the live hub">Download</Button>
        )}
        {item.module && <Button to={`/modules/${item.module.slug}`} variant="ghost" size="sm" iconAfter="arrow-right">Open module</Button>}
      </div>
      <p className="library-card__file">{fileDetails(item.file)}</p>
    </Card>
  );
}
