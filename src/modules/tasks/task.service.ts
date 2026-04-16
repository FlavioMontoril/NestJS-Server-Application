import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TaskRepository } from 'src/modules/tasks/infra/prisma/task.repository';
import { Task } from './domain/entities/task.entity';
import { InputTask } from './dto/create-task.dto';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async findAllWithPagination(page: number = 1, limit: number = 10) {
    page = Math.max(page, 1);
    limit = Math.max(limit, 1);

    const skip = (page - 1) * limit;

    const items = await this.taskRepository.findAllPaginated(skip, limit);

    const total = await this.taskRepository.countTasks();

    return {
      data: items,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findByCode(code: string): Promise<Task> {
    const task = await this.taskRepository.findByCode(code);

    if (!task) {
      throw new NotFoundException('Task não encontrada');
    }

    return task;
  }

  async findById(id: string) {
    const task = await this.taskRepository.findById(id);

    if (!task) {
      throw new NotFoundException('Task não encontrada');
    }

    return task;
  }

  async create(data: InputTask): Promise<void> {
    const exists = await this.taskRepository.findByCode(data?.code);

    if (exists) {
      throw new ConflictException('Já existe uma task com esse código');
    }

    const task = new Task({
      code: data.code,
      title: data.title,
      description: data.description,
    });
    await this.taskRepository.create(task);
  }

  async deleteTask(id: string) {
    const task = await this.taskRepository.findById(id);

    if (!task) {
      throw new NotFoundException('Task não encontrada');
    }

    await this.taskRepository.deleteTask(id);
  }
}
