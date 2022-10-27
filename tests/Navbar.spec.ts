import { test, expect } from "@playwright/test";

const isVisible = async (element: Element): Promise<boolean> => {
  const visibleRatio: number = await new Promise((resolve) => {
    const observer = new IntersectionObserver((entries) => {
      resolve(entries[0].intersectionRatio);
      observer.disconnect();
    });
    observer.observe(element);
    // Firefox doesn't call IntersectionObserver callback unless
    // there are rafs.
    requestAnimationFrame(() => {});
  });
  return visibleRatio > 0;
};

test.describe("Navbar", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("About Me button should scroll the page to the About Me section when pressed", async ({
    page,
  }) => {
    const aboutHeader = page.locator("#about-me >  .section-header");
    const aboutButton = page.locator("#about-button");

    expect(await aboutHeader.evaluate(isVisible)).toBe(false);

    await aboutButton.click();
    await page.waitForTimeout(1000);

    expect(await aboutHeader.evaluate(isVisible)).toBe(true);
  });

  test("Projects button should scroll the page to the Projects section when pressed", async ({
    page,
  }) => {
    const projectsHeader = page.locator("#projects >  .section-header");
    const projectsButton = page.locator("#projects-button");

    expect(await projectsHeader.evaluate(isVisible)).toBe(false);

    await projectsButton.click();
    await page.waitForTimeout(1000);

    expect(await projectsHeader.evaluate(isVisible)).toBe(true);
  });

  test("Contact Me button should scroll the page to the Contact Me section when pressed", async ({
    page,
  }) => {
    const contactHeader = page.locator("#contact-me >  .section-header");
    const contactButton = page.locator("#contact-button");

    expect(await contactHeader.evaluate(isVisible)).toBe(false);

    await contactButton.click();
    await page.waitForTimeout(1000);

    expect(await contactHeader.evaluate(isVisible)).toBe(true);
  });
});
