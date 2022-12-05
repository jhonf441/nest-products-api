import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Connection, Model, connect } from 'mongoose';
import { UserDocument, User, UserSchema } from './schema/user.schema';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { getConnectionToken, getModelToken } from '@nestjs/mongoose';

describe('UserController', () => {
  let controller: UserController;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let userModel: Model<UserDocument>;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    userModel = mongoConnection.model(User.name, UserSchema);

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: getConnectionToken('DatabaseConnection'),
          useValue: mongoConnection,
        },
        { provide: getModelToken(User.name), useValue: userModel },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  afterAll(async () => {
    await mongoConnection.dropDatabase();
    await mongoConnection.close();
    await mongod.stop();
  });

  afterEach(async () => {
    const collections = mongoConnection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  });


});
