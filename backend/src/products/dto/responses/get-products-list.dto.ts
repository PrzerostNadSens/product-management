import { ApiProperty } from '@nestjs/swagger';

export class GetProductListDto {
  @ApiProperty({ description: 'Product ID' })
  id: string;

  @ApiProperty({ description: 'Product name' })
  name: string;
}
