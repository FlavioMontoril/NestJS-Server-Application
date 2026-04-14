import { Body, Controller, Get, Post } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TaskService) {}
  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Post()
  create(@Body() data: CreateTaskDto) {
    return this.tasksService.create(data);
  }
}
