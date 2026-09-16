import { users } from "./users";
interface LoginNegativeCases{
    email: string;
    password: string;
    expectedErrorMessage: string;
    testName: string;
}

export const negativeLoginCases: LoginNegativeCases[]=[
{
    email: users.valid.email,
    password: 'invalid-password',
    expectedErrorMessage: 'Your email or password is incorrect!',
    testName: 'incorrect password'
}
];

export const malformedEmailCase={
    email: 'abhishekrawatgmail.com',
    password: 'invalid-password',
};
