import { test, expect } from '@playwright/test';
import { correctEmail, correctPassword } from '../../test-data/credentials';
import { carBrands } from '../../test-data/api/brands';
import getAuthCookies from '../../utils/api/auth/getAuthCookies';
import getModelsList from '../../utils/api/garage/getModelsList';
import createCar from '../../utils/api/garage/createCar';
import getUserCars from '../../utils/api/garage/getUserCars';
import deleteCar from '../../utils/api/garage/deleteCar';

test.describe('Garage API tests with auth in beforeAll', () => {
    let cookiesWithAuth;
    test.beforeAll(async ({ }) => {
        cookiesWithAuth = await getAuthCookies(correctEmail, correctPassword);
    });

    test('Create all models of BMW brand', async ({ page, request }) => {
        const models = await getModelsList(carBrands.bmw.id);
        for (const model of models) {
            const mileage = Math.floor(Math.random() * 200);
            const createCarRequestJson = await createCar(cookiesWithAuth, carBrands.bmw.id, model.id, mileage);
            expect(createCarRequestJson.status).toBe('ok');
            expect(createCarRequestJson.data.carBrandId).toEqual(carBrands.bmw.id);
            expect(createCarRequestJson.data.carModelId).toEqual(model.id);
            expect(createCarRequestJson.data.initialMileage).toEqual(mileage);
            expect(createCarRequestJson.data.mileage).toEqual(mileage);
            expect(typeof createCarRequestJson.data.mileage).toEqual('number');
        }

        //await page.pause();
    });

    test('Create all models of Audi brand', async ({ page, request }) => {
        const models = await getModelsList(carBrands.audi.id);
        for (const model of models) {
            const mileage = Math.floor(Math.random() * 200);
            const createCarRequestJson = await createCar(cookiesWithAuth, carBrands.audi.id, model.id, mileage);
            expect(createCarRequestJson.status).toBe('ok');
            expect(createCarRequestJson.data.carBrandId).toEqual(carBrands.audi.id);
            expect(createCarRequestJson.data.carModelId).toEqual(model.id);
            expect(createCarRequestJson.data.initialMileage).toEqual(mileage);
            expect(createCarRequestJson.data.mileage).toEqual(mileage);
            expect(typeof createCarRequestJson.data.mileage).toEqual('number');
        }

        //await page.pause();
    });

    test('Create all models of Ford brand', async ({ page, request }) => {
        const models = await getModelsList(carBrands.ford.id);
        for (const model of models) {
            const mileage = Math.floor(Math.random() * 200);
            const createCarRequestJson = await createCar(cookiesWithAuth, carBrands.ford.id, model.id, mileage);
            expect(createCarRequestJson.status).toBe('ok');
            expect(createCarRequestJson.data.carBrandId).toEqual(carBrands.ford.id);
            expect(createCarRequestJson.data.carModelId).toEqual(model.id);
            expect(createCarRequestJson.data.initialMileage).toEqual(mileage);
            expect(createCarRequestJson.data.mileage).toEqual(mileage);
            expect(typeof createCarRequestJson.data.mileage).toEqual('number');
        }

        //await page.pause();
    });

    test('Create all models of Porsche brand', async ({ page, request }) => {
        const models = await getModelsList(carBrands.porsche.id);
        for (const model of models) {
            const mileage = Math.floor(Math.random() * 200);
            const createCarRequestJson = await createCar(cookiesWithAuth, carBrands.porsche.id, model.id, mileage);
            expect(createCarRequestJson.status).toBe('ok');
            expect(createCarRequestJson.data.carBrandId).toEqual(carBrands.porsche.id);
            expect(createCarRequestJson.data.carModelId).toEqual(model.id);
            expect (createCarRequestJson.data.initialMileage).toEqual(mileage);
            expect (createCarRequestJson.data.mileage).toEqual(mileage);
            expect(typeof createCarRequestJson.data.mileage).toEqual('number');
        }

        //await page.pause();
    });

    test('Create all models of Fiat brand', async ({ page, request }) => {
        const models = await getModelsList(carBrands.fiat.id);
        for (const model of models) {
            const mileage = Math.floor(Math.random() * 200);
            const createCarRequestJson = await createCar(cookiesWithAuth, carBrands.fiat.id, model.id, mileage);
            expect(createCarRequestJson.status).toBe('ok');
            expect(createCarRequestJson.data.carBrandId).toEqual(carBrands.fiat.id);
            expect (createCarRequestJson.data.carModelId).toEqual(model.id);
            expect (createCarRequestJson.data.initialMileage).toEqual(mileage);
            expect (createCarRequestJson.data.mileage).toEqual(mileage);
            expect(typeof createCarRequestJson.data.mileage).toEqual('number');
        }

        //await page.pause();
    });

    test.afterAll(async ({ }) => {
        const cars = await getUserCars(cookiesWithAuth);
        for (const car of cars) {
            const responseDeleteCar = await deleteCar(cookiesWithAuth, car.id);
            console.log(await responseDeleteCar);
        }
    });
});
