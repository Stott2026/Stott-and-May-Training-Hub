import Eyebrow from "./Eyebrow.jsx";
import ShapeImage from "./ShapeImage.jsx";
import Wave from "./Wave.jsx";
import "./PageHero.css";

// The header at the top of the hub's section pages (Library, Managers, Forms and so on).
// tone: "gradient" (the brand gradient), "light" (the light page with outlined shapes) or "dark"
//   (use inside a theme-dark wrapper). Mixing them keeps the sections from all looking alike.
// titleAccent: optional second line of the heading in the accent colour (the brand's two-tone headline).
// decoration: optional background shapes. photoShape: "squircle" (a cut-out person), "rings" or
//   "frame" (an office photo); see ShapeImage.
export default function PageHero({ eyebrow, title, titleAccent, intro, photo, photoShape = "squircle", tone = "gradient", decoration, children }) {
  const shapes = decoration ?? (tone !== "gradient" && <div className="brand-shapes" aria-hidden="true"><span /><span /><span /><span /></div>);
  return (
    <section className={`page-hero page-hero--${tone}`} aria-labelledby="page-hero-title">
      {shapes}
      <div className="page-hero__wave" aria-hidden="true"><Wave variant="glow" /></div>
      <div className="container page-hero__inner">
        <div>
          {eyebrow && <Eyebrow tone={tone === "gradient" ? "ink" : "brand"}>{eyebrow}</Eyebrow>}
          <h1 id="page-hero-title" className="page-hero__title">
            {title}
            {titleAccent && <span className="headline-accent">{titleAccent}</span>}
          </h1>
          {intro && <p className="page-hero__lead">{intro}</p>}
          {children}
        </div>
        {photo && <ShapeImage src={photo} shape={photoShape} className="page-hero__person" />}
      </div>
    </section>
  );
}
