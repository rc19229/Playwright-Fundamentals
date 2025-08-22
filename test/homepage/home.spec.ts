import { test, expect } from "@playwright/test";

test.describe("Home Page with no auth", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://practicesoftwaretesting.com/");
  });

  test("visual test", async ({ page }) => {
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot("home-page-no-auth.png", {
      mask: [page.getByTitle("Practice Software Testing - Toolshop")]
    });
  });

  test("check sign in", async ({ page }) => {
    // Ensure sign-in link is present
    await expect(page.getByTestId("nav-sign-in")).toHaveText("Sign in");
  });

  test("validate page title", async ({ page }) => {
    // Check the title of the page
    await expect(page).toHaveTitle("Practice Software Testing - Toolshop - v5.0");
  });

  test("count items", async ({ page }) => {
    // Check the count of items displayed
    const productGrid = page.locator(".col-md-9");
    await expect(productGrid.getByRole("link")).toHaveCount(9); // Locator assertion
    expect(await productGrid.getByRole("link").count()).toBe(9); // Non-locator assertion
  });

  test("search thor hammer", async ({ page }) => {
    // Search for Thor Hammer and check result
    const productGrid = page.locator(".col-md-9");
    await page.getByTestId("search-query").fill("Thor hammer");
    await page.getByTestId("search-submit").click();
    // await expect(productGrid.getByRole("link")).toHaveCount(1);
    await page.waitForLoadState('networkidle')
    await expect(productGrid.getByTestId("product-name")).toHaveText("Thor Hammer");
  });
});

test.describe("Home page with customer 01 auth", () => {
  test.use({ storageState: ".auth/customer01.json" });
  test.beforeEach(async ({ page }) => {
    await page.goto("https://practicesoftwaretesting.com/");
  });

  test("visual test auth", async ({ page }) => {
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot("home-page-customer01.png", {
      mask: [page.getByTitle("Practice Software Testing - Toolshop")]
    });
  });

  test("check customer 01 is signed in", async ({ page }) => {
    await expect(page.getByTestId("nav-sign-in")).not.toBeVisible();
    await expect(page.getByTestId("nav-menu")).toContainText("Jane Doe");
  });
});