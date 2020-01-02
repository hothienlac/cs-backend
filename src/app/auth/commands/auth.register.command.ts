import { ICommand } from '@nestjs/cqrs';
import { IUserRegistrationInput } from '../../../interface';

export class AuthRegisterCommand implements ICommand {
  static readonly type = '[Auth] Register';

  constructor(public readonly input: IUserRegistrationInput) { }
}
