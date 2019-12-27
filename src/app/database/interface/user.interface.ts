import { Document } from 'mongoose';
import { IUser as User } from 'src/interface';

export interface IUser extends Document, User {}
