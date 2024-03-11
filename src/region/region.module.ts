import { Module } from '@nestjs/common';
import { RegionController } from './region.controller';
import { RegionService } from './region.service';
import { DatabaseModule } from 'src/database/database.module';
import { regionProviders } from './region.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [RegionController],
  providers: [RegionService, ...regionProviders],
  exports: [RegionService]
})
export class RegionModule { }
