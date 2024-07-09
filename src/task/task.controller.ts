import { Controller, Get, Post, Body, Patch, Param, Delete, Request, Req, Put } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  // @Post()
  // upsert(@Body() payload: CreateTaskDto) {
  //   console.log(payload)
  //   return this.taskService.upsert(payload);
  // }

  @Post()
  create(@Body() payload: CreateTaskDto) {
    console.log(payload)
    return this.taskService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateTaskDto) {
    return this.taskService.update(id, payload);
  }


  @Get()
  findAll() {
    return this.taskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(id);
  }
}
