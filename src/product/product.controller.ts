import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  NotFoundException,
  Patch,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';

import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';
import { Product } from './interfaces/product.interface';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { UpdateProductDto } from './dto/update-product.dto';
import { ParseObjectIdPipe } from 'src/utilities/parse-object-id-pipe.pipe';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { Types } from 'mongoose';

@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('product')
@ApiTags('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post()
  async create(@Request() req, @Body() createProductDto: CreateProductDto) {
    const product = await this.productService.create({
      ...createProductDto,
      user: req.user._id,
    });
    return {
      message: 'Product successfully created',
      product,
    };
  }

  @Get()
  async findAll(): Promise<Product[]> {
    return await this.productService.findAll();
  }

  @Get(':productID')
  async findOne(@Param('productID', ParseObjectIdPipe) productID: string) {
    const product = await this.productService.findOne(productID);

    if (!product) throw new NotFoundException('Product does not exist');
    return product;
  }

  @Patch(':productID')
  async update(
    @Request() req,
    @Body() updateProductDTO: UpdateProductDto,
    @Param('productID', ParseObjectIdPipe) productID: string,
  ) {
    const updatedProduct = await this.productService.update(
      productID,
      updateProductDTO,
      req.user._id,
    );
    if (!updatedProduct) throw new NotFoundException('Product does not exists');

    return {
      message: 'Product updated successfully',
      updatedProduct,
    };
  }

  @Delete(':productID')
  async remove(
    @Request() req,
    @Param('productID', ParseObjectIdPipe) productID: string,
  ) {
    const deleteProduct = await this.productService.remove(
      productID,
      req.user._id,
    );

    if (!deleteProduct) throw new NotFoundException('Product does not exists');
    return { message: 'Product deleted successfully', deleteProduct };
  }
}
