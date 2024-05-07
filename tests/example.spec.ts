import { test, expect, Page } from '@playwright/test';

async function navigateToRegistrationForm(page: Page) {
  await page.goto('/');
  await page.click('text=Sign In');
  await page.click('text=Registration');
}

test.describe('Field "Name"', () => {
  
  async function navigateToRegistrationForm(page: Page) {
    await page.goto('/');
    await page.click('text=Sign In');
    await page.click('text=Registration');
  }

  test('Verify that field "Name" shows error if name is less than 2', async ({ page }) => {
    await navigateToRegistrationForm(page);
    await page.fill('#signupName', '1');
    await page.locator('#signupName').blur();

    const errorMessage1 = await page.textContent('div.invalid-feedback p:first-child');
    expect(errorMessage1).toContain('Name is invalid');

    const errorMessage2 = await page.textContent('div.invalid-feedback p:nth-child(2)');
    expect(errorMessage2).toContain('Name has to be from 2 to 20 characters long');
  });

  test('Verify that field "Name" shows error if name is more than 20 characters', async ({ page }) => {
    await navigateToRegistrationForm(page);
    await page.fill('#signupName', '1111111111111111111111');
    await page.locator('#signupName').blur();

    const errorMessage1 = await page.textContent('div.invalid-feedback p:first-child');
    expect(errorMessage1).toContain('Name is invalid');

    const errorMessage2 = await page.textContent('div.invalid-feedback p:nth-child(2)');
    expect(errorMessage2).toContain('Name has to be from 2 to 20 characters long');
  });

  test('Verify that field "Name" shows error if name is empty', async ({ page }) => {
    await navigateToRegistrationForm(page);
    await page.fill('#signupName', ''); 
    await page.locator('#signupName').blur();

    const errorMessage = await page.textContent('p:has-text("Name required")');
    expect(errorMessage).toBe('Name required');
  });

  test('Verify that field "Name" shows error if name contains spaces', async ({ page }) => {
    await navigateToRegistrationForm(page);
    await page.fill('#signupName', 'Geo rge');
    await page.locator('#signupName').blur();

    const errorMessage1 = await page.textContent('div.invalid-feedback p:first-child');
    expect(errorMessage1).toContain('Name is invalid');
  });
});

test.describe('Field "Last Name"', () => {
  
  async function navigateToRegistrationForm(page: Page) {
    await page.goto('/');
    await page.click('text=Sign In');
    await page.click('text=Registration');
  }

  test('Verify that field "Last Name" shows error if name is less than 2 characters', async ({ page }) => {
    await navigateToRegistrationForm(page);
    await page.fill('#signupLastName', '1');
    await page.locator('#signupLastName').blur();

    const errorMessage1 = await page.textContent('div.invalid-feedback p:first-child');
    expect(errorMessage1).toContain('Last name is invalid');

    const errorMessage2 = await page.textContent('div.invalid-feedback p:nth-child(2)');
    expect(errorMessage2).toContain('Last name has to be from 2 to 20 characters long');
  });

  test('Verify that field "Last Name" shows error if name is more than 20 characters', async ({ page }) => {
    await navigateToRegistrationForm(page);
    await page.fill('#signupLastName', '1111111111111111111111');
    await page.locator('#signupLastName').blur();

    const errorMessage1 = await page.textContent('div.invalid-feedback p:first-child');
    expect(errorMessage1).toContain('Last name is invalid');

    const errorMessage2 = await page.textContent('div.invalid-feedback p:nth-child(2)');
    expect(errorMessage2).toContain('Last name has to be from 2 to 20 characters long');
  });

  test('Verify that field "Last Name" shows error if name is empty', async ({ page }) => {
    await navigateToRegistrationForm(page);
    await page.fill('#signupLastName', ''); 
    await page.locator('#signupLastName').blur();

    const errorMessage = await page.textContent('p:has-text("Last name required")');
    expect(errorMessage).toBe('Last name required');
  });

  test('Verify that field "Last Name" shows error if name contains spaces', async ({ page }) => {
    await navigateToRegistrationForm(page);
    await page.fill('#signupLastName', 'Do e');
    await page.locator('#signupLastName').blur();

    const errorMessage1 = await page.textContent('div.invalid-feedback p:first-child');
    expect(errorMessage1).toContain('Last name is invalid');
  });
});

