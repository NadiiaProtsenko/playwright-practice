import { Page, Locator, expect } from '@playwright/test';
import assert from 'assert';

export class RegistrationPage {
  readonly page: Page;
  readonly nameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly repeatPasswordInput: Locator;
  readonly registerButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.locator('#signupName');
    this.lastNameInput = page.locator('#signupLastName');
    this.emailInput = page.locator('#signupEmail');
    this.passwordInput = page.locator('#signupPassword');
    this.repeatPasswordInput = page.locator('#signupRepeatPassword');
    this.registerButton = page.locator('.modal-footer button.btn.btn-primary');
  }

  async navigateTo() {
    await this.page.goto('/');
    await this.page.click('text=Sign In');
    await this.page.click('text=Registration');
  }

  async fillName(name: string) {
    await this.nameInput.fill(name);
    await this.nameInput.blur();
  }

  async fillLastName(lastName: string) {
    await this.lastNameInput.fill(lastName);
    await this.lastNameInput.blur();
  }

  async fillEmail(email: string) {
    await this.emailInput.fill(email);
    await this.emailInput.blur();
  }

 

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
    await this.passwordInput.blur();
  }

  async fillRepeatPassword(repeatPassword: string) {
    await this.repeatPasswordInput.fill(repeatPassword);
    await this.repeatPasswordInput.blur();
  }

  async isElementInvalid(selector: string): Promise<boolean> {
    return this.page.locator(selector).evaluate(element => element.classList.contains('invalid'));
  }

  async getErrorMessage(selector: string): Promise<string | null> {
    const errorMessage = await this.page.textContent(selector);
    return errorMessage !== null ? errorMessage : '';
  }

  async registerWithInvalidData(): Promise<void> {
    await this.fillName('1');
    await this.fillLastName('');
    await this.fillEmail('invalid_email');
    await this.fillPassword('');
    await this.fillRepeatPassword('MismatchedPassword123');
    await this.repeatPasswordInput.blur();
  }

  async registerWithValidData(): Promise<void> {
    await this.fillName('John');
    await this.fillLastName('Doen');
    await this.fillEmail('aqa_pohn.doe@example.com');
    await this.fillPassword('4399828Yflz');
    await this.fillRepeatPassword('4399828Yflz');
  }

  async assertRegisterButtonDisabled(): Promise<boolean> {
    const isDisabled = await this.page.locator('.modal-footer button.btn.btn-primary', { hasText: 'Register' }).getAttribute('disabled');
    return isDisabled === '';
}
  
  async assertOnGaragePage() {
    const addCarButton = await this.page.waitForSelector('button.btn.btn-primary');
    expect(await addCarButton.isVisible()).toBeTruthy();
}
}