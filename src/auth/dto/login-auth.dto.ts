import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MaxLength, MinLength, IsNotEmpty } from 'class-validator';

export class LoginAuthDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: 'alejo@gmail.com' })
  email: string;

  @MinLength(6)
  @MaxLength(20)
  @IsNotEmpty()
  password: string;
}
