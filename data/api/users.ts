export interface CreateUserPayload{
    name: string;
    username: string;
    email: string;
}

export interface CreateUserResponse extends CreateUserPayload{
    id: number;
}


export const updatedUser: CreateUserPayload={
    name: 'Test User1',
    username: 'testuser1',
    email: 'testuser1@example.com'

}

export const patchedUser: Partial<CreateUserPayload>={
    email: 'patchuser@example.com'
}

export const newUsers: CreateUserPayload[]=[
    {
        name: 'Test User1',
        username: 'testuser1',
        email: 'testuser1@example.com'
    },
    {
        name: 'Test User2',
        username: 'testuser2',
        email: 'testuser2@example.com'
    },
    {
        name: 'Test User3',
        username: 'testuser3',
        email: 'testuser3@example.com'
    }
]

