import { Injectable } from "@nestjs/common";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from "@nestjs/passport";
import { jwtPayload } from "../dto/auth.dto.jwtPayload";
import { Request } from "express";


@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy, 'jwt-access') {
    constructor(configService: ConfigService) {
        super({
          jwtFromRequest: ExtractJwt.fromExtractors([
            AuthStrategy.extractJWT,
            ExtractJwt.fromAuthHeaderAsBearerToken()
          ]),
          ignoreExpiration: false,
          secretOrKey: configService.get<string>('JWT_SECRET'),
        });
      }
    
      async validate(payload: any) {
        return { username: payload.username, role: payload.role };
      }
    
      private static extractJWT(req: Request): string | null {
        if (req.cookies && 'access_token' in req.cookies) {
          return req.cookies.access_token;
        }
        return null;
      }
}