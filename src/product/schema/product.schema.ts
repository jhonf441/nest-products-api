
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import * as mongoose from 'mongoose';
import { Document, ObjectId } from 'mongoose';
import { Transform, Type } from 'class-transformer';

import { User } from '../../user/schema/user.schema'



export type ProductDocument = HydratedDocument<Product>;


@Schema()
export class Product extends Document {
  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop({  type: mongoose.Schema.Types.ObjectId, ref: User.name })
  @Type(() => User)
  owner: User
}

export const ProductSchema = SchemaFactory.createForClass(Product);


