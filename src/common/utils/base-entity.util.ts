import { randomUUID } from 'crypto';

export function generateBaseEntity() {
  return {
    id: randomUUID(),
    createdAt: new Date(),
  };
}
