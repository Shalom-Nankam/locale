import { StateSchema } from "./schemas/state.schema";
import { Mongoose } from "mongoose";

export const stateProviders = [
    {
        provide: 'STATE_MODEL',
        useFactory: (mongooose: Mongoose) => mongooose.model('state', StateSchema),
        inject: ['DATABASE_CONNECTION']
    }
]