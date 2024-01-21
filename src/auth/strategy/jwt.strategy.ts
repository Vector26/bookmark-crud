import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from '@nestjs/config';
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { jwtPayload } from "../dto/auth.dto.jwtPayload";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private config:ConfigService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.get("JWT_SECRET")
        });
    }

    async validate(payload: jwtPayload) : Promise<jwtPayload>{
        // This payload is the decoded JWT token
        return payload;
        // You can add more fields from the payload if needed, or load additional details from the database
    }
}
