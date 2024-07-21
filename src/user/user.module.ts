import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [UserService],
  //Exports user service in order to use it on auth module
  exports: [UserService]
})
export class UserModule {}
