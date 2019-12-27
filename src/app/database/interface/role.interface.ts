import { Document } from 'mongoose';
import { IRole as Role } from 'src/interface';

export interface IRole extends Document, Role {}
