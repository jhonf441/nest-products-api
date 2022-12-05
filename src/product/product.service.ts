import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './interfaces/product.interface';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(@InjectModel('Product') private productModel: Model<Product>) {}

  async findAll(): Promise<Product[]> {
    return this.productModel
      .find()
      .populate({ path: 'user', select: ['email', 'name'] })
      .exec();
  }

  async findOne(productID: string): Promise<Product> {
    const product = await this.productModel
      .findById(productID)
      .populate({ path: 'user', select: ['email', 'name'] });

    return product;
  }

  async create(createProductDTO: CreateProductDto): Promise<Product> {
    return await (
      await this.productModel.create(createProductDTO)
    ).populate({ path: 'user', select: ['email', 'name'] });
  }

  async remove(productID: string, user: Types.ObjectId): Promise<Product> {
    const product = await this.productModel.findById(productID);
    if (product.user.toString() !== user.toString())
      throw new HttpException(
        'You do not have permission to edit',
        HttpStatus.FORBIDDEN,
      );
    const deleteProduct = await this.productModel
      .findByIdAndDelete(productID)
      .populate({ path: 'user', select: ['email', 'name'] });
    return deleteProduct;
  }

  async update(
    productID: string,
    updateProductDto: UpdateProductDto,
    user: Types.ObjectId,
  ): Promise<Product> {
    const product = await this.productModel.findById(productID);
    console.log(product.user, user);
    if (product.user.toString() !== user.toString())
      throw new HttpException(
        'You do not have permission to edit',
        HttpStatus.FORBIDDEN,
      );

    const updateProduct = await this.productModel
      .findByIdAndUpdate(productID, updateProductDto, { new: true })
      .populate({ path: 'user', select: ['email', 'name'] });
    return updateProduct;
  }
}
