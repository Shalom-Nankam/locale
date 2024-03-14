import { Body, Controller, Get, InternalServerErrorException, NotFoundException, Param, Post, UseGuards } from '@nestjs/common';
import { StateService } from './state.service';
import { AuthGuardGuard } from 'src/auth-guard/auth-guard.guard';
import { StateDto } from './dto/state.dto';

@Controller('states')
// @UseGuards(AuthGuardGuard)
export class StateController {
    constructor(private readonly stateService: StateService) { }

    @Post()
    async create(@Body() newState: StateDto) {
        try {
            const state = await this.stateService.createState(newState);
            return {
                success: true,
                message: 'State created successfully',
                data: state
            }
        } catch (error) {
            console.log({ error })
            throw new InternalServerErrorException({
                success: false,
                message: 'An error occured, try again later.',
                data: null
            })
        }
    }

    @Get()
    async fetchAllStates() {
        try {
            const states = await this.stateService.fetchAllStates();
            return {
                success: true,
                message: 'States retrieved successfully',
                data: states
            }
        } catch (error) {
            throw new InternalServerErrorException({
                success: false,
                message: 'An error occured, try again later.',
                data: null
            })
        }
    }

    @Get('region/:id')
    async regionStates(@Param('id') region_id: number) {
        try {
            const states = await this.stateService.fetchStatesInRegion(region_id);
            return {
                success: true,
                message: 'States retrieved successfully',
                data: states
            }
        } catch (error) {
            console.log({ error })
            throw new InternalServerErrorException({
                success: false,
                message: 'An error occured, try again later.',
                data: null
            })
        }
    }

    @Get(':id')
    async fetchSingleState(@Param('id') state_id: number) {
        try {
            const state = await this.stateService.fetchSingleState(state_id);
            if (!state) {
                throw new NotFoundException({
                    success: false,
                    message: 'State with id not found',
                    data: null
                })
            }
            return {
                success: true,
                message: 'State fetched successfully',
                data: state
            }
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error
            }
            throw new InternalServerErrorException({
                success: false,
                message: 'An error occured, try again later.',
                data: null
            })
        }
    }





}
