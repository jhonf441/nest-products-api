import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';
import { User } from 'src/user/schema/user.schema';
import { IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';
export class CreateProductDto {
  @ApiProperty({ example: 'Caja de herramientas' })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly price: number;

  @ApiHideProperty()
  readonly user: Types.ObjectId;

  /* @ApiProperty()
  readonly createdAt: Date; */
}
