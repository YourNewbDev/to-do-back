import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtService } from '@nestjs/jwt';
import { AccessTokenGuard } from './guard/accessToken.guard';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtService, AccessTokenGuard],
})
export class AuthModule {}
