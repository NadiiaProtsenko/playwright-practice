import { test, expect } from '@playwright/test';
import { GaragePage } from '../../pages/garagePageStorage';
import { correctEmail, correctEmail2, correctPassword, correctPassword2 } from '../../test-data/credentials';

test.describe('Save storage state after login', () => {
    test('Login As User1 and save state', async ({ page }) => {
        const garagePage = new GaragePage(page);
        await page.goto('/');
        await garagePage.openAsLoggedUser(correctEmail, correctPassword);
        await page.context().storageState({
            path: './test-data/states/userOneState.json'
        });
    });

    test('Login As User2 and save state', async ({ page }) => {
        const garagePage = new GaragePage(page);
        await page.goto('/');
        await garagePage.openAsLoggedUser(correctEmail2, correctPassword2);
        await page.context().storageState({
            path: './test-data/states/userTwoState.json'
        });
    });
});
