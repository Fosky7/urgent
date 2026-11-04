import { test, expect } from "@playwright/test";

test.describe("Module 1 — welcome page & navigation shell", () => {
  test("welcome page shows the headline and the How it works explainer @affected", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "Pay bills for people, one swipe at a time",
      }),
    ).toBeVisible();

    await expect(
      page.getByRole("heading", { level: 2, name: "How it works" }),
    ).toBeVisible();

    // The explainer text lives directly under the How it works heading.
    await expect(page.getByText(/KindSwipe is a pay-it-forward app/i)).toBeVisible();
  });

  test("clicking Browse bills opens the Swipe bills page @affected", async ({
    page,
  }) => {
    await page.goto("/");

    await page.getByRole("link", { name: "Browse bills" }).first().click();

    await expect(page).toHaveURL(/\/swipe$/);
    await expect(
      page.getByRole("heading", { level: 1, name: "Swipe bills" }),
    ).toBeVisible();
    await expect(page.getByText("Ikeja Electric").first()).toBeVisible();
  });

  test("clicking Submit a bill opens the Submit a bill request page @affected", async ({
    page,
  }) => {
    await page.goto("/");

    await page.getByRole("link", { name: "Submit a bill" }).first().click();

    await expect(page).toHaveURL(/\/submit$/);
    await expect(
      page.getByRole("heading", { level: 1, name: "Submit a bill request" }),
    ).toBeVisible();
  });

  test("navigation bar exposes the Receipts link on /receipts @affected", async ({
    page,
  }) => {
    await page.goto("/receipts");

    const primaryNav = page.getByRole("navigation", { name: "Primary" });
    await expect(primaryNav.getByRole("link", { name: "Receipts" })).toBeVisible();

    // Clicking it keeps the visitor on the receipts page.
    await primaryNav.getByRole("link", { name: "Receipts" }).click();
    await expect(page).toHaveURL(/\/receipts$/);
    await expect(
      page.getByRole("heading", { level: 1, name: "Receipts" }),
    ).toBeVisible();
  });
});
