import { Module } from '@nestjs/common';
import { ArtistsController } from './artists.controller';
import { SharedModule } from '../shared/shared.module';
import { ArtistsService } from './artists.service';

@Module({
	imports: [SharedModule],
	controllers: [ArtistsController],
	providers: [ArtistsService],
})
export class ArtistsModule {}
