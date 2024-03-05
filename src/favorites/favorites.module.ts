import { Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { SharedModule } from '../shared/shared.module';
import { FavoritesService } from './favorites.service';

@Module({
	imports: [ SharedModule ],
	controllers: [
		FavoritesController,
	],
	providers: [
		FavoritesService,
	]
})
export class FavoritesModule {
}
