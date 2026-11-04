import { test, expect } from "@playwright/test";

/**
 * Module 1 verification — landing page, navigation shell and the receipts link.
 * These specs exercise the real UI: they click the real entry points and assert
 * the destination headings rendered by the router.
 */
test.describe("Module 1 — landing & navigation shell", () => {
  test(
    "landing page shows the welcome heading",
    { tag: "@affected" },
    async ({ page }) => {
      await page.goto("/");

      await expect(
        page.getByRole("heading", {
          level: 1,
          name: "Pay bills for people, one swipe at a time",
        }),
      ).toBeVisible();
    },
  );

  test(
    "landing page explains the app under the How it works heading",
    { tag: "@affected" },
    async ({ page }) => {
      await page.goto("/");

      await expect(
        page.getByRole("heading", { level: 2, name: "How it works" }),
      ).toBeVisible();

      await expect(
        page.getByText(/pay-it-forward app for household bills/i),
      ).toBeVisible();
    },
  );

  test(
    "clicking Browse bills opens the swipe deck",
    { tag: "@affected" },
    async ({ page }) => {
      await page.goto("/");

      await page.getByRole("link", { name: "Browse bills" }).click();

      await expect(page).toHaveURL(/\/swipe$/);
      await expect(
        page.getByRole("heading", { name: "Swipe bills" }),
      ).toBeVisible();
    },
  );

  test(
    "clicking Submit a bill opens the bill request page",
    { tag: "@affected" },
    async ({ page }) => {
      await page.goto("/");

      await page.getByRole("link", { name: "Submit a bill" }).click();

      await expect(page).toHaveURL(/\/submit$/);
      await expect(
        page.getByRole("heading", { name: "Submit a bill request" }),
      ).toBeVisible();
    },
  );

  test(
    "navigation bar shows the Receipts link on /receipts",
    { tag: "@affected" },
    async ({ page }) => {
      await page.goto("/receipts");

      const nav = page.getByRole("navigation", { name: "Primary" });
      await expect(nav).toBeVisible();

      const receiptsLink = nav.getByRole("link", { name: "Receipts" });
      await expect(receiptsLink).toBeVisible();
      await expect(receiptsLink).toHaveAttribute("href", "/receipts");
    },
  );
});
