// import { Injectable, OnModuleInit } from '@nestjs/common';
// import { PrismaClient } from '@prisma/client';
// @Injectable()
// export class PrismaService extends PrismaClient implements OnModuleInit {
//   async onModuleInit() {
//     await this.$connect();
//   }
// }

import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super(); // 👈 SEM NADA AQUI
  }

  async onModuleInit() {
    await this.$connect();
  }
}
