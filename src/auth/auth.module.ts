import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtService } from '@nestjs/jwt';
import { AccessTokenGuard } from './guard/accessToken.guard';
import { AccessTokenStrategy } from './strategy/accesstoken.strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtService, AccessTokenGuard, AccessTokenStrategy],
})
export class AuthModule {}
