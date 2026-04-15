import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { PaginationDto } from './dto/pagination-dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TaskService) {}

  @Get()
  @HttpCode(200)
  async findAllTasksWithPagination(@Query() query: PaginationDto) {
    return await this.tasksService.findAllWithPagination(
      query.page,
      query.limit,
    );
  }

  @Get(':code')
  @HttpCode(200)
  async findByCode(@Param('code') code: string) {
    return await this.tasksService.findByCode(code);
  }

  @Post()
  @HttpCode(201)
  async create(@Body() data: CreateTaskDto) {
    await this.tasksService.create(data);
    return { message: 'Task criada com sucesso' };
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    await this.tasksService.deleteTask(id);
  }
}
