import * as mongoose from 'mongoose';
import { IUserRegistrationInput } from 'src/interface';

export const UserLoginSchema = new mongoose.Schema({
  email: String,
  hash: String,
});
