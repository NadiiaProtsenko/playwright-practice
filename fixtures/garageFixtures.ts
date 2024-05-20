import { test as base } from '@playwright/test'
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
});



//pre-conditions

// await use();

//post-conditions