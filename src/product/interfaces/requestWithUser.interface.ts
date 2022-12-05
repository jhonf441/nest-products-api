import { Request } from 'express';
import { UserDocument } from '../../user/schema/user.schema'

interface RequestWithUser extends Request {
  user: UserDocument;
}

export default RequestWithUser;
