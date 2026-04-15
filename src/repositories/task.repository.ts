import { Injectable } from '@nestjs/common';
import { generateBaseEntity } from 'src/common/utils/base-entity.util';
import { PrismaService } from 'src/database/prisma.service';
import { CreateTaskDto } from 'src/modules/tasks/dto/create-task.dto';

@Injectable()
export class TaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAllPaginated(skip: number, take: number) {
    return await this.prisma.task.findMany({
      skip,
      take,
    });
  }

  async findByCode(code: string) {
    return await this.prisma.task.findUnique({ where: { code } });
  }

  async create(data: CreateTaskDto) {
    return await this.prisma.task.create({
      data: {
        ...generateBaseEntity(),
        ...data,
      },
    });
  }

  async findById(id: string) {
    return await this.prisma.task.findUnique({
      where: { id },
    });
  }

  async deleteTask(id: string) {
    return await this.prisma.task.delete({
      where: { id },
    });
  }

  async countTasks() {
    return await this.prisma.task.count();
  }
}
