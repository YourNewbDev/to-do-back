import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from './auth/guard/accessToken.guard';

@Module({
  imports: [
  ConfigModule.forRoot({ isGlobal: true }),
  UserModule, 
  PrismaModule, 
  TaskModule,
  AuthModule],
  // controllers: [AppController],
  providers: [
    { provide: APP_GUARD, useClass: AccessTokenGuard }
  ],
})
export class AppModule {}
