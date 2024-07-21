import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(private userService: UserService) {}

    //Validate the user if existing in the database
    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userService.findOne(username)
        
        if (user && user.password === password) {
            const { password, userName, ...rest} = user
            return rest
        }

        return null

    }
}
