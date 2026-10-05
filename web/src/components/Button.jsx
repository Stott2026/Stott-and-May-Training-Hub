import { Link } from "react-router";
import { Icon } from "./icons.jsx";
import "./Button.css";

// variant: "primary" (brand gradient), "secondary" (white with border), "dark", "ghost"
// Pass `to` for a link to another hub page, or `href` for any other address.
export default function Button({ variant = "primary", size = "md", icon, iconAfter, to, href, children, className = "", ...rest }) {
  const classes = `btn btn--${variant} btn--${size} ${className}`;
  const content = (
    <>
      {icon && <Icon name={icon} size={size === "sm" ? 16 : 18} />}
      <span>{children}</span>
      {iconAfter && <Icon name={iconAfter} size={size === "sm" ? 16 : 18} />}
    </>
  );
  if (to) return <Link to={to} className={classes} {...rest}>{content}</Link>;
  if (href) return <a href={href} className={classes} {...rest}>{content}</a>;
  return <button type="button" className={classes} {...rest}>{content}</button>;
}
