import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { IUser } from '../database/interface/user.interface';
import { CrudService } from '../core/crud';

@Injectable()
export class UserService extends CrudService<IUser> {

  constructor(
    @Inject('USER_MODEL')
    private readonly userModel: Model<IUser>,
  ) {
    super(userModel);
  }

  async getUserByEmail(email: string): Promise<IUser> {
    // tslint:disable-next-line: object-literal-shorthand
    const user = await this.findOne({email: email});
    return user;
  }

  async getUserIdByEmail(email: string): Promise<string> {
    const user = await this.getUserByEmail(email);
    const userId = user.id;
    return userId;
  }

  async checkIfExistsEmail(email: string): Promise<boolean> {
    // tslint:disable-next-line: object-literal-shorthand
    return (await this.count({email: email})) > 0;
  }

  async checkIfIDExists(id: string): Promise<boolean> {
    // tslint:disable-next-line: object-literal-shorthand
    return (await this.count({ _id: id })) > 0;
  }

  async createUser(user: IUser): Promise<IUser> {
    return await this.create(user);
  }

  async changePassword(id: string, hash: string) {
    // tslint:disable-next-line: object-literal-shorthand
    return await this.update({_id: id}, {hash: hash});
  }

}
