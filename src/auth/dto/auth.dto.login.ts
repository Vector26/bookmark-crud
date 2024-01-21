import { IsNotEmpty } from "class-validator";

export class UserLoginReqDTO{
    @IsNotEmpty()
    username: string;
    @IsNotEmpty()
    password: string;
}

export class UserLoginRespDTO{
    @IsNotEmpty()
    token: string;
}