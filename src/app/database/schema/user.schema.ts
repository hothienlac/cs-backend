import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  email: String,
  userName: String,
  hash: String,

  firstName: String,
  lastName: String,
  school: String,
  major: String,
  degree: String,
  username: String,
  role: String,
  roleId: String,
  imageUrl: String,

  createdAt: Date,
  updatedAt: Date,
});
