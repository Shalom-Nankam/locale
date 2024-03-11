import mongoose from "mongoose";


export const StateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    capital: {
        type: String,
        required: true
    },
    slogan: {
        type: String,
        required: true
    },
    land_mass: {
        type: String,
        required: true
    },
    state_id: {
        type: Number,
        required: true
    },
    region_id: {
        type: Number,
        required: true,
    },
    local_government_areas: {
        type: String,
        required: true
    },
})