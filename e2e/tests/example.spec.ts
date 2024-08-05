import { expect } from '@playwright/test';
import ewTest from "../lib/option-parallel"



ewTest("hoge", async ({page, condition}) => {
  await page.goto('https://playwright.dev/');
  // Expect a title "to contain" a substring.
  if(condition.role === "admin") {
    await expect(page).toHaveScreenshot("hoge.png");
  }
  await expect(page).toHaveTitle(/Playwright/);
})


// test('has title', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Playwright/);
// });

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });
