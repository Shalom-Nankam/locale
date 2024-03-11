import * as mongoose from 'mongoose'

export const RegionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    longitude: {
        type: String,
        required: true
    },
    latitude: {
        type: String,
        required: true
    },
    states: {
        type: Number,
        required: true
    },
    region_id: {
        type: Number,
        required: true
    },
})