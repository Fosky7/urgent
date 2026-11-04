import { test, expect } from "@playwright/test";

test.describe("Module 1 landing, shell and page styling @affected", () => {
  test("home page shows the welcome heading and How it works", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { name: "Pay bills for people, one swipe at a time" }),
    ).toBeVisible();
    await expect(page.getByRole("heading", { name: "How it works" })).toBeVisible();
  });

  test("Browse bills opens the Swipe bills page", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("link", { name: "Browse bills" }).first().click();

    await expect(page.getByRole("heading", { name: "Swipe bills" })).toBeVisible();
  });

  test("Submit a bill opens the Submit a bill request page", async ({ page }) => {
    await page.goto("/");

    await page.getByRole("link", { name: "Submit a bill" }).first().click();

    await expect(page.getByRole("heading", { name: "Submit a bill request" })).toBeVisible();
  });

  test("Receipts link is present in the navigation bar on /receipts", async ({ page }) => {
    await page.goto("/receipts");

    await expect(page.getByRole("link", { name: "Receipts" })).toBeVisible();
  });

  test("shell and footer are actually styled", async ({ page }) => {
    await page.goto("/");

    const shell = page.locator(".shell");
    await expect(shell).toBeVisible();
    // Display:flex only comes from the stylesheet, not from a UA default for div.
    await expect
      .poll(async () => shell.evaluate((el) => getComputedStyle(el).display))
      .toBe("flex");

    const footer = page.locator("footer.footer");
    await expect(footer).toBeVisible();
    const borderTop = await footer.evaluate((el) => getComputedStyle(el).borderTopWidth);
    expect(borderTop).not.toBe("0px");

    const skipLink = page.getByRole("link", { name: "Skip to content" });
    await expect(skipLink).toHaveCount(1);
  });
});
