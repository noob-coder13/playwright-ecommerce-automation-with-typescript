interface BaseLoginUser{
    email: string;
    password: string;

}
interface ValidLoginUser extends BaseLoginUser{
    expectedUserName: string;
}
interface InvalidLoginUser extends BaseLoginUser{
    expectedErrorMessage: string;
}
interface LoginUsers{
    invalid: InvalidLoginUser;
    valid: ValidLoginUser;
}
const userPassword=  process.env.USER_PASSWORD;
if(!userPassword){
    throw new Error("UserPassword environment variable is not set");
}

export const users: LoginUsers = {
    valid:{
        email:"abhishek3rawat@gmail.com",
        password: userPassword,
        expectedUserName:"Abhishek Rawat"

    },

    invalid:{
        email: "incorrectemail@gmail.com",
        password: "incorrectPassword",
        expectedErrorMessage: "Your email or password is incorrect!"
    }


}

