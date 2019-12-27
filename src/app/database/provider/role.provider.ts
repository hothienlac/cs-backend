import { Connection } from 'mongoose';
import { RoleSchema } from '../';

export const RoleProvider = [
  {
    provide: 'ROLE_MODEL',
    useFactory: (connection: Connection) => connection.model('Role', RoleSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
