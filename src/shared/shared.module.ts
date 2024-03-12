import { Module } from '@nestjs/common';
import { DBServiceAlias } from './shared.models';
import { TrackInMemoryDBService } from '../tracks/tracks-in-memory-db.service';
import { AlbumsInMemoryDbService } from '../albums/albums-in-memory-db.service';
import { FavoritesInMemoryDbService } from '../favorites/favorites-in-memory-db.service';
import { UsersPostgreDbService } from '../users/users-postgre-db.service';
import { ArtistsPostgreDBService } from '../artists/artists-in-postgre-db.service';

@Module({
	providers: [
		{
			provide: DBServiceAlias.ArtistsDBService,
			useClass: ArtistsPostgreDBService,
		},
		{
			provide: DBServiceAlias.UsersDBService,
			useClass: UsersPostgreDbService,
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
