import { ApiProperty } from '@nestjs/swagger';

export class ProductDto {
  @ApiProperty({ type: 'string', format: 'uuid', description: 'Product ID' })
  id: string;

  @ApiProperty({ type: 'string', description: 'Product name' })
  name: string;

  @ApiProperty({ type: 'string', description: 'Product description' })
  description: string;

  @ApiProperty({ type: 'number', description: 'Product price' })
  price: number;

  @ApiProperty({ type: 'number', description: 'Product stock quantity' })
  stock: number;
}
