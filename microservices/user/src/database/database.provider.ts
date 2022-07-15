import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(
        'mongodb://mongo:UjElc9HNGJN3yVpPRWLG@containers-us-west-79.railway.app:7816',
      ),
  },
];
