import * as mongoose from 'mongoose';


export const LgaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    state_id : {
        type: Number,
        required: true
    }
})