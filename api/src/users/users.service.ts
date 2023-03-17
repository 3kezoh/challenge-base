import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  create(data: Prisma.UserCreateInput) {
    return this.prismaService.user.create({
      data,
    });
  }

  findAll() {
    return this.prismaService.user.findMany();
  }

  findOne(where: Prisma.UserWhereUniqueInput) {
    return this.prismaService.user.findUnique({
      where,
    });
  }

  update(where: Prisma.UserWhereUniqueInput, data: Prisma.UserUpdateInput) {
    return this.prismaService.user.update({
      data,
      where,
    });
  }

  remove(where: Prisma.UserWhereUniqueInput) {
    return this.prismaService.user.delete({ where });
  }
}