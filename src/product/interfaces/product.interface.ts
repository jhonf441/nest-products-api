import { Types } from 'mongoose';

export interface Product {
  readonly name: string;
  readonly price: number;
  readonly owner: Types.ObjectId;
}
