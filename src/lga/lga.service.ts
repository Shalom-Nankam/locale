import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateLgaDto } from './dto/create-lga.dto';
import { Lga } from './interfaces/lga.interface';

@Injectable()
export class LgaService {
    constructor(@Inject('LGA_MODEL') private readonly lgaModel: Model<Lga>) { }


    async create(createLga: CreateLgaDto): Promise<Lga> {
        const createdLga = this.lgaModel.create(createLga);
        return createdLga;
    }

    async fetchAll(limit: any, offset: any): Promise<Lga[]> {
        return this.lgaModel.find({}, 'name state_id', { skip: offset, limit: limit, sort: 'state_id' }).exec();
    }

    async fetchStateLgas(state_id: number): Promise<Lga[]> {
        return this.lgaModel.find({ state_id }, 'name state_id').exec();
    }

    async fetchSingleLga(name: string): Promise<Lga> {
        return this.lgaModel.findOne({ name }, 'name state_id').exec();
    }

    async searchItem(section: String, term: String): Promise<Lga[]> {
        const searchField = '' + section;
        return this.lgaModel.find({ '': term }).exec();
    }
}
