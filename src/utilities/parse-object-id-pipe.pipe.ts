import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import mongoose from 'mongoose';

@Injectable()
export class ParseObjectIdPipe
  implements PipeTransform<any, mongoose.Types.ObjectId>
{
  transform(value: any): mongoose.Types.ObjectId {
    const isValidObjectId: boolean = mongoose.isObjectIdOrHexString(value);
    if (!isValidObjectId) throw new BadRequestException('Invalid ObjecId');

    return value;
  }
}
