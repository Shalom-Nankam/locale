import { Module } from '@nestjs/common';
import { RegionController } from './region.controller';
import { RegionService } from './region.service';
import { DatabaseModule } from 'src/database/database.module';
import { regionProviders } from './region.providers';
import { StateModule } from 'src/state/state.module';

@Module({
  imports: [DatabaseModule, StateModule],
  controllers: [RegionController],
  providers: [RegionService, ...regionProviders],
  exports: [RegionService]
})
export class RegionModule { }
