import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(
        'mongodb://mongo:c9xUltC9IuCDokGIDMpW@containers-us-west-76.railway.app:5686',
      ),
  },
];
