import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";
import { PrismaService } from "src/prisma/prisma.service";
import * as bcrypt from 'bcrypt'
//This is used for creating the strategy we chose via passport which is local
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService, private readonly prisma: PrismaService) {
        super() //This is a configuration for us in every passport strategy we choose
    }

    //Validates a user if its existing from the auth service
    async validate(username: string, password: string): Promise<any> {
        const user = await this.prisma.user.findUnique({
            where:{
                userName: username
            }
        })
        
        if (!user || !(await this.authService.validateUser(username, password))) {
            throw new UnauthorizedException()
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            throw new UnauthorizedException()
        }

        const {password: _, ...rest} = user

        return rest
    }
}