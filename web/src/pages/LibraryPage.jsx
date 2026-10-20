import { useEffect } from "react";
import { useSearchParams } from "react-router";
import Eyebrow from "../components/Eyebrow.jsx";
import LoadState from "../components/LoadState.jsx";
import ShapeImage from "../components/ShapeImage.jsx";
import Wave from "../components/Wave.jsx";
import LibraryCard from "../components/library/LibraryCard.jsx";
import { Icon } from "../components/icons.jsx";
import { useApi } from "../lib/api.js";
import { LIBRARY_KINDS, kindOf } from "../lib/library.js";
import { placeholderPhotos } from "../lib/placeholderPhotos.js";
import "./LibraryPage.css";

// The Library: classroom decks, guides and templates to download. Content comes from Sanity.
// ?type=deck shows one type only, so the filter survives Back.
export default function LibraryPage() {
  const { data, error } = useApi("/library");
  const [params, setParams] = useSearchParams();
  useEffect(() => { document.title = "Library · Stott and May Training Hub"; }, []);
  if (error || !data) return <LoadState error={error} />;

  const items = data.items ?? [];
  // Only offer the types that have something in them, in a fixed order.
  const kinds = Object.keys(LIBRARY_KINDS).filter((k) => items.some((i) => i.kind === k));
  const type = kinds.includes(params.get("type")) ? params.get("type") : null;
  const shown = type ? items.filter((i) => i.kind === type) : items;
  const filter = (k) => setParams(k ? { type: k } : {}, { replace: true });

  return (
    <>
      <section className="library-hero" aria-labelledby="library-title">
        <div className="library-hero__wave" aria-hidden="true"><Wave variant="glow" /></div>
        <div className="container library-hero__inner">
          <div>
            <Eyebrow tone="ink">Stott and May</Eyebrow>
            <h1 id="library-title" className="library-hero__title">{data.page?.title ?? "Library"}</h1>
            {data.page?.intro && <p className="library-hero__lead">{data.page.intro}</p>}
            <p className="library-hero__count">
              <Icon name="library" size={18} /> {items.length} {items.length === 1 ? "file" : "files"} to download
            </p>
          </div>
          <ShapeImage src={placeholderPhotos.values} shape="squircle" className="library-hero__person" />
        </div>
      </section>

      <div className="container library-body">
        {kinds.length > 1 && (
          <div className="library-filters" role="group" aria-label="Show">
            <FilterButton active={!type} onClick={() => filter(null)} label="Everything" count={items.length} />
            {kinds.map((k) => (
              <FilterButton key={k} active={type === k} onClick={() => filter(k)} icon={kindOf(k).icon} label={kindOf(k).plural} count={items.filter((i) => i.kind === k).length} />
            ))}
          </div>
        )}
        {shown.length ? (
          <ul className="library-grid" aria-live="polite">
            {shown.map((item) => <li key={item._id}><LibraryCard item={item} /></li>)}
          </ul>
        ) : (
          <p className="library-empty">Nothing in the Library yet. Files appear here once they're published in the Studio.</p>
        )}
      </div>
    </>
  );
}

function FilterButton({ active, onClick, icon, label, count }) {
  return (
    <button type="button" className="library-filter" aria-pressed={active} onClick={onClick}>
      {icon && <Icon name={icon} size={16} />}
      <span>{label}</span>
      <span className="library-filter__count">{count}</span>
    </button>
  );
}
