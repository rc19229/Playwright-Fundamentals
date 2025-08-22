import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await page.getByRole('link', { name: 'Community' }).click();
  await page.getByRole('link', { name: 'Ambassador page' }).click();
  await page.getByRole('listitem').filter({ hasText: 'Butch' }).click();
  await expect(page.locator('section')).toContainText('Butch Mayhew');
  await page.getByText('Our Mission is to build an').click();
});