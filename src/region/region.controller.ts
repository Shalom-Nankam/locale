import { Controller, UseGuards, Post, Body, InternalServerErrorException, Get, Param, NotFoundException } from '@nestjs/common';
import { RegionService } from './region.service';
import { AuthGuardGuard } from 'src/auth-guard/auth-guard.guard';
import { RegionDto } from './dto/region.dto';

@Controller('regions')
@UseGuards(AuthGuardGuard)
export class RegionController {
    constructor(private readonly regionService: RegionService) { }

    @Post()
    async createRegion(@Body() region: RegionDto) {
        console.log({ region })
        try {
            const createdRegion = await this.regionService.createRegion(region);
            console.log({ createdRegion })
            return {
                success: true,
                message: 'Region created successfully.',
                data: createdRegion
            }
        } catch (error) {
            console.log({ error })
            throw new InternalServerErrorException({
                success: false,
                message: 'An internal server error occured.',
                data: null
            })
        }
    }

    @Get()
    async retrieveRegions() {
        try {
            const regions = await this.regionService.fetchRegions()
            return {
                success: true,
                message: 'Regions retrieved successfully',
                data: regions
            }
        } catch (error) {
            throw new InternalServerErrorException({
                success: false,
                message: 'An internal server error occured.',
                data: null
            })
        }
    }

    @Get(':id')
    async retrieveSingleRegion(@Param("id") id: number) {
        try {
            const region = await this.regionService.fetchSingleRegion(id);
            if (!region) {
                throw new NotFoundException({
                    success: false,
                    message: 'Region with this id was not found.',
                    data: null
                })
            }
            return {
                success: true,
                message: 'Region retrieved successfully',
                data: region
            }
        } catch (error) {
            throw new InternalServerErrorException({
                success: false,
                message: 'An internal server error occured.',
                data: null
            })
        }
    }
}
