import { test, expect } from "@playwright/test";

test.describe("ThemeChanger", () => {
  test("should change icon correctly when pressed", async ({ page }) => {
    const lightIcon = page.locator("#light-button");
    const darkIcon = page.locator("#dark-button");
    const button = page.locator(".theme-changer");

    await page.goto("/");
    
    await expect(darkIcon).toBeVisible();
    await expect(lightIcon).not.toBeVisible();

    await button.click();

    await expect(darkIcon).not.toBeVisible();
    await expect(lightIcon).toBeVisible();

    await button.click();

    await expect(darkIcon).toBeVisible();
    await expect(lightIcon).not.toBeVisible();
  });

  test('should show light mode icon when dark theme is set', async ({ page }) => {
    const lightIcon = page.locator("#light-button");
    const darkIcon = page.locator("#dark-button");
    const root = page.locator('html')

    await page.emulateMedia({ colorScheme: "dark" })

    await page.goto("/");

    await expect(root).toHaveAttribute('class', 'dark')
    await expect(darkIcon).not.toBeVisible();
    await expect(lightIcon).toBeVisible(); 
  })

  test('should show dark mode icon when light theme is set', async ({ page }) => {
    const lightIcon = page.locator("#light-button");
    const darkIcon = page.locator("#dark-button");
    const root = page.locator('html')

    await page.emulateMedia({ colorScheme: "light" })

    await page.goto("/");

    await expect(root).not.toHaveAttribute('class', 'dark')
    await expect(darkIcon).toBeVisible();
    await expect(lightIcon).not.toBeVisible(); 
  })
});
