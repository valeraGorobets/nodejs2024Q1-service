import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { SharedModule } from '../shared/shared.module';
import { UsersService } from './users.service';

@Module({
	imports: [SharedModule],
	controllers: [UsersController],
	providers: [UsersService],
})
export class UsersModule {}
