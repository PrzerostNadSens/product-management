import { DatabaseModule } from '../database/database.module';
import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsDao } from './products.dao';
import { ProductsService } from './products.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsDao],
})
export class ProductsModule {}
