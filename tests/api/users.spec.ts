import { test, expect } from "@playwright/test";
import { CreateUserResponse, newUsers, patchedUser, updatedUser } from "../../data/api/users";
import { users } from "../../data/users";
import { UsersApi} from "../../api/UsersApi";


test.describe('api tests', ()=>{
    test('GET api test', async({request})=>{
        const userApi= new UsersApi(request);
        const response= await userApi.getUsers();
        const responseBody= await response.json();
        expect(response.status()).toBe(200);
        expect (responseBody.length).toBe(10);
        expect(responseBody[0].name).toBe("Leanne Graham");
    });
    newUsers.forEach((user)=>{
        test(`Post api test for ${user.name}`, async({request})=>{
            const userApi= new UsersApi(request);
            const response= await userApi.postUser(user);
            const responseBody: CreateUserResponse= await response.json();
            expect(response.status()).toBe(201);
            expect(typeof responseBody.id).toBe('number');
            expect(typeof responseBody.email).toBe('string');
            expect(typeof responseBody.name).toBe('string');
            expect(typeof responseBody.username).toBe('string');
            expect(responseBody.name).toBe(user.name);
            expect(responseBody.email).toBe(user.email);
            expect(responseBody.username).toBe(user.username);
            expect(responseBody).toHaveProperty('id');
        });
    });
    

    test('PUT api test', async({request})=>{
        const userApi= new UsersApi(request);
        const response= await userApi.updateUser(1,updatedUser);
        const responseBody= await response.json();
        expect(response.status()).toBe(200);
        expect(responseBody.name).toBe(updatedUser.name);
        expect(responseBody.username).toBe(updatedUser.username);
        expect(responseBody.email).toBe(updatedUser.email);
        expect(responseBody.id).toBe(1);

    });

    test('PATCH api test', async({request})=>{
        const userApi= new UsersApi(request);
        const response= await userApi.patchUser(1, patchedUser);
        const responseBody= await response.json();
        expect(response.status()).toBe(200);
        expect(responseBody.id).toBe(1);
        expect(responseBody.email).toBe(patchedUser.email);
    });

    test('Delete api test', async({request})=>{
        const userApi= new UsersApi(request);
        const response= await userApi.deleteUser(1);
        const responseBody= await response.json();
        expect(response.status()).toBe(200);
        expect(responseBody).toEqual({});
    });

    test('Verify api login', async({request})=>{
        const response= await request.post('https://automationexercise.com/api/verifyLogin', {form:{email: users.valid.email, password: users.valid.password}});
        const responseBody= await response.json();
        expect(response.status()).toBe(200);
        expect(responseBody.responseCode).toBe(200);
        expect(responseBody.message).toBe('User exists!');
    });

    

});


