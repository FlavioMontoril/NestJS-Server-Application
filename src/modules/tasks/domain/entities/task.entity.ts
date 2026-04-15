import { randomUUID } from 'crypto';
import { TaskProps } from '../types/task.types';

export class Task {
  private _id: string;
  private props: TaskProps;

  constructor(props: TaskProps, id?: string) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  get id(): string {
    return this._id;
  }

  get code(): string {
    return this.props.code;
  }

  get title(): string {
    return this.props.title;
  }

  get description(): string | undefined {
    return this.props.description;
  }

  get createdAt(): Date {
    return this.props.createdAt!;
  }

  updateTitle(title: string) {
    this.props.title = title;
  }

  updateDescription(description?: string) {
    this.props.description = description;
  }
}
