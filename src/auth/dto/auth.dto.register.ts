import { IsEmail, IsNotEmpty } from "class-validator";

export class RegisterUserRespDTO{
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    firstName: string;
    @IsNotEmpty()
    lastName: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;
}

export class RegisterUserReqDTO extends RegisterUserRespDTO {
    @IsNotEmpty()
    password: string;
}