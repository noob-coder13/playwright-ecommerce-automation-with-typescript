import { APIRequestContext, APIResponse } from '@playwright/test';
import { CreateUserPayload } from "../data/api/users"


export class UsersApi{
    readonly apiContext: APIRequestContext;

    constructor(apiContext:APIRequestContext){
        this.apiContext= apiContext;

    }

    async getUsers():Promise<APIResponse>{
        return this.apiContext.get('/users');

    }
    async postUser(user:CreateUserPayload):Promise<APIResponse>{
        return this.apiContext.post('/users',{data:user});
    }

    async updateUser(id:number,payload:CreateUserPayload):Promise<APIResponse>{
        return this.apiContext.put(`/users/${id}`, {data:payload});
    }
    async patchUser(id:number, payload:Partial<CreateUserPayload>):Promise<APIResponse>{
        return this.apiContext.patch(`/users/${id}`,{data:payload});
    }

    async deleteUser(id:number):Promise<APIResponse>{
        return this.apiContext.delete(`/users/${id}`);
    }
}