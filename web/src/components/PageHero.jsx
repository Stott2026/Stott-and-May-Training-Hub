import Eyebrow from "./Eyebrow.jsx";
import ShapeImage from "./ShapeImage.jsx";
import Wave from "./Wave.jsx";
import "./PageHero.css";

// The gradient header at the top of the Library and Managers pages.
export default function PageHero({ eyebrow, title, intro, photo, children }) {
  return (
    <section className="page-hero" aria-labelledby="page-hero-title">
      <div className="page-hero__wave" aria-hidden="true"><Wave variant="glow" /></div>
      <div className="container page-hero__inner">
        <div>
          {eyebrow && <Eyebrow tone="ink">{eyebrow}</Eyebrow>}
          <h1 id="page-hero-title" className="page-hero__title">{title}</h1>
          {intro && <p className="page-hero__lead">{intro}</p>}
          {children}
        </div>
        {photo && <ShapeImage src={photo} shape="squircle" className="page-hero__person" />}
      </div>
    </section>
  );
}
