import { Module } from '@nestjs/common';
import { TasksController } from './task.controller';
import { TaskService } from './task.service';
import { PrismaModule } from 'src/database/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TasksController],
  providers: [TaskService],
  //   exports: [TaskService], Só exporta quando outro módulo precisa usar o UsersService. Ex: UserService
})
export class TaskModule {}
