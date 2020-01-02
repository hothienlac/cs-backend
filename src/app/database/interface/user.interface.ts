import { Document } from 'mongoose';
import { IUser as User } from '../../../interface';

export interface IUser extends Document, User {}
