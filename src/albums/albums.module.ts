import { Module } from '@nestjs/common';
import { AlbumsController } from './albums.controller';
import { SharedModule } from '../shared/shared.module';
import { AlbumsService } from './albums.service';

@Module({
	imports: [SharedModule],
	controllers: [AlbumsController],
	providers: [AlbumsService],
})
export class AlbumsModule {}
