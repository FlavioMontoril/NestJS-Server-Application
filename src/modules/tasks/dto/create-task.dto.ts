import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { TaskProps } from '../domain/types/task.types';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(5)
  code: string;
}

export type InputTask = Omit<TaskProps, '_id' | 'createdAt'>;
