import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Region } from './interfaces/region.interface';
import { RegionDto } from './dto/region.dto';

@Injectable()
export class RegionService {
    constructor(@Inject('REGION_MODEL') private readonly region: Model<Region>) { }

    async createRegion(region: RegionDto): Promise<Region> {
        return this.region.create(region);
    }

    async fetchRegions(): Promise<Region[]> {
        return this.region.find({}, '-_id -__v', { sort: 'region_id' })
    }

    async fetchSingleRegion(region_id: number): Promise<Region> {
        return this.region.findOne({ region_id }, '-_id -__v')
    }
}
