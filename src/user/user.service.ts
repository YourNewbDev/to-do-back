import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt'
import { Prisma, User } from '@prisma/client';
import { error } from 'console';

@Injectable()
export class UserService {
  constructor(private readonly prisma : PrismaService) {}

  create(payload: CreateUserDto) {
    return this.prisma.$transaction(async(tx) => {
     // 1. Check if username exists

     const existingUser = await tx.user.findUnique({
      where: {
        userName: payload.userName
      }
     })

     // 2. Use contidional statement for throwing error
     if (existingUser) {
      throw new ForbiddenException("Username already exist.")
     }

     // 3. If username doesn't exist, create one
     const saltOrRounds = 10
     const password = payload.password
     const hash = await bcrypt.hash(password, saltOrRounds)

     const newUser = await tx.user.create({
      data: {
        userName: payload.userName,
        password: hash
      }
     })

     return newUser
    

    })
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(username: string): Promise<User | undefined> {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        userName: username
      }
    })

    if (!existingUser) {
      throw new NotFoundException(`User with id ${username} not found`)

    }
    else {
      return existingUser

    }

  }

  update(id: string, payload: UpdateUserDto) {
    return this.prisma.$transaction(async(tx) => {
      // 1. Check if the user exist

      const existingUser = await tx.user.findUnique({
        where: {
          id: id
        }
      })

      // 2. Use contidional statement for throwing error
      if (!existingUser) {
        throw new NotFoundException(`User with id ${id} not found`)
      }

      // 3. If user exist, make update
      const saltOrRounds = 10
      const password = payload.password
      const hash = await bcrypt.hash(password, saltOrRounds)

      const updateUser = await tx.user.update({
        data: {
          userName: payload.userName,
          password: hash
        },
        where: {
          id: id
        }
      })

      return updateUser

    })

  }

  async remove(id: string) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        id: id
      }
    })

    if (!existingUser) {
      throw new NotFoundException(`User with id ${id} not found`)

    }
    else {
      return await this.prisma.user.delete({
        where: {
          id: id
        }
      })

    }
  }
}
