import { Module } from '@nestjs/common';
import { StateController } from './state.controller';
import { StateService } from './state.service';
import { DatabaseModule } from 'src/database/database.module';
import { stateProviders } from './state.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [StateController],
  providers: [StateService, ...stateProviders],
  exports: [StateService]
})
export class StateModule { }
