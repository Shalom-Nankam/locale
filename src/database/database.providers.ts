import * as mongoose from 'mongoose';

export const databaseProviders =  [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: async (): Promise<typeof mongoose> => {
            var dbConnection = await mongoose.connect(process.env.MONGO_DB_URL);
            console.log('Mongo DB connected successfully..')
            return dbConnection;
        },
    }
]