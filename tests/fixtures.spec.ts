import { expect, chromium } from '@playwright/test';
import { test } from '../fixtures/garageFixtures'

test.describe('Fixtures tests with POM', () => {


    test.skip('verify wikipedia homepage without page fixture', async () => {
        //create a browser
        const browser = await chromium.launch();

        //create a context

        const context = await browser.newContext();

        //create a page

        const page = await context.newPage();

        await page.goto('https://www.wikipedia.org/');
        await page.getByTitle('English — Wikipedia — The Free Encyclopedia').click();
        await expect(page.locator('#Welcome_to_Wikipedia')).toBeVisible();


    });

    // test('verify wikipedia homepage with page fixture - language 1', async ({ pageSmall }) => {
    //     await pageSmall.goto('https://www.wikipedia.org/');
    //     await pageSmall.getByTitle('English — Wikipedia — The Free Encyclopedia').click();
    //     await expect(pageSmall.locator('#Welcome_to_Wikipedia')).toBeVisible();
    // });

    // test('verify wikipedia homepage with page fixture - language 2', async ({ pageMedium }) => {
    //     await pageMedium.goto('https://www.wikipedia.org/');
    //     await pageMedium.getByTitle('Українська — Вікіпедія — Вільна енциклопедія').click();
    //     await expect(pageMedium.locator('#Ласкаво_просимо_до_Вікіпедії,')).toBeVisible();
    // });


    // test('verify wikipedia homepage with page fixture - language 3', async ({ pageBig }) => {
    //     await pageBig.goto('https://www.wikipedia.org/');
    //     await pageBig.getByTitle('Español — Wikipedia — La enciclopedia libre').click();
    //     await expect(pageBig.locator('#Bienvenidos_a_Wikipedia,')).toBeVisible();
    // });



});