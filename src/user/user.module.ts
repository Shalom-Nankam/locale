import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { userProviders } from './user.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  providers: [UserService, ...userProviders],
  imports: [DatabaseModule],
  exports: [UserService]
})
export class UserModule {}
