import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}

  async upsert(payload: CreateTaskDto) {
    return await this.prisma.task.upsert({
      where: {
        id: payload.taskId.id || ''
      },
      create: payload.task,
      update: payload.task
    })
  }

  // async update(id: string, payload: UpdateTaskDto) {
  //   const existingTask = await this.prisma.task.findUnique({
  //     where: { id: id },
  //   });
  
  //   if (!existingTask) {
  //     throw new NotFoundException(`Task with id ${id} not found`);
  //   }

  //   const updateData = {...payload}
  
  //   return await this.prisma.task.update({
  //     where: {
  //       id: id
  //     },
  //     data: updateData
  //   });
  // }

  async findAll() {
    return await this.prisma.task.findMany();
  }

  async findOne(id: string) {
    const existingTask = await this.prisma.task.findUnique({
      where: {
        id: id
      }
    })

    if (!existingTask) {
      throw new NotFoundException(`Task with id ${id} not found`)
    }
    else {
      return existingTask
    }
  }

  async remove(id: string) {
    const existingTask = await this.prisma.task.findUnique({
      where: {
        id: id
      }
    })

    if (!existingTask) {
      throw new NotFoundException(`User with id ${id} not found`)

    }
    else {
      return await this.prisma.task.delete({
        where: {
          id: id
        }
      })
  }
}
}
