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
  Req,
  HttpStatus,
  HttpException,
} from '@nestjs/common';

import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { UpdateProductDto } from './dto/update-product.dto';
import { ParseObjectIdPipe } from '../utilities/parse-object-id-pipe.pipe';
import { JwtGuard } from '../auth/guards/jwt.guard';
import RequestWithUser from './interfaces/requestWithUser.interface';

@ApiBearerAuth()
@UseGuards(JwtGuard)  
@Controller('product')
@ApiTags('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  @Post()
  async create(
    @Req() req: RequestWithUser,
    @Body() createProductDto: CreateProductDto,
  ) {
    const product = await this.productService.create(
      createProductDto,
      req.user,
    );
    return {
      message: 'Product successfully created',
      product,
    };
  }

  @Get()
  async findAll() {
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
    @Req() req,
    @Body() updateProductDTO: UpdateProductDto,
    @Param('productID', ParseObjectIdPipe) productID: string,
  ) {
    const owner = req.user._id;

    const product = await this.productService.findOne(productID);

    if (!product) throw new NotFoundException('Product does not exists');

    if (product.owner._id.toString() !== owner.toString())
      throw new HttpException(
        'You cannot modify products that are not yours.',
        HttpStatus.FORBIDDEN,
      );
    const updatedProduct = await this.productService.update(
      productID,
      updateProductDTO,
    );

    return {
      message: 'Product updated successfully',
      updatedProduct,
    };
  }

  @Delete(':productID')
  async remove(
    @Req() req,
    @Param('productID', ParseObjectIdPipe) productID: string,
  ) {
    const owner = req.user._id;
    const product = await this.productService.findOne(productID);
    if (!product) throw new NotFoundException('Product does not exists');
  
    if (product.owner._id.toString() !== owner.toString())
      throw new HttpException(
        'You cannot modify products that are not yours.',
        HttpStatus.FORBIDDEN,
      );
    const deleteProduct = await this.productService.remove(productID);

    return { message: 'Product deleted successfully', deleteProduct };
  }
}
