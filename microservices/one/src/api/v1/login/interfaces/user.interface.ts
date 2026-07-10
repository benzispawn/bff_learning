import { Document, Types } from 'mongoose';

export interface UserDocument extends Document {
  readonly _id: Types.ObjectId;
  username: string;
  hashedPassword: string;
}
