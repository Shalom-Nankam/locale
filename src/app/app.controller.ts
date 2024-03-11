import { Controller, Get, InternalServerErrorException, Query, UseGuards } from '@nestjs/common';
import { AuthGuardGuard } from 'src/auth-guard/auth-guard.guard';
import { LgaService } from 'src/lga/lga.service';
import { RegionService } from 'src/region/region.service';
import { StateService } from 'src/state/state.service';


@Controller('/')
@UseGuards(AuthGuardGuard)
export class AppController {
    constructor(private lgaService: LgaService, private regionService: RegionService, private stateService: StateService) { }

    @Get('all')
    async retrieveAllData(@Query() query: any) {
        const { limit, offset } = query
        try {
            const [allRegions, allStates, allLgas] = await Promise.all([
                await this.regionService.fetchRegions(),
                await this.stateService.fetchAllStates(),
                await this.lgaService.fetchAll(limit, offset)
            ])

            return {
                success: true,
                message: 'All data fetched successfully.',
                data: {
                    regions: allRegions,
                    states: allStates,
                    lgas: allLgas
                }
            }
        } catch (error) {
            throw new InternalServerErrorException({
                success: false,
                message: 'Request could not be processed, try again later.',
                data: null
            })
        }
    }

    @Get('search')
    async search(@Query() query: any) {
        const { term, category, key } = query
        let searchData = null;
        try {
            switch (category) {
                case 'region':
                    console.log('=====================> got in here 1');
                    break;
                case 'state':
                    console.log('=====================> got in here 2');

                    break;
                default:
                    console.log('=====================> got in here 3');

            }
            // const allRegions = await this.regionService.fetchRegions()
            // const allStates = await this.stateService.fetchAllStates();
            // const allLgas = await this.lgaService.fetchAll(limit, offset);
            return {
                success: true,
                message: 'All data fetched successfully.',
                data: searchData
            }
        } catch (error) {
            throw new InternalServerErrorException({
                success: false,
                message: 'Request could not be processed, try again later.',
                data: null
            })
        }
    }

}
