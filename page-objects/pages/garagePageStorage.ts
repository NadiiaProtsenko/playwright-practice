import { expect, type Locator, type Page } from '@playwright/test';
import { SignInForm } from '../forms/signInForm';
import { correctEmail, correctPassword } from '../../test-data/credentials';

export class GaragePage {
    readonly page: Page;
    readonly addCarButton: Locator;
    readonly brandDropdown: Locator;
    readonly modelDropdown: Locator;
    readonly mileageField: Locator;
    readonly addButton: Locator;
    readonly firstCarName: Locator;
    readonly editCarIcon: Locator;
    readonly saveButton: Locator;
    readonly removeCarButton: Locator;
    readonly acceptCarRemovingButton: Locator;
    readonly errorMessageBox: Locator;
    readonly cancelButton: Locator; 

    constructor(page: Page) {
        this.page = page;
        this.addCarButton = page.getByText('Add car');
        this.brandDropdown = page.locator('#addCarBrand');
        this.modelDropdown = page.locator('#addCarModel');
        this.mileageField = page.locator('#addCarMileage');
        this.addButton = page.getByText('Add', { exact: true });
        this.firstCarName = page.locator('.car_name').first();
        this.editCarIcon = page.locator('.icon-edit').first();
        this.saveButton = page.getByRole('button', { name: 'Save' });
        this.removeCarButton = page.locator('.btn-outline-danger');
        this.acceptCarRemovingButton = page.locator('.btn-danger');
        this.errorMessageBox = page.locator('.alert-danger').first();
        this.cancelButton = page.locator('button.btn.btn-secondary', { hasText: 'Cancel' });
    }

    async open() {
        const signInForm = new SignInForm(this.page);
        await signInForm.open();
        await signInForm.loginWithCredentials(correctEmail, correctPassword);
        await expect(this.page.locator('h1')).toHaveText('Garage');
    }

    async openAsLoggedUser(email: string, password: string) {
        const signInForm = new SignInForm(this.page);
        await signInForm.open();
        await signInForm.loginWithCredentials(email, password);
        await expect(this.page.locator('h1')).toHaveText('Garage');
    }

    async clickAddCarButton() {
        await this.addCarButton.click();
    }

    async selectBrand(brand: string) {
        await this.brandDropdown.selectOption({ label: brand });
    }

    async selectModel(model: string) {
        await this.page.waitForTimeout(1000);
        await this.modelDropdown.selectOption({ label: model });
    }

    async enterMileage(mileage: string) {
        await this.mileageField.fill(mileage);
    }

    async clickAddButton() {
        await this.addButton.click();
    }

    async clickEditCarIcon() {
        await this.editCarIcon.click();
    }

    async clickSaveButton() {
        await this.saveButton.click();
    }

    async clickCancelButton() {
        await this.cancelButton.scrollIntoViewIfNeeded();
        await expect(this.cancelButton).toBeVisible(); 
        await this.cancelButton.click(); 
    }

    async getFirstCarName() {
        return this.firstCarName;
    }

    async removeLastCar() {
        const carsNumberBefore = await this.page.locator('.icon-edit').count();
        await this.editCarIcon.click();
        await this.removeCarButton.click();
        await this.acceptCarRemovingButton.click();
        await expect(this.editCarIcon).toHaveCount(carsNumberBefore - 1);
    }
}
