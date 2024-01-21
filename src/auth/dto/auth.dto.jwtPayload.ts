import { IsEmail, IsNotEmpty } from "class-validator";

export class jwtPayload{
    @IsNotEmpty()
    userId: number;
    
    @IsEmail()
    @IsNotEmpty()
    email: string;
}