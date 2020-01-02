
import * as mongoose from 'mongoose';

import { config } from '../../config/config';

export const DatabaseProvider = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(config.database.connection),
  },
];
