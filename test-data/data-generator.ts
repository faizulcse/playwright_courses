import { faker, fi } from '@faker-js/faker';
export function newUser() {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    return {
        gender: faker.helpers.arrayElement(['Male', 'Female']),
        firstName: firstName,
        lastName: lastName,
        email: faker.internet.email({ firstName, lastName, provider: 'yopmail.com' }).toLowerCase(),
        pass: 'Pass@1234'
    };
}