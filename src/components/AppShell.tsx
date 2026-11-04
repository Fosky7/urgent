import type { ReactNode } from "react";
import { NavBar } from "@/components/NavBar";

interface AppShellProps {
  /** Page content rendered inside the shell's <main> landmark. */
  children: ReactNode;
}

/**
 * AppShell is the top-level layout used by the root route.
 *
 * It renders the persistent navigation bar (so links such as "Receipts" are
 * available on every page, including /receipts itself), the main content area
 * and a small footer. Keeping the shell in a dedicated component means both the
 * router root and any isolated page previews share exactly one layout.
 */
export function AppShell({ children }: AppShellProps) {
  return (
    <div className="shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <NavBar />

      <main className="shell__main" id="main-content">
        {children}
      </main>

      <footer className="footer">
        <p className="footer__note">
          KindSwipe settles verified household bills directly with the biller.
          Pledges never pass through a personal wallet.
        </p>
        <p className="footer__meta">Built for people who would rather swipe than scroll.</p>
      </footer>
    </div>
  );
}

export default AppShell;
