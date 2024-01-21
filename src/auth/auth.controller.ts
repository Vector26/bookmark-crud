import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginReqDTO } from './dto';
import { RegisterUserReqDTO } from './dto/auth.dto.register';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService)   {}

    @Post('login')
    async login(@Body('username') username:string,@Body('password') password:string) {
        const credentialsObj : UserLoginReqDTO = {username:username, password:password};
        return this.authService.login(credentialsObj);
    }

    @Post('register')
    async register(@Body() registerDTO: RegisterUserReqDTO) {
        return this.authService.register(registerDTO);
    }
}