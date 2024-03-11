import { Mongoose } from "mongoose";
import { RegionSchema } from "./schemas/region.schema";

export const regionProviders = [
    {
        provide: 'REGION_MODEL',
        useFactory: (mongoose: Mongoose) => mongoose.model('region', RegionSchema),
        inject: ['DATABASE_CONNECTION']
    }
]