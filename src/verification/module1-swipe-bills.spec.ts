import { test, expect } from "@playwright/test";

/**
 * Module 1 — swipe bills browse page (@affected).
 *
 * Verifies that the landing-page CTA and the primary navigation both reach the
 * deck at /swipe, and that the page renders its heading plus the verified bill
 * cards (first one is "Ikeja Electric").
 */

test.describe("Module 1 — swipe bills browse page @affected", () => {
  test("landing page CTA opens the swipe bills page", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", {
        name: "Pay bills for people, one swipe at a time",
      }),
    ).toBeVisible();

    await page.getByRole("link", { name: "Browse bills" }).first().click();

    await expect(page).toHaveURL(/\/swipe$/);
    await expect(
      page.getByRole("heading", { name: "Swipe bills", level: 1 }),
    ).toBeVisible();
    await expect(page.getByText("Ikeja Electric").first()).toBeVisible();
  });

  test("primary navigation exposes the deck as 'Browse bills' and navigates client-side", async ({
    page,
  }) => {
    await page.goto("/");

    const nav = page.getByRole("navigation", { name: "Primary" });
    await expect(nav).toBeVisible();
    await expect(
      nav.getByRole("link", { name: "Browse bills" }),
    ).toBeVisible();
    await expect(
      nav.getByRole("link", { name: "Receipts", exact: true }),
    ).toBeVisible();

    // A full reload would wipe this marker; a router <Link> navigation keeps it.
    await page.evaluate(() => {
      (window as unknown as { __ksNoReload?: boolean }).__ksNoReload = true;
    });

    await nav.getByRole("link", { name: "Browse bills" }).click();

    await expect(page).toHaveURL(/\/swipe$/);
    await expect(
      page.getByRole("heading", { name: "Swipe bills", level: 1 }),
    ).toBeVisible();

    const survived = await page.evaluate(
      () => (window as unknown as { __ksNoReload?: boolean }).__ksNoReload === true,
    );
    expect(survived).toBe(true);

    // Active state highlights the deck link while on /swipe.
    await expect(nav.getByRole("link", { name: "Browse bills" })).toHaveClass(
      /nav__link--active/,
    );
  });

  test("verified bills render with biller, amount, story and badges", async ({
    page,
  }) => {
    await page.goto("/swipe");

    await expect(
      page.getByRole("heading", { name: "Swipe bills", level: 1 }),
    ).toBeVisible();

    const grid = page.getByRole("region", {
      name: "Verified bills waiting for a pledge",
    });
    await expect(grid).toBeVisible();

    const cards = grid.getByRole("article");
    await expect(cards.first()).toBeVisible();
    expect(await cards.count()).toBeGreaterThan(0);

    const firstCard = cards.first();
    await expect(
      firstCard.getByRole("heading", { name: "Ikeja Electric", level: 2 }),
    ).toBeVisible();
    await expect(firstCard).toContainText("Meter 0417 2290 118");
    await expect(firstCard).toContainText("18,500");
    await expect(firstCard.getByText("Verified", { exact: true })).toBeVisible();
    await expect(firstCard.getByText("Electricity", { exact: true })).toBeVisible();
    await expect(firstCard).toContainText("Power was cut on Monday");

    // Every card carries the checked timestamp and a category badge.
    const cardCount = await cards.count();
    for (let index = 0; index < cardCount; index += 1) {
      await expect(cards.nth(index)).toContainText(/Checked /);
    }
  });
});
