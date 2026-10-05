import { useId } from "react";
import { Icon } from "./icons.jsx";
import "./SearchField.css";

// Pill-shaped search box with a visible label for screen readers.
export default function SearchField({ value, onChange, placeholder = "Search", label = "Search" }) {
  const id = useId();
  return (
    <div className="search-field">
      <label htmlFor={id} className="visually-hidden">{label}</label>
      <Icon name="search" size={20} className="search-field__icon" />
      <input id={id} type="search" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
      {value && (
        <button type="button" className="search-field__clear" onClick={() => onChange("")} aria-label="Clear search">
          <Icon name="x" size={18} />
        </button>
      )}
    </div>
  );
}
