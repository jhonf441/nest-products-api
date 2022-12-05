import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';

import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { Types } from 'mongoose';
import { Exclude, Type } from 'class-transformer';
export class CreateProductDto {

  

  @ApiProperty({ example: 'Caja de herramientas' })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly price: number;

 

  /* @ApiProperty()
  readonly createdAt: Date; */
}
