import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { LgaController } from './lga.controller';
import { LgaService } from './lga.service';
import { lgaProviders } from './lga.providers';

@Module({
    imports: [DatabaseModule],
    controllers: [LgaController],
    providers: [LgaService, ...lgaProviders],
    exports: [LgaService]
})
export class LgaModule { }
