import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskRepository } from 'src/repositories/task.repository';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}
  // findAll() {
  //   return [{ id: 1, name: 'Flávio Montoril' }];
  // }

  // async findAll() {
  //   return this.taskRepository.findAll();
  // }

  async findAllWithPagination(page: number = 1, limit: number = 10) {
    page = Math.max(page, 1);
    limit = Math.max(limit, 1);

    const skip = (page - 1) * limit;

    const { items, total } = await this.taskRepository.findAllPaginated(
      skip,
      limit,
    );

    return {
      data: items,
      meta: {
        total,
        page,
        limit,
        lastPage: Math.ceil(total / limit),
      },
    };
  }

  async create(data: CreateTaskDto) {
    const exists = await this.taskRepository.findByCode(data?.code);

    if (exists) {
      throw new BadRequestException('Já existe uma task com esse código');
    }

    return this.taskRepository.create({
      title: data.title,
      description: data.description,
      code: data.code,
    });
  }
}
