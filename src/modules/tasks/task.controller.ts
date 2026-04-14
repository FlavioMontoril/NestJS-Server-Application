import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { PaginationDto } from './dto/pagination-dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TaskService) {}
  @Get()
  // findAll() {
  //   return this.tasksService.findAll();
  // }
  findAll(@Query() query: PaginationDto) {
    const page = query.page ? Number(query.page) : 1;
    const limit = query.limit ? Number(query.limit) : 10;
    return this.tasksService.findAllWithPagination(Number(page), Number(limit));
  }

  @Post()
  create(@Body() data: CreateTaskDto) {
    return this.tasksService.create(data);
  }
}
