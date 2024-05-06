import { test, expect, Page } from '@playwright/test';

test.describe('Field "Name"', () => {
  
  async function navigateToRegistrationForm(page: Page) {
    await page.goto('/');
    await page.click('text=Sign In');
    await page.click('text=Registration');
  }

  test('Verify that field "Name" shows error if name is invalid', async ({ page }) => {
    await navigateToRegistrationForm(page);
    await page.fill('#signupName', '1');

    const errorMessages = await page.$$eval('div.invalid-feedback p[_ngcontent-ndb-c47=""]', elements => elements.map(el => el.textContent));
    
    expect(errorMessages).toContain('Name is invalid');
/*    expect(errorMessages).toContain('Name has to be from 2 to 20 characters long');*/

    const borderColor = await page.$eval('#signupName', e => getComputedStyle(e).borderColor);
    expect(borderColor).toBe('rgb(194, 209, 222)');
  });
});
