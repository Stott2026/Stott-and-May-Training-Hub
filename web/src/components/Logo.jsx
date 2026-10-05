import { assetUrl } from "../lib/assetUrl.js";
import "./Logo.css";

// The Stott and May logo mark. tone="dark" for light backgrounds, "light" for dark ones.
export default function Logo({ tone = "dark", size = 40 }) {
  return (
    <img
      className="logo"
      src={assetUrl(tone === "light" ? "brand/logo-light.png" : "brand/logo-dark.png")}
      alt="Stott and May"
      width={size}
      height={size}
    />
  );
}
