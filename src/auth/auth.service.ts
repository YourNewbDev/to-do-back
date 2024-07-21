import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(private userService: UserService) {}

    //Validate the user if existing in the database
    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userService.findOne(username)
        
        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password)

            if (passwordMatch) {
                const {password: hashedPassword, userName, ...rest} = user 

                return rest
            }
        }

        throw new UnauthorizedException()

    }
}
