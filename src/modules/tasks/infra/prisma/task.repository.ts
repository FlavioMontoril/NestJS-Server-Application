import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Task as PrismaTask } from '@prisma/client';
import { TaskMapper } from './task.mapper';
import { Task } from '../../domain/entities/task.entity';

@Injectable()
export class TaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAllPaginated(skip: number, take: number): Promise<Task[]> {
    const paginated: PrismaTask[] = await this.prisma.task.findMany({
      skip,
      take,
    });
    return paginated.map((raw) => TaskMapper.toDomain(raw));
  }

  async findByCode(code: string): Promise<Task | null> {
    const task: PrismaTask | null = await this.prisma.task.findUnique({
      where: { code },
    });
    if (!task) return null;
    return TaskMapper.toDomain(task);
  }

  async create(data: Task): Promise<void> {
    const task: PrismaTask = TaskMapper.toPersistence(data);
    await this.prisma.task.create({
      data: task,
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
