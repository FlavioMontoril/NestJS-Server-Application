import { Task as PrismaTask } from '@prisma/client';
import { Task } from '../../domain/entities/task.entity';

export class TaskMapper {
  public static toDomain(raw: PrismaTask): Task {
    return new Task({
      id: raw.id,
      code: raw.code,
      title: raw.title,
      description: raw.description || undefined,
      createdAt: raw.createdAt,
    });
  }

  public static toPersistence(entity: Task): PrismaTask {
    return {
      id: entity.id,
      code: entity.code,
      title: entity.title,
      description: entity.description || null,
      createdAt: entity.createdAt,
    };
  }
}
