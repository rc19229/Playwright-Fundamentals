import { test as setup, expect } from '@playwright/test';

setup("create customer 01 auth", async ({ page, context }) => {
  const email = "customer2@practicesoftwaretesting.com"
  const password = "welcome01"
  const customer02AuthFile = ".auth/customer02.json";

  await page.goto("https://practicesoftwaretesting.com/auth/login")

  // Fill email
  await page.getByTestId("email").fill(email);

  // Fill password
  await page.getByTestId("password").fill(password);

  // Click submit
  await page.getByTestId("login-submit").click();

  await expect(page.getByTestId("nav-menu")).toContainText("Jack Howe", { timeout: 10000 });
  await context.storageState({ path: customer02AuthFile });
});