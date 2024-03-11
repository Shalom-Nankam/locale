import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';


export const UserSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    apiKey: {
        type: String,
        required: true
    }
})

UserSchema.pre('save', async function (next) {
    const passwordHash = await bcrypt.hash(this.password, 12);
    this.password = passwordHash;
    next()
});