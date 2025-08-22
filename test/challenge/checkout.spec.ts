import { test, expect } from '@playwright/test';

test.describe("challenge tests", async () => {
  test.use({ storageState: '.auth/customer02.json' });
  test.beforeEach(async ({ page }) => {
    await page.goto("https://practicesoftwaretesting.com/");
  });

  test("checkout test", async ({ page, headless }) => {
    await page.getByText("Combination Pliers").click();
    await page.getByTestId("add-to-cart").click();
    await expect(page.getByTestId("cart-quantity")).toHaveText("1");
    await page.getByTestId("nav-home").click();

    await page.waitForLoadState("networkidle");
    await page.locator("xpath=/html/body/app-root/div/app-overview/div[3]/div[2]/div[1]/a[8]").click();
    await page.getByTestId("add-to-cart").click();
    await expect(page.getByTestId("cart-quantity")).toHaveText("2");
    // await page.getByTestId("nav-home").click();

    await page.getByTestId("nav-cart").click();
    let proceedButton = page.getByTestId("proceed-1");
    await expect(proceedButton).toBeEnabled();
    await proceedButton.click();
    // await page.getByTestId("proceed-1").click();

    proceedButton = page.getByTestId("proceed-2");
    await expect(proceedButton).toBeEnabled();
    await proceedButton.click();

    await page.getByTestId("street").fill("123 Main St");
    await page.getByTestId("city").fill("Hyderabad");
    await page.getByTestId("state").fill("Telangana");
    await page.getByTestId("country").fill("India");
    await page.getByTestId("postal_code").fill("28");

    proceedButton = page.getByTestId("proceed-3");
    await expect(proceedButton).toBeEnabled();
    await proceedButton.click();

    await page.getByTestId("payment-method").selectOption("Buy Now Pay Later");
    await page.getByTestId("monthly_installments").selectOption("6 Monthly Installments");
    await page.getByRole("button", { name: "Confirm" }).click();
    await expect(page.getByTestId("payment-success-message")).toBeVisible();
    headless
      ? await test.step("visual test", async () => {
        await expect(page).toHaveScreenshot("checkout.png");
      })
      : console.log("Running in headed mode, no screenshot comparison");
  });
});
