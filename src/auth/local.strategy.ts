import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";
//This is used for creating the strategy we chose via passport which is local
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super() //This is a configuration for us in every passport strategy we choose
    }

    //Validates a user if its existing from the auth service
    async validate(username: string, passport: string): Promise<any> {
        const user = await this.authService.validateUser(username, passport)

        if (!user) {
            throw new UnauthorizedException()
        }

        return user
    }
}