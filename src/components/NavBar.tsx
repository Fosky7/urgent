import { Link } from "@tanstack/react-router";

/**
 * Primary navigation for the app shell.
 *
 * "Receipts" is always present in the link set so donors can reach their
 * receipt history from every page — including /receipts itself, where it is
 * rendered with the active modifier.
 */
const NAV_LINKS = [
  { to: "/swipe", label: "Browse" },
  { to: "/submit", label: "Submit" },
  { to: "/receipts", label: "Receipts" },
] as const;

export function NavBar() {
  return (
    <header className="nav">
      <div className="nav__inner">
        <Link to="/" className="brand" aria-label="KindSwipe home">
          <span className="brand__mark" aria-hidden="true">
            K
          </span>
          <span className="brand__name">KindSwipe</span>
        </Link>

        <nav className="nav__links" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="nav__link"
              activeProps={{ className: "nav__link nav__link--active" }}
              activeOptions={{ exact: false }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default NavBar;
