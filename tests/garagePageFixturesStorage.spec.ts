import { test } from '../fixtures/garageFixturesStorage';
import { expect } from '@playwright/test';

test.describe('Garage tests', () => {
    test.describe('Garage tests with POM and fixtures from user', () => {

        test('@smoke Add [Audi] [A8] car to the garage', async ({ garagePageAsUser }) => {
            await garagePageAsUser.selectBrand('Audi');
            await garagePageAsUser.selectModel('A8');
            await garagePageAsUser.enterMileage('222');
            await garagePageAsUser.clickAddButton();
            await expect(garagePageAsUser.firstCarName).toHaveText('Audi A8');
        });

        test('Add [BMW] [X5] car to the garage', async ({ garagePageAsUser }) => {
            await garagePageAsUser.selectBrand('BMW');
            await garagePageAsUser.selectModel('X5');
            await garagePageAsUser.enterMileage('1222');
            await garagePageAsUser.clickAddButton();
            await expect(garagePageAsUser.firstCarName).toHaveText('BMW X5');
        });

        test('Add [Ford] [Fiesta] car to the garage', async ({ garagePageAsUser }) => {
            await garagePageAsUser.selectBrand('Ford');
            await garagePageAsUser.selectModel('Fiesta');
            await garagePageAsUser.enterMileage('1222');
            await garagePageAsUser.clickAddButton();
            await expect(garagePageAsUser.firstCarName).toHaveText('Ford Fiesta');
        });

        test('Add [Ford] [Focus] car to the garage', async ({ garagePageAsUser }) => {
            await garagePageAsUser.selectBrand('Ford');
            await garagePageAsUser.selectModel('Focus');
            await garagePageAsUser.enterMileage('1222');
            await garagePageAsUser.clickAddButton();
            await expect(garagePageAsUser.firstCarName).toHaveText('Ford Focus');
        });

        test('Add [Porsche] [911] car to the garage', async ({ garagePageAsUser }) => {
            await garagePageAsUser.selectBrand('Porsche');
            await garagePageAsUser.selectModel('911');
            await garagePageAsUser.enterMileage('1222');
            await garagePageAsUser.clickAddButton();
            await expect(garagePageAsUser.firstCarName).toHaveText('Porsche 911');
        });

        test('Verify updated date of the added car', async ({ garagePageAsUser }) => {
            await garagePageAsUser.selectBrand('Porsche');
            await garagePageAsUser.selectModel('911');
            await garagePageAsUser.enterMileage('1222');
            await garagePageAsUser.clickAddButton();
            await expect(garagePageAsUser.firstCarName).toHaveText('Porsche 911');

            const carDateElement = await garagePageAsUser.page.locator('.car_update-mileage').first();
            const carDateText = await carDateElement.textContent();

            if (carDateText === null) {
                throw new Error('Date text is null');
            }

            const dateRegex = /(\d{2})\.(\d{1,2})\.(\d{4})/;
            const dateMatches = dateRegex.exec(carDateText);
            const day = dateMatches ? dateMatches[1] : null;
            const month = dateMatches ? dateMatches[2] : null;
            const year = dateMatches ? dateMatches[3] : null;

            if (day && month && year) {
                const today = new Date();
                const formattedDate = `${today.getDate()}.${today.getMonth() + 1}.${today.getFullYear()}`;
                expect(`${day}.${parseInt(month, 10)}.${year}`).toBe(formattedDate);
            } else {
                throw new Error('Invalid date format');
            }
        });
        test('Add [Porsche] [911] car to the garage and change brand to [BMW]', async ({ garagePageAsUser }) => {
            await garagePageAsUser.selectBrand('Porsche');
            await garagePageAsUser.selectModel('911');
            await garagePageAsUser.enterMileage('1222');
            await garagePageAsUser.clickAddButton();
            await garagePageAsUser.clickEditCarIcon();
            await garagePageAsUser.selectBrand('BMW');
            await garagePageAsUser.clickSaveButton();
            await expect(garagePageAsUser.firstCarName).toHaveText('BMW 3');
        });
        test('Add [Porsche] [911] car to the garage and change model to [Cayenne]', async ({ garagePageAsUser }) => {
            await garagePageAsUser.selectBrand('Porsche');
            await garagePageAsUser.selectModel('911');
            await garagePageAsUser.enterMileage('1222');
            await garagePageAsUser.clickAddButton();
            await garagePageAsUser.clickEditCarIcon();
            await garagePageAsUser.selectModel('Cayenne');
            await garagePageAsUser.clickSaveButton();
            await expect(garagePageAsUser.firstCarName).toHaveText('Porsche Cayenne');
        });
        test('Add [Porsche] [911] car to the garage and change mileage', async ({ garagePageAsUser }) => {
            await garagePageAsUser.selectBrand('Porsche');
            await garagePageAsUser.selectModel('911');
            await garagePageAsUser.enterMileage('1222');
            await garagePageAsUser.clickAddButton();
            await garagePageAsUser.clickEditCarIcon();
            await garagePageAsUser.enterMileage('112222');
            await garagePageAsUser.clickSaveButton();
            await expect(garagePageAsUser.firstCarName).toHaveText('Porsche 911');
        });
        test('Add [Porsche] [911] car to the garage and change to less mileage', async ({ garagePageAsUser }) => {
            await garagePageAsUser.selectBrand('Porsche');
            await garagePageAsUser.selectModel('911');
            await garagePageAsUser.enterMileage('1222');
            await garagePageAsUser.clickAddButton();
            await garagePageAsUser.clickEditCarIcon();
            const newMileage = '1';
            await garagePageAsUser.enterMileage(newMileage);
            await garagePageAsUser.clickSaveButton();
            const errorMessage = await garagePageAsUser.page.locator('.alert-danger').first(); 
            await expect(errorMessage).toHaveText('New mileage is less then previous entry');       
            await garagePageAsUser.clickCancelButton(); 
        });
        test('Verify the garage page URL', async ({ addAndEditCarAsUser }) => {
            await expect(addAndEditCarAsUser.page).toHaveURL('https://qauto.forstudy.space/panel/garage');
        });
        test('Verify the presence of Instructions button', async ({ verifyInstructionsButtonAsUser }) => {
            const instructionsButton = await verifyInstructionsButtonAsUser.page.locator('button:has-text("Instructions")');
            await expect(instructionsButton).toBeVisible();
        });
        test('Verify the presence of Profile button', async ({ verifyProfileButtonAsUser }) => {
            const profileButton = await verifyProfileButtonAsUser.page.locator('button:has-text("Profile")');
            await expect(profileButton).toBeVisible();
        });
        test('Verify the presence of Settings button', async ({ verifySettingsButtonAsUser }) => {
            const settingsButton = await verifySettingsButtonAsUser.page.locator('button:has-text("Settings")');
            await expect(settingsButton).toBeVisible();
        });
        test('Verify the presence of Log out button', async ({ verifyLogoutButtonAsUser }) => {
            const logoutButton = await verifyLogoutButtonAsUser.page.locator('button:has-text("Log out")');
            await expect(logoutButton).toBeVisible();
        });
    });

    test.describe('Garage tests with POM and fixtures from guest', () => {

        test('@smoke Add [Audi] [A8] car to the garage', async ({ garagePageAsGuest }) => {
            await garagePageAsGuest.selectBrand('Audi');
            await garagePageAsGuest.selectModel('A8');
            await garagePageAsGuest.enterMileage('222');
            await garagePageAsGuest.clickAddButton();
            await expect(garagePageAsGuest.firstCarName).toHaveText('Audi A8');
        });

        test('Add [BMW] [X5] car to the garage', async ({ garagePageAsGuest }) => {
            await garagePageAsGuest.selectBrand('BMW');
            await garagePageAsGuest.selectModel('X5');
            await garagePageAsGuest.enterMileage('1222');
            await garagePageAsGuest.clickAddButton();
            await expect(garagePageAsGuest.firstCarName).toHaveText('BMW X5');
        });

        test('Add [Ford] [Fiesta] car to the garage', async ({ garagePageAsGuest }) => {
            await garagePageAsGuest.selectBrand('Ford');
            await garagePageAsGuest.selectModel('Fiesta');
            await garagePageAsGuest.enterMileage('1222');
            await garagePageAsGuest.clickAddButton();
            await expect(garagePageAsGuest.firstCarName).toHaveText('Ford Fiesta');
        });

        test('Add [Ford] [Focus] car to the garage', async ({ garagePageAsGuest }) => {
            await garagePageAsGuest.selectBrand('Ford');
            await garagePageAsGuest.selectModel('Focus');
            await garagePageAsGuest.enterMileage('1222');
            await garagePageAsGuest.clickAddButton();
            await expect(garagePageAsGuest.firstCarName).toHaveText('Ford Focus');
        });

        test('Add [Porsche] [911] car to the garage', async ({ garagePageAsGuest }) => {
            await garagePageAsGuest.selectBrand('Porsche');
            await garagePageAsGuest.selectModel('911');
            await garagePageAsGuest.enterMileage('1222');
            await garagePageAsGuest.clickAddButton();
            await expect(garagePageAsGuest.firstCarName).toHaveText('Porsche 911');
        });
        test('Verify updated date of the added car', async ({ garagePageAsGuest }) => {
            await garagePageAsGuest.selectBrand('Porsche');
            await garagePageAsGuest.selectModel('911');
            await garagePageAsGuest.enterMileage('1222');
            await garagePageAsGuest.clickAddButton();
            await expect(garagePageAsGuest.firstCarName).toHaveText('Porsche 911');

            const carDateElement = await garagePageAsGuest.page.locator('.car_update-mileage').first();
            const carDateText = await carDateElement.textContent();

            if (carDateText === null) {
                throw new Error('Date text is null');
            }

            const dateRegex = /(\d{2})\.(\d{1,2})\.(\d{4})/;
            const dateMatches = dateRegex.exec(carDateText);
            const day = dateMatches ? dateMatches[1] : null;
            const month = dateMatches ? dateMatches[2] : null;
            const year = dateMatches ? dateMatches[3] : null;

            if (day && month && year) {
                const today = new Date();
                const formattedDate = `${today.getDate()}.${today.getMonth() + 1}.${today.getFullYear()}`;
                expect(`${day}.${parseInt(month, 10)}.${year}`).toBe(formattedDate);
            } else {
                throw new Error('Invalid date format');
            }
        });
        test('Add [Porsche] [911] car to the garage and change brand to [BMW]', async ({ garagePageAsGuest }) => {
            await garagePageAsGuest.selectBrand('Porsche');
            await garagePageAsGuest.selectModel('911');
            await garagePageAsGuest.enterMileage('1222');
            await garagePageAsGuest.clickAddButton();
            await garagePageAsGuest.clickEditCarIcon();
            await garagePageAsGuest.selectBrand('BMW');
            await garagePageAsGuest.clickSaveButton();
            await expect(garagePageAsGuest.firstCarName).toHaveText('BMW 3');
        });
        test('Add [Porsche] [911] car to the garage and change model to [Cayenne]', async ({ garagePageAsGuest }) => {
            await garagePageAsGuest.selectBrand('Porsche');
            await garagePageAsGuest.selectModel('911');
            await garagePageAsGuest.enterMileage('1222');
            await garagePageAsGuest.clickAddButton();
            await garagePageAsGuest.clickEditCarIcon();
            await garagePageAsGuest.selectModel('Cayenne');
            await garagePageAsGuest.clickSaveButton();
            await expect(garagePageAsGuest.firstCarName).toHaveText('Porsche Cayenne');
        });
        test('Add [Porsche] [911] car to the garage and change mileage', async ({ garagePageAsGuest }) => {
            await garagePageAsGuest.selectBrand('Porsche');
            await garagePageAsGuest.selectModel('911');
            await garagePageAsGuest.enterMileage('1222');
            await garagePageAsGuest.clickAddButton();
            await garagePageAsGuest.clickEditCarIcon();
            await garagePageAsGuest.enterMileage('112222');
            await garagePageAsGuest.clickSaveButton();
            await expect(garagePageAsGuest.firstCarName).toHaveText('Porsche 911');
        });
        test('Add [Porsche] [911] car to the garage and change to less mileage', async ({ garagePageAsGuest }) => {
            await garagePageAsGuest.selectBrand('Porsche');
            await garagePageAsGuest.selectModel('911');
            await garagePageAsGuest.enterMileage('1222');
            await garagePageAsGuest.clickAddButton();
            await garagePageAsGuest.clickEditCarIcon();
            const newMileage = '1';
            await garagePageAsGuest.enterMileage(newMileage);
            await garagePageAsGuest.clickSaveButton();
            const errorMessage = await garagePageAsGuest.page.locator('.alert-danger').first(); 
            await expect(errorMessage).toHaveText('New mileage is less then previous entry');       
            await garagePageAsGuest.clickCancelButton(); 
        });
        test('Verify the garage page URL', async ({ addAndEditCarAsGuest }) => {
            await expect(addAndEditCarAsGuest.page).toHaveURL('https://qauto.forstudy.space/panel/garage');
        });
        test('Verify the presence of Instructions button', async ({ verifyInstructionsButtonAsGuest }) => {
            const instructionsButton = await verifyInstructionsButtonAsGuest .page.locator('button:has-text("Instructions")');
            await expect(instructionsButton).toBeVisible();
        });
        test('Verify the presence of Profile button', async ({ verifyProfileButtonAsGuest  }) => {
            const profileButton = await verifyProfileButtonAsGuest .page.locator('button:has-text("Profile")');
            await expect(profileButton).toBeVisible();
        });
        test('Verify the presence of Settings button', async ({ verifySettingsButtonAsGuest  }) => {
            const settingsButton = await verifySettingsButtonAsGuest .page.locator('button:has-text("Settings")');
            await expect(settingsButton).toBeVisible();
        });
        test('Verify the presence of Log out button', async ({ verifyLogoutButtonAsGuest  }) => {
            const logoutButton = await verifyLogoutButtonAsGuest .page.locator('button:has-text("Log out")');
            await expect(logoutButton).toBeVisible();
        });
    });

    });