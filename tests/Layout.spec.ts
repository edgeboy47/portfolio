import { test, expect } from "@playwright/test";

test.describe("Layout", () => {
  // test.beforeEach(async ({ page }) => {
  //   await page.goto("/");
  // });

  test("Theme should be set to dark if prefers-color-scheme: dark", async ({
    page,
  }) => {
    const root = page.locator("html");
    await page.emulateMedia({ colorScheme: "dark" });

    await page.goto("/");

    await expect(root).toHaveAttribute("class", "dark");
  });

  test("Theme should be set to light if prefers-color-scheme: light", async ({
    page,
  }) => {
    const root = page.locator("html");
    await page.emulateMedia({ colorScheme: "light" });

    await page.goto("/");

    await expect(root).not.toHaveAttribute("class", "dark");
  });

  test("Theme should be set to light if prefers-color-scheme is not set", async ({
    page,
  }) => {
    const root = page.locator("html");

    await page.goto("/");

    await expect(root).not.toHaveAttribute("class", "dark");
  });

  test.describe(() => {
    test.use({
      storageState: {
        cookies: [],
        origins: [
          {
            origin: "",
            localStorage: [
              {
                name: "theme",
                value: "dark",
              },
            ],
          },
        ],
      },
    });

    test("Theme should be set to dark if localStorage value is set to dark", async ({
      page,
    }) => {
      const root = page.locator("html");

      await page.goto("/");

      await expect(root).toHaveAttribute("class", "dark");
    });

    test("Theme should be set to dark if localStorage value is set to dark and prefers-color-scheme: light ", async ({
      page,
    }) => {
      const root = page.locator("html");
      await page.emulateMedia({ colorScheme: "light" });

      await page.goto("/");

      await expect(root).toHaveAttribute("class", "dark");
    });
  });

  test.describe(() => {
    test.use({
      storageState: {
        cookies: [],
        origins: [
          {
            origin: "",
            localStorage: [
              {
                name: "theme",
                value: "light",
              },
            ],
          },
        ],
      },
    });

    test("Theme should be set to light if localStorage value is set to light", async ({
      page,
    }) => {
      const root = page.locator("html");

      await page.goto("/");

      await expect(root).not.toHaveAttribute("class", "dark");
    });

    test("Theme should be set to light if localStorage value is set to light and prefers-color-scheme: dark", async ({
      page,
    }) => {
      const root = page.locator("html");
      await page.emulateMedia({ colorScheme: "dark" });

      await page.goto("/");

      await expect(root).not.toHaveAttribute("class", "dark");
    });
  });
});
