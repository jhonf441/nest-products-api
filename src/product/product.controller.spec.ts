import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';

import { ProductService } from './product.service';
import { Connection, Model, connect } from 'mongoose';
import {
  ProductDocument,
  Product,
  ProductSchema,
} from './schema/product.schema';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { getConnectionToken, getModelToken } from '@nestjs/mongoose';

describe('ProductController', () => {
  let controller: ProductController;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let productModel: Model<ProductDocument>;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    // productModel = mongoConnection.model(Product.name, ProductSchema);

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
    }).compile();

    controller = module.get<ProductController>(ProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
