import { PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';
import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';
import { User } from '../../user/schema/user.schema';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

import { Exclude, Type } from 'class-transformer';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiHideProperty()
  @IsOptional()
  @Exclude()
  _id: string;

  @ApiHideProperty()
  @Type(() => User)
  owner: User;
}
