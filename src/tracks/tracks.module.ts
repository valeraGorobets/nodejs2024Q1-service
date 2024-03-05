import { Module } from '@nestjs/common';
import { TracksController } from './tracks.controller';
import { SharedModule } from '../shared/shared.module';
import { TrackService } from './tracks.service';

@Module({
	imports: [ SharedModule ],
	controllers: [
		TracksController,
	],
	providers: [
		TrackService,
	]
})
export class TracksModule {
}
