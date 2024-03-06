import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ArtistsModule } from './artists/artists.module';
import { UsersModule } from './users/users.module';
import { TracksModule } from './tracks/tracks.module';
import { AlbumsModule } from './albums/albums.module';
import { FavoritesModule } from './favorites/favorites.module';

@Module({
	imports: [
		ArtistsModule,
		UsersModule,
		TracksModule,
		AlbumsModule,
		FavoritesModule,
	],
	controllers: [AppController],
	providers: [],
})
export class AppModule {}
