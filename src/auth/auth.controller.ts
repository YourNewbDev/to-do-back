import { Controller, Get, Post, Body, Patch, Param, Delete, Response, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpInput } from './dto/signup-input';
import { SignInInput } from './dto/signin-input';
import { Public } from 'src/decorator/public.decorator';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  signUp(@Body() SignUpInput: SignUpInput, @Response() res) {
    return this.authService.signUp(SignUpInput, res);
  }


  // @Public()
  @Post('signin')
  signIn(@Body() SignInInput: SignInInput, @Request() req, @Response() res) {
    return this.authService.signIn(SignInInput, req, res)
  }


  @Public()
  @Get('signout')
  signout(@Request() req, @Response() res) {
    return this.authService.signout(req, res)
  }


}
