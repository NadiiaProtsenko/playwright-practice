import { test, expect } from '@playwright/test';
import { SignInForm } from '../page-objects/forms/signInForm';
import { correctEmail, incorrectEmail, correctPassword, incorrectPassword } from '../test-data/credentials';

test.describe('Login tests', () => {
  let signInForm: SignInForm;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  })

  test.describe('Login tests with POM', () => {
    test.beforeEach(async ({ page }) => {
      signInForm = new SignInForm(page);
    })

    test('T3806: Login with correct credentials', async ({ page }) => {
      await signInForm.open();
      await signInForm.loginWithCredentials(correctEmail, correctPassword);
      await expect(page.getByRole('heading', { name: 'Garage' })).toBeVisible();
    });

    test('T3807: Login with incorrect credentials', async ({ page }) => {
      await signInForm.open();
      await signInForm.loginWithCredentials(incorrectEmail, incorrectPassword);
      await expect(signInForm.errorMessageBox).toHaveText('Wrong email or password');
    });
  })

  test.describe('Login tests without POM', () => {

    test.beforeEach(async ({ page }) => {
      await page.getByRole('button', { name: 'Sign In' }).click();
      await expect(page.getByRole('heading', { name: 'Log in' })).toBeVisible();
      await page.getByLabel('Email').fill('michael.krasnovskyi+testUser1@gmail.com');
    })

    test('Login with correct credentials', async ({ page }) => {
      await page.getByLabel('Password').fill('ZSgeVQhuU3qkvlG');
      await page.getByRole('button', { name: 'Login' }).click();
      await expect(page.getByRole('heading', { name: 'Garage' })).toBeVisible();
    });

    test('Login with incorrect credentials', async ({ page }) => {
      await page.getByLabel('Password').fill('wrongPassword');
      await page.getByRole('button', { name: 'Login' }).click();
      await expect(page.locator('.alert-danger')).toHaveText('Wrong email or password');
    });
  })
})