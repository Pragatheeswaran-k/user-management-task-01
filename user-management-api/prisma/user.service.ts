// src/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  createUser(username: string, email: string, password: string) {
    return this.prisma.user.create({ data: { username, email, password } });
  }

  getAllUsers() {
    return this.prisma.user.findMany();
  }
}
