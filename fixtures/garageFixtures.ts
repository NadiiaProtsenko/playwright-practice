import { test as base, expect } from '@playwright/test';
import { GaragePage } from '../pages/garagePage';

export const test = base.extend({
    garagePageAsUser: async ({ page }, use) => {
        let garagePage = new GaragePage(page);

        await page.goto('/');
        await garagePage.open();
        await garagePage.clickAddCarButton();
        await use(garagePage);
        await garagePage.removeLastCar();
    },
    garagePageAsGuest: async ({ page }, use) => {
        let garagePage = new GaragePage(page);
        await page.goto('/');
        await page.locator('.-guest').click();
        await garagePage.clickAddCarButton();
        await use(garagePage);
        await garagePage.removeLastCar();
    },
    addAndEditCarAsUser: async ({ garagePageAsUser }, use) => {
        await garagePageAsUser.selectBrand('Porsche');
        await garagePageAsUser.selectModel('911');
        await garagePageAsUser.enterMileage('1222');
        await garagePageAsUser.clickAddButton();
        await garagePageAsUser.clickEditCarIcon();
        await garagePageAsUser.selectBrand('BMW');
        await garagePageAsUser.clickSaveButton();
        await use(garagePageAsUser);
    },
    addAndEditCarAsGuest: async ({ garagePageAsGuest }, use) => {
        await garagePageAsGuest.selectBrand('Porsche');
        await garagePageAsGuest.selectModel('911');
        await garagePageAsGuest.enterMileage('1222');
        await garagePageAsGuest.clickAddButton();
        await garagePageAsGuest.clickEditCarIcon();
        await garagePageAsGuest.selectBrand('BMW');
        await garagePageAsGuest.clickSaveButton();
        await use(garagePageAsGuest);
    },
    verifyInstructionsButtonAsUser: async ({ addAndEditCarAsUser }, use) => {
        const instructionsButton = addAndEditCarAsUser.page.locator('a.btn.btn-white.btn-sidebar.sidebar_btn', { hasText: 'Instructions' });
        await expect(instructionsButton).toBeVisible();
        await use(addAndEditCarAsUser);
    },
    verifyInstructionsButtonAsGuest: async ({ addAndEditCarAsUser }, use) => {
        const instructionsButton = addAndEditCarAsUser.page.locator('a.btn.btn-white.btn-sidebar.sidebar_btn', { hasText: 'Instructions' });
        await expect(instructionsButton).toBeVisible();
        await use(addAndEditCarAsUser);
    },
    verifyProfileButtonAsUser: async ({ addAndEditCarAsUser }, use) => {
        const profileButton = addAndEditCarAsUser.page.locator('a.btn.btn-white.btn-sidebar.sidebar_btn', { hasText: 'Profile' });
        const isProfileButtonVisible = await profileButton.isVisible();
        
        if (isProfileButtonVisible) {
            await expect(profileButton).toBeVisible();
        } else {
            const guestMessage = addAndEditCarAsUser.page.locator('p.header_bar', { hasText: 'Logged in as guest, any changes will be lost!' });
            await expect(guestMessage).toBeVisible();
        }

        await use(addAndEditCarAsUser);
    },
    verifyProfileButtonAsGuest: async ({ addAndEditCarAsGuest }, use) => {
        const profileButton = addAndEditCarAsGuest.page.locator('a.btn.btn-white.btn-sidebar.sidebar_btn', { hasText: 'Profile' });
        const isProfileButtonVisible = await profileButton.isVisible();
        
        if (isProfileButtonVisible) {
            await expect(profileButton).toBeVisible();
        } else {
            const guestMessage = addAndEditCarAsGuest.page.locator('p.header_bar', { hasText: 'Logged in as guest, any changes will be lost!' });
            await expect(guestMessage).toBeVisible();
        }

        await use(addAndEditCarAsGuest);
    },
    verifySettingsButtonAsUser: async ({ addAndEditCarAsUser }, use) => {
        const settingsButton = addAndEditCarAsUser.page.locator('a.btn.btn-white.btn-sidebar.sidebar_btn', { hasText: 'Settings' });
        const isSettingsButtonVisible = await settingsButton.isVisible();

        if (isSettingsButtonVisible) {
            await expect(settingsButton).toBeVisible();
        } else {
            const guestMessage = addAndEditCarAsUser.page.locator('p.header_bar', { hasText: 'Logged in as guest, any changes will be lost!' });
            await expect(guestMessage).toBeVisible();
        }

        await use(addAndEditCarAsUser);
    },
    verifySettingsButtonAsGuest: async ({ addAndEditCarAsGuest }, use) => {
        const settingsButton = addAndEditCarAsGuest.page.locator('a.btn.btn-white.btn-sidebar.sidebar_btn', { hasText: 'Settings' });
        const isSettingsButtonVisible = await settingsButton.isVisible();

        if (isSettingsButtonVisible) {
            await expect(settingsButton).toBeVisible();
        } else {
            const guestMessage = addAndEditCarAsGuest.page.locator('p.header_bar', { hasText: 'Logged in as guest, any changes will be lost!' });
            await expect(guestMessage).toBeVisible();
        }

        await use(addAndEditCarAsGuest);
    },
    verifyLogoutButtonAsUser: async ({ addAndEditCarAsUser }, use) => {
        const logoutButton = addAndEditCarAsUser.page.locator('a.btn.btn-link.text-danger.btn-sidebar.sidebar_btn', { hasText: 'Log out' });
        await expect(logoutButton).toBeVisible();
        await use(addAndEditCarAsUser);
    },
    verifyLogoutButtonAsGuest: async ({ addAndEditCarAsGuest }, use) => {
        const logoutButton = addAndEditCarAsGuest.page.locator('a.btn.btn-link.text-danger.btn-sidebar.sidebar_btn', { hasText: 'Log out' });
        await expect(logoutButton).toBeVisible();
        await use(addAndEditCarAsGuest);
    }
    

});
