import { test as base } from '@playwright/test'

export const screenSettings = base.extend({

    pageSmall: async ({ page }, use) => {
        await page.setViewportSize({ width: 300, height: 300 });
        await use(page);

    },
    pageMedium: async ({ page }, use) => {
        await page.setViewportSize({ width: 600, height: 600 });
        await use(page);
    },
    pageBig: async ({ page }, use) => {
        await page.setViewportSize({ width: 1200, height: 1200 });
        await use(page);
    },

})