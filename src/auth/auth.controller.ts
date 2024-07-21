import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local.auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    //endpoint auth/login
    @UseGuards(LocalAuthGuard) //Make authentication for LocalAuthGuard
    @Post('login')
    login(@Request() req): any {
      return req.user // Return the authenticated user from LocalAuthGuard
    }
}
