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


test.describe("Hero Section", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("See More Button", async ({ page }) => {
    const aboutHeader = page.locator("#about-me >  .section-header");
    const seeMoreButton = page.locator("#see-more");

    expect(await aboutHeader.evaluate(isVisible)).toBe(false);

    await seeMoreButton.click();
    await page.waitForTimeout(1000);

    expect(await aboutHeader.evaluate(isVisible)).toBe(true);
  });
});
