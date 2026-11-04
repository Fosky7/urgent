import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import "@/styles.css";

/**
 * Root route of the application.
 *
 * Every route in `src/routes` renders inside `<AppShell />`, which owns the
 * persistent chrome: the navigation bar (brand link, Browse bills,
 * Submit a bill and Receipts) and the page footer. Keeping the shell at the
 * root means the navigation bar — including the "Receipts" link — is present
 * on `/`, `/receipts` and every future route without extra wiring.
 */
export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFoundPage,
});

function RootLayout() {
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}

/**
 * Fallback for unknown URLs. Uses the same layout primitives as real pages so
 * a mistyped link never drops the visitor into an unstyled dead end.
 */
function NotFoundPage() {
  return (
    <main className="page page--narrow">
      <header className="page-head">
        <span className="eyebrow">404</span>
        <h1 className="page-title">This page took a different bus</h1>
        <p className="page-lede">
          We could not find the page you were looking for. Head back to the
          welcome page, or jump straight into the bills that are waiting to be
          cleared.
        </p>
      </header>

      <div className="hero__actions">
        <Link to="/" className="btn btn--primary">
          Back to the welcome page
        </Link>
        <Link to="/swipe" className="btn btn--ghost">
          Browse bills
        </Link>
        <Link to="/receipts" className="btn btn--ghost">
          Receipts
        </Link>
      </div>
    </main>
  );
}
