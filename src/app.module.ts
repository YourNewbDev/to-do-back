import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [UserModule, PrismaModule, ConfigModule.forRoot({
    isGlobal: true
  }), UserModule, TaskModule],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
