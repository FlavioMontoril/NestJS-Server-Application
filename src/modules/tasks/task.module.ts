import { Module } from '@nestjs/common';
import { TasksController } from './task.controller';
import { TaskService } from './task.service';
import { PrismaModule } from 'src/database/prisma.module';
import { TaskRepository } from 'src/repositories/task.repository';

@Module({
  imports: [PrismaModule],
  controllers: [TasksController],
  providers: [TaskService, TaskRepository],
  // Exporta "TaskService" apenas quando outro módulo precisa usar o service.
  // exports: [TaskService],
})
export class TaskModule {}
