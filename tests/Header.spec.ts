import { test, expect } from "@playwright/test";

test.describe("Header", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Mobile Menu should work correctly when tapped", async ({ page }) => {
    // Mobile Menu should appear and disappear correctly when the nav button is pressed on mobile
    const navButton = page.locator(".mobile-menu");
    const menu = page.locator("nav");

    // Default state for mobile view, menu is hidden and menu icon is shown
    await expect(navButton).toBeVisible();
    await expect(menu).not.toBeVisible();

    await navButton.tap();

    await expect(navButton).toBeVisible();
    await expect(menu).toBeVisible();

    await navButton.tap();

    await expect(navButton).toBeVisible();
    await expect(menu).not.toBeVisible();
  });
});
