import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { GetUser } from 'src/auth/decorator';
import { jwtPayload } from 'src/auth/dto/auth.dto.jwtPayload';
import { CustomAuthGuard } from 'src/auth/guards';

@Controller('user')
@UseGuards(CustomAuthGuard)
export class UserController {
    
    @Get('authTest')
    async authTest(@GetUser() user:jwtPayload) : Promise<string>{
        console.log(user);
        return "Hello, you have access to this";
    }
}
