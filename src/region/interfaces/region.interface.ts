import { Document } from "mongoose";

export interface Region extends Document {
    readonly name: string;
    readonly states: number;
    readonly region_id: number;
    readonly longitude: string;
    readonly latitude: string;
}