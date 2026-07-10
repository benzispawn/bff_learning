import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  username: { type: String, unique: true },
  hashedPassword: String,
});
