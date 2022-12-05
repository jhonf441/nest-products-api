/* export const ProductSchema = new Schema({
  name: String,
  description: String,
  idUser: { unique: true, require: true },
  price: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
 */

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import * as mongoose from 'mongoose';
export type ProducDocument = HydratedDocument<Product>;
import { User } from 'src/user/schema/user.schema';

@Schema()
export class Product {
  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  owner: Types.ObjectId;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

ProductSchema.statics.findAllCourses = function () {
  //TODO Estamos trabajanado en la collection de COURSES
  const list = this.aggregate([
    {
      $lookup: {
        from: 'users', //TODO
        foreignField: 'id',
        localField: 'idAuthor',
        as: 'author',
        pipeline: [
          //TODO esto actuando sobre la collection de users
          {
            $project: {
              _id: 0,
              name: 1,
              email: 1,
              avatar: 1,
            },
          },
        ],
      },
    },
    {
      $unwind: '$author',
    },
  ]);

  return list;
};
