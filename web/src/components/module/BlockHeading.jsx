import IconBadge from "../IconBadge.jsx";

// Heading used at the top of each content block in a section.
export default function BlockHeading({ icon, title, hint, tone = "brand" }) {
  return (
    <div className={`block-heading block-heading--${tone}`}>
      <IconBadge name={icon} size="sm" variant={tone === "danger" ? "soft" : "solid"} />
      <div>
        <h3 className="block-heading__title">{title}</h3>
        {hint && <p className="block-heading__hint">{hint}</p>}
      </div>
    </div>
  );
}
