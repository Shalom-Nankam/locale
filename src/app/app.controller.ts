import { Controller, Get, InternalServerErrorException, Query, UnprocessableEntityException, UseGuards } from '@nestjs/common';
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
        const { name, category } = query
        let searchData = null;
        try {
            switch (category) {
                case 'region':
                    searchData = await this.regionService.searchRegion(name);
                    break;
                case 'state':
                    searchData = await this.stateService.searchState(name);
                    break;
                case 'lga':
                    searchData = await this.lgaService.searchLga(name)
                    break;
                default:
                    throw new UnprocessableEntityException()
            }
            return {
                success: true,
                message: 'All data fetched successfully.',
                data: searchData
            }
        } catch (error) {
            console.log({ error })
            throw new InternalServerErrorException({
                success: false,
                message: 'Request could not be processed, try again later.',
                data: null
            })
        }
    }

}
