import { ForbiddenException, Injectable } from '@nestjs/common';
import { User, PrismaClient } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UserLoginReqDTO } from './dto';
import { RegisterUserReqDTO } from './dto/auth.dto.register';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { jwtPayload } from './dto/auth.dto.jwtPayload';

@Injectable()
export class AuthService {

    constructor(private prismService:PrismaService,private jwt:JwtService,private config:ConfigService){}

    
    async register(registerReqDTO: RegisterUserReqDTO) {
        let hash = await argon.hash(registerReqDTO.password);
        try{
            const user = await this.prismService.user.create({
                data:{
                    email:registerReqDTO.email,
                    username:registerReqDTO.username,
                    hash:hash,
                    firstName:registerReqDTO.firstName,
                    lastName:registerReqDTO.lastName
                }
            })
            return user;
        }
        catch(e)
        {
            // console.log(Object.entries(e));
            // console.log(Object.keys(e));
            console.log(Object.entries(e.message));
            return {"error":e.message};
        }
    }


    async login(body: UserLoginReqDTO) : Promise<string>{
        const user = await this.prismService.user.findUnique({
            where:{
                username:body.username
            }
        })
        if(!user)
            throw new ForbiddenException('Credentials Incorrect');

        let pwMatches = await argon.verify(user.hash,body.password);

        if(!pwMatches)
            throw new ForbiddenException('Credentials Incorrect');

        return this.signToken(user.id,user.email);
    }

    async signToken(userId:number,email:string) : Promise<string>
    {
        const payload : jwtPayload = {
            userId,
            email
        }

        return this.jwt.signAsync(payload,{
            expiresIn:this.config.get('ACCESS_TOKEN_EXPIRE_TIME'),
            secret:this.config.get('JWT_SECRET')
        })
    }
}
