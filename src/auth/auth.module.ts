import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  providers: [AuthService, LocalStrategy],
  //imported user service & passport module in order to use it in auth module
  imports: [PassportModule, UserModule],
  exports: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
