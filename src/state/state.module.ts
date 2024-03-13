import { Module } from '@nestjs/common';
import { StateController } from './state.controller';
import { StateService } from './state.service';
import { DatabaseModule } from 'src/database/database.module';
import { stateProviders } from './state.provider';
import { LgaModule } from 'src/lga/lga.module';

@Module({
  imports: [DatabaseModule, LgaModule],
  controllers: [StateController],
  providers: [StateService, ...stateProviders],
  exports: [StateService, ...stateProviders]
})
export class StateModule { }
