import { DatabaseModule } from './database/database.module';
import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [ProductsModule, DatabaseModule],
})
export class AppModule {}
