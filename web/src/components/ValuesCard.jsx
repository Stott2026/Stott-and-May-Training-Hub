import Card from "./Card.jsx";
import Eyebrow from "./Eyebrow.jsx";
import IconBadge from "./IconBadge.jsx";
import ShapeImage from "./ShapeImage.jsx";
import Wave from "./Wave.jsx";
import { placeholderPhotos } from "../lib/placeholderPhotos.js";
import "./ValuesCard.css";

const VALUE_ACCENTS = ["brand", "sky", "lime"];

// "The Stott and May Way": the philosophy (from the Home page in Sanity) and the company values.
export default function ValuesCard({ title, text, values = [] }) {
  return (
    <Card tone="soft" topBar={false} className="values" aria-labelledby="values-title">
      <div className="values__intro">
        <div>
          <Eyebrow>Our philosophy</Eyebrow>
          <h2 id="values-title" className="section-title">{title}</h2>
          {text && <p className="section-lead">{text}</p>}
          <Wave height={24} />
        </div>
        <ShapeImage src={placeholderPhotos.values} shape="rings" className="values__person" />
      </div>
      <Eyebrow>Our values</Eyebrow>
      <ul className="values__grid">
        {values.map((v, i) => (
          <li key={v._id}>
            <Card className="value-card" accent={VALUE_ACCENTS[i % VALUE_ACCENTS.length]}>
              <IconBadge name={v.icon} variant="solid" accent={VALUE_ACCENTS[i % VALUE_ACCENTS.length]} />
              <h3 className="value-card__title">{v.title}</h3>
              <p className="value-card__desc">{v.description}</p>
            </Card>
          </li>
        ))}
      </ul>
    </Card>
  );
}
