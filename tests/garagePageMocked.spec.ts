import { test} from '@playwright/test';
import { GaragePage } from '../../playwright-practice/page-objects/pages/garagePage';
import { correctEmail, correctPassword } from '../test-data/credentials';


test.describe('Garage tests with mocking API', () => {
    let garagePage: GaragePage;

    test.beforeEach(async ({ page }) => {
        garagePage = new GaragePage(page);
        await page.goto('/');
    })

    test('Change name and last name', async ({ page }) => {
        const resp = {
            "status": "ok",
            "data": {
                "userId": 127339,
                "photoFilename": "default-user.png",
                "name": "Joe",
                "lastName": "Biden"
            }
        }
        await page.route('**/api/users/profile', route => route.fulfill({
            status: 200,
            body: JSON.stringify(resp),
        }));


        await garagePage.openAsLoggedUser(correctEmail, correctPassword);
        await page.pause();
    });
});
