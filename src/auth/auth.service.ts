import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../user/schema/user.schema';
import { compareHash, generateHash } from './utils/handleBcrypt';
import { Model } from 'mongoose';
import { LoginAuthDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  public async login(userLoginBody: LoginAuthDto) {
    const { password, email } = userLoginBody;

    const userExist = await this.userModel.findOne({
      email: email,
    });
    if (!userExist) throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);

    const isCheck = await compareHash(password, userExist.password);
    console.log('isCheck', isCheck);
    if (!isCheck)
      throw new HttpException('PASSWORD_INVALID', HttpStatus.CONFLICT);

    const userFlat = userExist.toObject();
    delete userFlat.password;

    const payload = {
      id: userFlat._id,
    };

    const token = this.jwtService.sign(payload);

    const data = {
      token,
      user: userFlat,
    };

    return data;
  }

  public async register(userBody: RegisterAuthDto) {
    const { password, name, email } = userBody;

    const existingUser = await this.userModel.findOne({ email });

    if (existingUser)
      throw new HttpException(
        'An account with that email already exists!',
        HttpStatus.CONFLICT,
      );

    const userParse = {
      email,
      name,
      password: await generateHash(password),
    };

    return await this.userModel.create(userParse);
  }
}
