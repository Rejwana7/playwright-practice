import { test, expect } from '@playwright/test';
import { faker } from "@faker-js/faker";
import { generateRandomNumber } from '../utils/randomNumber.ts';
import { CreateUserPage, UserModel } from '../pages/CreateUserPage.pom.ts';

test("Add new user", async ({ page }) => {
    const createUserPage = new CreateUserPage(page);
    let randomId = generateRandomNumber(1000000, 9999999);
    await page.goto("/dashboard/add-user");
    const user: UserModel = {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        phoneNumber: `0150${randomId}`,
        password: '1234',
        birthDate: "01/01/2005",
        district: "Dhaka",
        gender: "Male",
        photoUrl: "resources/logo.png"
    }
    await createUserPage.createUser(user);
    await expect(page).toHaveURL("/dashboard/users");
    //await page.pause();

})  