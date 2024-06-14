import { GetProductListDto, ProductDto } from './dto';
import { Injectable, NotFoundException } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { ProductsDao } from './products.dao';

@Injectable()
export class ProductsService {
  constructor(private dao: ProductsDao) {}

  async create(data: Prisma.ProductCreateInput): Promise<ProductDto> {
    return this.dao.create(data);
  }

  async findAll(): Promise<GetProductListDto[]> {
    return this.dao.findAll();
  }

  async findOne(id: string): Promise<ProductDto> {
    const product = await this.dao.findOne(id);

    if (!product) {
      throw new NotFoundException('Product with this id does not exist');
    }
    return product;
  }

  async update(
    id: string,
    data: Prisma.ProductUpdateInput,
  ): Promise<ProductDto> {
    await this.findOne(id);

    return this.dao.update(id, data);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);

    await this.dao.remove(id);
  }
}
