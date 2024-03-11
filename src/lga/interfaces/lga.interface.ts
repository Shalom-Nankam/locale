import { Document } from "mongoose";

export interface Lga extends Document{
    readonly name: string;
    readonly state_id: number;
}