import { Injectable } from '@nestjs/common';
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
      .populate({ path: 'owner', select: ['email', 'name'] })
      .exec();
  }

  async findOne(productID: string): Promise<Product> {
    const product = await this.productModel
      .findById(productID)
      .populate({ path: 'owner', select: ['email', 'name'] });

    return product;
  }

  async create(createProductDTO: CreateProductDto): Promise<Product> {
    return await (
      await this.productModel.create(createProductDTO)
    ).populate({ path: 'owner', select: ['email', 'name'] });
  }

  async remove(productID: string): Promise<Product> {
    const deleteProduct = await this.productModel
      .findByIdAndDelete(productID)
      .populate({ path: 'owner', select: ['email', 'name'] });
    return deleteProduct;
  }

  async update(
    productID: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const updateProduct = await this.productModel
      .findByIdAndUpdate(productID, updateProductDto, { new: true })
      .populate({ path: 'owner', select: ['email', 'name'] });
    return updateProduct;
  }
}
