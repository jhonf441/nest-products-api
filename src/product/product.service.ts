import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './schema/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { User } from '../user/schema/user.schema';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {}

  async findAll(): Promise<ProductDocument[]> {
    return this.productModel
      .find()
      .populate({ path: 'owner', select: ['email', 'name'] })
      .exec();
  }

  async findOne(productID: string): Promise<ProductDocument> {
    const product = await this.productModel
      .findById(productID)
      .populate({ path: 'owner', select: ['email', 'name'] });

    return product;
  }

  async create(createProductDTO: CreateProductDto, owner: User): Promise<ProductDocument> {

   
    return await (
      await this.productModel.create({...createProductDTO, owner })
    ).populate({ path: 'owner', select: ['email', 'name'] });
  }

  async remove(productID: string): Promise<ProductDocument> {
    const deleteProduct = await this.productModel
      .findByIdAndDelete(productID)
      .populate({ path: 'owner', select: ['email', 'name'] });
    return deleteProduct;
  }

  async update(
    productID: string,
    updateProductDto: UpdateProductDto,
  ): Promise<ProductDocument> {
    const updateProduct = await this.productModel
      .findByIdAndUpdate(productID, updateProductDto, { new: true })
      .populate({ path: 'owner', select: ['email', 'name'] });
    return updateProduct;
  }
}
