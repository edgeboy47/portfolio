import { test, expect } from "@playwright/test";
import type { Locator } from "@playwright/test";

test.describe("Contact Form", () => {
  let formSuccess: Locator;
  let formError: Locator;
  let nameField: Locator;
  let emailField: Locator;
  let messageField: Locator;
  let formButton: Locator;

  test.beforeEach(async ({ page }) => {
    await page.goto("/");

    formButton = page.locator("#form-button>button");
    formSuccess = page.locator("#form-success");
    formError = page.locator("#form-error");
    nameField = page.locator("#name");
    emailField = page.locator("#email");
    messageField = page.locator("#message");
  });

  test("should hide button when submitted successfully", async ({ page }) => {
    await page.route("/", (route) =>
      route.fulfill({
        status: 200,
      })
    );

    await nameField.type("John Doe");
    await emailField.type("johndoe@example.com");
    await messageField.type("Message");

    await expect(formButton).toBeVisible();
    await expect(formSuccess).not.toBeVisible();
    await expect(formError).not.toBeVisible();

    await formButton.click();

    await page.waitForTimeout(2500);

    await expect(formButton).not.toBeVisible();
    await expect(formSuccess).toBeVisible();
    await expect(formError).not.toBeVisible();
  });

  test("should show error message if form submission fails", async ({
    page,
  }) => {
    await page.route("/", (route) =>
      route.fulfill({
        status: 404,
      })
    );

    await nameField.type("John Doe");
    await emailField.type("johndoe@example.com");
    await messageField.type("Message");

    await expect(formButton).toBeVisible();
    await expect(formSuccess).not.toBeVisible();
    await expect(formError).not.toBeVisible();

    await formButton.click();

    await page.waitForTimeout(2500);

    await expect(formButton).not.toBeVisible();
    await expect(formSuccess).not.toBeVisible();
    await expect(formError).toBeVisible();
  });
});
