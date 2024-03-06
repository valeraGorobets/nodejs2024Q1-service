import { Module } from '@nestjs/common';
import { ArtistsInMemoryDBService } from '../artists/artists-in-memory-db.service';
import { DBServiceAlias } from './shared.models';
import { UsersInMemoryDBService } from '../users/users-in-memory-db.service';
import { TrackInMemoryDBService } from '../tracks/tracks-in-memory-db.service';
import { AlbumsInMemoryDbService } from '../albums/albums-in-memory-db.service';
import { FavoritesInMemoryDbService } from '../favorites/favorites-in-memory-db.service';

@Module({
	providers: [
		{
			provide: DBServiceAlias.ArtistsDBService,
			useClass: ArtistsInMemoryDBService,
		},
		{
			provide: DBServiceAlias.UsersDBService,
			useClass: UsersInMemoryDBService,
		},
		{
			provide: DBServiceAlias.TracksDBService,
			useClass: TrackInMemoryDBService,
		},
		{
			provide: DBServiceAlias.AlbumsDBService,
			useClass: AlbumsInMemoryDbService,
		},
		{
			provide: DBServiceAlias.FavoritesDBService,
			useClass: FavoritesInMemoryDbService,
		},
	],
	exports: [
		DBServiceAlias.ArtistsDBService,
		DBServiceAlias.UsersDBService,
		DBServiceAlias.TracksDBService,
		DBServiceAlias.AlbumsDBService,
		DBServiceAlias.FavoritesDBService,
	],
})
export class SharedModule {}
