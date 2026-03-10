const { test, expect } = require('@playwright/test');

// Simple example test to demonstrate running Playwright from the Gen AI folder
test('gen ai example - opens example.com', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page).toHaveTitle(/Example Domain/);
});
