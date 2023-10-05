import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwt_config } from "src/utils/jwt/config-jwt";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            // ignoreExpiration: false,
            secretOrKey: jwt_config.secret
        })
    }

    async validate(payload: any) {
        if (!payload) {
            throw new UnauthorizedException();
        }
        return {
            ...payload
        };
    }
}
