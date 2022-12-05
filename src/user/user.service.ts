import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { create } from 'domain';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/user.dto';
import { User, UserDocument } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(createUserDTO: CreateUserDto): Promise<User> {
    const user = new this.userModel(createUserDTO);

    return await user.save();
  }

  async getByEmail(email: string) {
    const user = await this.userModel.findOne({ email });

    return user;
  }

  async getById(id: string) {
    const user = await this.userModel.findById(id);

    return user;
  }
}