test.describe('Field "Email"', () => {
  
  async function navigateToRegistrationForm(page: Page) {
    await page.goto('/');
    await page.click('text=Sign In');
    await page.click('text=Registration');
  }

  test('Verify that field "Email" shows error if email is empty', async ({ page }) => {
    await navigateToRegistrationForm(page);
    await page.fill('#signupEmail', ''); 
    await page.locator('#signupEmail').blur();

    const errorMessage = await page.textContent('p:has-text("Email required")');
    expect(errorMessage).toBe('Email required');
  });

  test('Verify that field "Email" shows error if email is incorrect', async ({ page }) => {
    await navigateToRegistrationForm(page);
    await page.fill('#signupEmail', 'invalid_email'); 
    await page.locator('#signupEmail').blur();

    const errorMessage = await page.textContent('p:has-text("Email is incorrect")');
    expect(errorMessage).toBe('Email is incorrect');
  });

  test('Verify that field "Email" shows no error if email is correct', async ({ page }) => {
    await navigateToRegistrationForm(page);
    await page.fill('#signupEmail', 'aqa_valid_email@example.com'); 
    await page.locator('#signupEmail').blur();

    const emailField = await page.locator('#signupEmail');
    const isErrorPresent = await emailField.evaluate(element => element.classList.contains('invalid'));
    expect(isErrorPresent).toBeFalsy();
  });
});

test.describe('Field "Password"', () => {
  
  async function navigateToRegistrationForm(page: Page) {
    await page.goto('/');
    await page.click('text=Sign In');
    await page.click('text=Registration');
  }

  test('Verify that field "Password" shows error if password is empty', async ({ page }) => {
    await navigateToRegistrationForm(page);
    await page.fill('#signupPassword', ''); 
    await page.locator('#signupPassword').blur();

    const errorMessage = await page.textContent('p:has-text("Password required")');
    expect(errorMessage).toBe('Password required');
  });

  test('Verify that field "Password" shows error if password is incorrect', async ({ page }) => {
    await navigateToRegistrationForm(page);
    await page.fill('#signupPassword', 'weak'); 
    await page.locator('#signupPassword').blur();

    const errorMessage = await page.textContent('p:has-text("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter")');
    expect(errorMessage).toBe('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
  });

  test('Verify that field "Password" shows no error if password is correct', async ({ page }) => {
    await navigateToRegistrationForm(page);
    await page.fill('#signupPassword', 'StrongPass123'); 
    await page.locator('#signupPassword').blur();

    const passwordField = await page.locator('#signupPassword');
    const isErrorPresent = await passwordField.evaluate(element => element.classList.contains('invalid'));
    expect(isErrorPresent).toBeFalsy();
  });
});

test.describe('Field "Re-enter password"', () => {
  
  async function navigateToRegistrationForm(page: Page) {
    await page.goto('/');
    await page.click('text=Sign In');
    await page.click('text=Registration');
  }

  test('Verify that field "Re-enter password" shows error if password is empty', async ({ page }) => {
    await navigateToRegistrationForm(page);
    await page.fill('#signupRepeatPassword', ''); 
    await page.locator('#signupRepeatPassword').blur();

    const errorMessage = await page.textContent('p:has-text("Re-enter password required")');
    expect(errorMessage).toBe('Re-enter password required');
  });

  test('Verify that field "Re-enter password" shows error if passwords do not match', async ({ page }) => {
    await navigateToRegistrationForm(page);
    await page.fill('#signupPassword', 'StrongPass123'); 
    await page.fill('#signupRepeatPassword', 'StrongPass12'); 
    await page.locator('#signupRepeatPassword').blur();

    const errorMessage = await page.textContent('p:has-text("Passwords do not match")');
    expect(errorMessage).toBe('Passwords do not match');
  });

  test('Verify that field "Re-enter password" shows no error if passwords match', async ({ page }) => {
    await navigateToRegistrationForm(page);
    await page.fill('#signupPassword', 'StrongPass123'); 
    await page.fill('#signupRepeatPassword', 'StrongPass123'); 
    await page.locator('#signupRepeatPassword').blur();

    const repeatPasswordField = await page.locator('#signupRepeatPassword');
    const isErrorPresent = await repeatPasswordField.evaluate(element => element.classList.contains('invalid'));
    expect(isErrorPresent).toBeFalsy();
  });
});

test('Verify that registration button is disabled with incorrect registration data', async ({ page }) => {
  await navigateToRegistrationForm(page);
  await page.fill('#signupName', '1');
  await page.fill('#signupLastName', '');
  await page.fill('#signupEmail', 'invalid_email');
  await page.fill('#signupPassword', '');
  await page.fill('#signupRepeatPassword', 'MismatchedPassword123');

  const isRegisterButtonDisabled = await page.getAttribute('button.btn-primary', 'disabled');
  expect(isRegisterButtonDisabled).toBe(null);
});

test('Verify successful registration redirects to the garage page', async ({ page }) => {
  await navigateToRegistrationForm(page);
  await page.fill('#signupName', 'John');
  await page.fill('#signupLastName', 'Doen');
  await page.fill('#signupEmail', 'aqa_pohn.doe@example.com');
  await page.fill('#signupPassword', '4399828Yflz');
  await page.fill('#signupRepeatPassword', '4399828Yflz');

  await page.click('div.modal-footer button.btn.btn-primary');
  const addCarButton = await page.waitForSelector('button.btn.btn-primary');
  expect(addCarButton).not.toBeNull();
});
