import { Injectable } from '@nestjs/common';
import { generateBaseEntity } from 'src/common/utils/base-entity.util';
import { PrismaService } from 'src/database/prisma.service';
import { CreateTaskDto } from 'src/modules/tasks/dto/create-task.dto';

@Injectable()
export class TaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  //   findAll() {
  //     return this.prisma.task.findMany();
  //   }

  async findAllPaginated(skip: number, take: number) {
    const [items, total] = await Promise.all([
      this.prisma.task.findMany({
        skip,
        take,
      }),
      this.prisma.task.count(),
    ]);

    return { items, total };
  }

  findByCode(code: string) {
    return this.prisma.task.findUnique({ where: { code } });
  }

  create(data: CreateTaskDto) {
    return this.prisma.task.create({
      data: {
        ...generateBaseEntity(),
        ...data,
      },
    });
  }
}
