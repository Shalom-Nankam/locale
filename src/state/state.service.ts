import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { State } from './interfaces/state.interface';
import { StateDto } from './dto/state.dto';

@Injectable()
export class StateService {
    constructor(@Inject('STATE_MODEL') private readonly stateModel: Model<State>) { }

    async fetchAllStates(): Promise<State[]> {
        return this.stateModel.find({}, '-_id, -__v', { sort: 'state_id' })
    }

    async fetchStatesInRegion(region_id: number): Promise<State[]> {
        return this.stateModel.find({ region_id }, '-_id -__v', { sort: 'name' })
    }

    async createState(state: StateDto): Promise<State> {
        return this.stateModel.create(state);
    }

    async fetchSingleState(id: number): Promise<State> {
        const state = this.stateModel.findOne({ state_id: id }, '-_id -__v');
        return state;
    }
}
