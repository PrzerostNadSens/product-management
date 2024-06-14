import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import {
  CreateProductDto,
  GetProductListDto,
  ProductDto,
  UpdateProductDto,
} from './dto';
import {
  ApiTags,
  ApiOperation,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'The product has been created' })
  @ApiOkResponse({ type: ProductDto })
  @ApiBadRequestResponse({ description: 'Validation errors' })
  async create(
    @Body() createProductDto: CreateProductDto,
  ): Promise<ProductDto> {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get a list of products' })
  @ApiOkResponse({ type: GetProductListDto })
  @ApiBadRequestResponse({ description: 'Validation errors' })
  async findAll(): Promise<GetProductListDto[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get product details' })
  @ApiOkResponse({ type: ProductDto })
  @ApiNotFoundResponse({ description: 'Product was not found in database' })
  @ApiBadRequestResponse({ description: 'Validation errors' })
  async findOne(@Param('id') id: string): Promise<ProductDto> {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a product' })
  @ApiOkResponse({ type: ProductDto })
  @ApiNotFoundResponse({ description: 'Product was not found in database' })
  @ApiBadRequestResponse({ description: 'Validation errors' })
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<ProductDto> {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a product' })
  @ApiNoContentResponse({ description: 'Product was deleted' })
  @ApiNotFoundResponse({ description: 'Product was not found in database' })
  @ApiBadRequestResponse({ description: 'Validation errors' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.productsService.remove(id);
  }
}
