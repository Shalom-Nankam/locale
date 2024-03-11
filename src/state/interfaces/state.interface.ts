import { Document } from "mongoose";

export interface State extends Document {
    readonly name: string;
    readonly capital: string;
    readonly slogan: string;
    readonly land_mass: string;
    readonly state_id: number;
    readonly region_id: number;
    readonly local_government_areas: number;
}