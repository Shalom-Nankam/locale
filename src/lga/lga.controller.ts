import { Controller, Get, Post, Body, InternalServerErrorException, Param, UseGuards, NotFoundException, Query } from '@nestjs/common';
import { CreateLgaDto } from './dto/create-lga.dto';
import { LgaService } from './lga.service';
import { AuthGuardGuard } from 'src/auth-guard/auth-guard.guard';
@Controller('lgas')
@UseGuards(AuthGuardGuard)
export class LgaController {
    constructor(private readonly lgaService: LgaService) { }

    @Post()
    async create(@Body() createLga: CreateLgaDto) {
        try {
            const newLga = await this.lgaService.create(createLga);
            return {
                success: true,
                message: 'LGA created successfully',
                data: newLga
            };
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
    async retrieveAll(@Query() query: any) {
        const { limit, offset } = query;
        try {
            const lgas = await this.lgaService.fetchAll(limit, offset);
            return {
                success: true,
                message: 'LGAs retrieved successfully',
                data: lgas
            };
        } catch (error) {
            throw new InternalServerErrorException({
                success: false,
                message: 'An internal server error occured.',
                data: null
            })
        }

    }

    @Get('/state/:id')
    async fetchStateLgas(@Param('id') id: number) {
        try {
            const lgas = await this.lgaService.fetchStateLgas(id);
            return {
                success: true,
                message: 'LGAs retrieved successfully',
                data: lgas
            };
        } catch (error) {
            throw new InternalServerErrorException({
                success: false,
                message: 'An internal server error occured.',
                data: null
            })
        }

    }


    @Get(':name')
    async fetchSingle(@Param('name') name: string) {
        try {
            const lga = await this.lgaService.fetchSingleLga(name);
            if (!lga) {
                throw new NotFoundException({
                    success: false,
                    message: 'LGA with given name not found',
                    data: null
                })
            }
            return {
                success: true,
                message: 'LGA retrieved successfully',
                data: lga
            };
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException({
                success: false,
                message: 'An internal server error occured.',
                data: null
            })
        }

    }


}
