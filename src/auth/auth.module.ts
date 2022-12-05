import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtStrategy } from './strategy/jwt.strategy';
import { JwtHandle } from './utils/jwt-handle';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { jwtConstants } from './constants';
import { AuthController } from './auth.controller';
import { User, UserSchema } from '../user/schema/user.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '3600s' },
      }),
    }),
  ],
  providers: [AuthService, JwtStrategy, JwtHandle],

  controllers: [AuthController],
  exports: [JwtHandle, AuthService],
})
export class AuthModule {}
