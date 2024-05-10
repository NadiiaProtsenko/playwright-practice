import { test, expect } from '@playwright/test';
import { RegistrationPage } from './RegistrationPage';

test.describe('User Registration Form Fields Validation', () => {
  let registrationPage: RegistrationPage;

  test.beforeEach(async ({ page }) => {
    registrationPage = new RegistrationPage(page);
    await registrationPage.navigateTo();
  });

  test.describe('Field "Name"', () => {
    test('Verify that field "Name" shows error if name is less than 2 characters', async () => {
      await registrationPage.fillName('1');
      const isInvalid = await registrationPage.isElementInvalid('#signupName');
      const errorMessage1 = await registrationPage.getErrorMessage('div.invalid-feedback p:first-child');
      expect(errorMessage1).toContain('Name is invalid');
      const errorMessage2 = await registrationPage.getErrorMessage('div.invalid-feedback p:nth-child(2)');
      expect(errorMessage2).toContain('Name has to be from 2 to 20 characters long');
    });

    test('Verify that field "Name" shows error if name is more than 20 characters', async () => {
      await registrationPage.fillName('1'.repeat(21));
      const isInvalid = await registrationPage.isElementInvalid('#signupName');
      const errorMessage1 = await registrationPage.getErrorMessage('div.invalid-feedback p:first-child');
      expect(errorMessage1).toContain('Name is invalid');
      const errorMessage2 = await registrationPage.getErrorMessage('div.invalid-feedback p:nth-child(2)');
      expect(errorMessage2).toContain('Name has to be from 2 to 20 characters long');
    });

    test('Verify that field "Name" shows error if name is empty', async () => {
      await registrationPage.fillName('');
      const isInvalid = await registrationPage.isElementInvalid('#signupName');
      const errorMessage = await registrationPage.getErrorMessage('p:has-text("Name required")');
      expect(errorMessage).toContain('Name required');
    });

    test('Verify that field "Name" shows error if name contains spaces', async () => {
      await registrationPage.fillName('Invalid Name');
      const isInvalid = await registrationPage.isElementInvalid('#signupName');
      const errorMessage = await registrationPage.getErrorMessage('div.invalid-feedback p:first-child');
      expect(errorMessage).toContain('Name is invalid');
    });
  });

  test.describe('Field "Last Name"', () => {
    test('Verify that field "Last Name" shows error if last name is less than 2 characters', async () => {
      await registrationPage.fillLastName('1');
      const isInvalid = await registrationPage.isElementInvalid('#signupLastName');
      const errorMessage1 = await registrationPage.getErrorMessage('div.invalid-feedback p:first-child');
      expect(errorMessage1).toContain('Last name is invalid');
      const errorMessage2 = await registrationPage.getErrorMessage('div.invalid-feedback p:nth-child(2)');
      expect(errorMessage2).toContain('Last name has to be from 2 to 20 characters long');
    });

    test('Verify that field "Last Name" shows error if last name is more than 20 characters', async () => {
      await registrationPage.fillLastName('1'.repeat(21));
      const isInvalid = await registrationPage.isElementInvalid('#signupLastName');
      const errorMessage = await registrationPage.getErrorMessage('div.invalid-feedback p:nth-child(2)');
      expect(errorMessage).toContain('Last name has to be from 2 to 20 characters long');
    });

    test('Verify that field "Last Name" shows error if last name is empty', async () => {
      await registrationPage.fillLastName('');
      const isInvalid = await registrationPage.isElementInvalid('#signupLastName');
      const errorMessage = await registrationPage.getErrorMessage('p:has-text("Last name required")');
      expect(errorMessage).toContain('Last name required');
    });

    test('Verify that field "Last Name" shows error if a last name contains spaces', async () => {
      await registrationPage.fillLastName('Invalid LastName');
      const isInvalid = await registrationPage.isElementInvalid('#signupLastName');
      const errorMessage = await registrationPage.getErrorMessage('div.invalid-feedback p:first-child');
      expect(errorMessage).toContain('Last name is invalid');
    });
  });

  test.describe('Field "Email"', () => {
    test('Verify that field "Email" shows error if email is empty', async () => {
      await registrationPage.fillEmail('');
      const isInvalid = await registrationPage.isElementInvalid('#signupEmail');
      const errorMessage = await registrationPage.getErrorMessage('p:has-text("Email required")');
      expect(errorMessage).toContain('Email required');
    });

    test('Verify that field "Email" shows error if email is incorrect', async () => {
      await registrationPage.fillEmail('invalid_email');
      const isInvalid = await registrationPage.isElementInvalid('#signupEmail');
      const errorMessage = await registrationPage.getErrorMessage('p:has-text("Email is incorrect")');
      expect(errorMessage).toContain('Email is incorrect');
    });

    test('Verify that field "Email" shows no error if email is correct', async () => {
      await registrationPage.fillEmail('valid_email@example.com');
      const isInvalid = await registrationPage.isElementInvalid('#signupEmail');
      expect(isInvalid).toBeFalsy();
    });
  });

 

  test.describe('Field "Password"', () => {
    test('Verify that field "Password" shows error if password is empty', async () => {
      await registrationPage.fillPassword('');
      const isInvalid = await registrationPage.isElementInvalid('#signupPassword');
      const errorMessage = await registrationPage.getErrorMessage('p:has-text("Password required")');
      expect(errorMessage).toContain('Password required');
    });

    test('Verify that field "Password" shows error if password is incorrect', async () => {
      await registrationPage.fillPassword('weak');
      const isInvalid = await registrationPage.isElementInvalid('#signupPassword');
      const errorMessage = await registrationPage.getErrorMessage('p:has-text("Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter")');
      expect(errorMessage).toContain('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter');
    });

    test('Verify that field "Password" shows no error if password is correct', async () => {
      await registrationPage.fillPassword('ValidPassword1');
      const isInvalid = await registrationPage.isElementInvalid('#signupPassword');
      expect(isInvalid).toBeFalsy();
    });
  });

  test.describe('Field "Re-enter password"', () => {
    test('Verify that field "Re-enter password" shows error if password is empty', async () => {
      await registrationPage.fillRepeatPassword('');
      const isInvalid = await registrationPage.isElementInvalid('#signupRepeatPassword');
      const errorMessage = await registrationPage.getErrorMessage('p:has-text("Re-enter password required")');
      expect(errorMessage).toContain('Re-enter password required');
    });

    test('Verify that field "Re-enter password" shows error if passwords do not match', async () => {
      await registrationPage.fillPassword('StrongPass123');
      await registrationPage.fillRepeatPassword('StrongPass12');
      const isInvalid = await registrationPage.isElementInvalid('#signupRepeatPassword');
      const errorMessage = await registrationPage.getErrorMessage('p:has-text("Passwords do not match")');
      expect(errorMessage).toContain('Passwords do not match');
    });

    test('Verify that field "Re-enter password" shows no error if passwords match', async () => {
      await registrationPage.fillPassword('ValidPassword1');
      await registrationPage.fillRepeatPassword('ValidPassword1');
      const isInvalid = await registrationPage.isElementInvalid('#signupRepeatPassword');
      expect(isInvalid).toBeFalsy();
    });
  });

  test('Verify that registration button is disabled with incorrect registration data', async () => {
    await registrationPage.registerWithInvalidData();
    const isRegisterButtonDisabled = await registrationPage.assertRegisterButtonDisabled();
    expect(isRegisterButtonDisabled).toBe(true);
});

  test('Verify successful registration redirects to the garage page', async () => {
    await registrationPage.registerWithValidData();
    await registrationPage.registerButton.click();
    await registrationPage.assertOnGaragePage();
  });
});