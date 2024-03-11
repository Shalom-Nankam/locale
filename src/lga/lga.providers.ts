import { Mongoose } from "mongoose";
import { LgaSchema } from "./schemas/lga.schema";

export const lgaProviders = [
    {
        provide: 'LGA_MODEL',
        useFactory: (mongoose: Mongoose) => mongoose.model('Lga', LgaSchema),
        inject: ['DATABASE_CONNECTION'],
    }
]