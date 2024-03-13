import { Module } from '@nestjs/common';
import { DBServiceAlias } from './shared.models';
import { UsersPostgreDbService } from '../users/users-postgre-db.service';
import { ArtistsPostgreDBService } from '../artists/artists-in-postgre-db.service';
import { AlbumsPostgreDbService } from '../albums/albums-postgre-db.service';
import { TrackPostgreDBService } from '../tracks/tracks-postgre-db.service';
import { FavoritesPostgreDbService } from '../favorites/favorites-postgre-db.service';

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
			useClass: TrackPostgreDBService,
		},
		{
			provide: DBServiceAlias.AlbumsDBService,
			useClass: AlbumsPostgreDbService,
		},
		{
			provide: DBServiceAlias.FavoritesDBService,
			useClass: FavoritesPostgreDbService,
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
