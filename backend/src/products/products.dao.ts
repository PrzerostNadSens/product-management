import { Prisma, Product } from '@prisma/client';

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class ProductsDao {
  private readonly repository: Prisma.ProductDelegate;

  constructor(prismaService: PrismaService) {
    this.repository = prismaService.product;
  }

  async create(data: Prisma.ProductCreateInput): Promise<Product> {
    return this.repository.create({
      data,
    });
  }

  async findAll(): Promise<{ id: string; name: string }[]> {
    return this.repository.findMany({
      select: {
        id: true,
        name: true,
      },
    });
  }

  async findOne(id: string): Promise<Product> {
    return this.repository.findUnique({
      where: { id },
    });
  }

  async update(id: string, data: Prisma.ProductUpdateInput): Promise<Product> {
    return this.repository.update({
      where: { id },
      data,
    });
  }

  async remove(id: string): Promise<Product> {
    return this.repository.delete({
      where: { id },
    });
  }
}
