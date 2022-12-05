import { Injectable } from '@nestjs/common';
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

  async findOne(email: string): Promise<User | null> {
    return await this.userModel.findOne({ email });
  }
}
