import { Inject, Injectable } from '@nestjs/common';
import {
	Favorites,
	FavoritesResponseState,
	IFavoritesPostgreDBService,
} from './favorites.models';
import { DBServiceAlias } from '../shared/shared.models';
import { Artist } from '../artists/artists.models';
import { Album } from '../albums/albums.models';
import { Track } from '../tracks/tracks.models';

@Injectable()
export class FavoritesService {
	constructor(
		@Inject(DBServiceAlias.FavoritesDBService)
		private readonly favoritesDBService: IFavoritesPostgreDBService,
	) {}

	public getFavorites(): Promise<Favorites> {
		return this.favoritesDBService
			.getFavorites()
			.then((favorites: Favorites) => {
				return {
					artists: favorites.artists.map(
						(artist) => new Artist({ ...artist }),
					),
					albums: favorites.albums.map(
						(album) => new Album({ ...album }),
					),
					tracks: favorites.tracks.map(
						(track) => new Track({ ...track }),
					),
				};
			});
	}

	public async addTrackToFavorites(
		id: string,
	): Promise<FavoritesResponseState> {
		try {
			await this.favoritesDBService.addTrackToFavorites(id);
			return FavoritesResponseState.Ok;
		} catch {
			return FavoritesResponseState.NotExisting;
		}
	}

	public async deleteTrackFromFavorites(
		id: string,
	): Promise<FavoritesResponseState> {
		try {
			await this.favoritesDBService.deleteTrackFromFavorites(id);
			return FavoritesResponseState.Ok;
		} catch {
			return FavoritesResponseState.NotExisting;
		}
	}

	public async addAlbumToFavorites(
		id: string,
	): Promise<FavoritesResponseState> {
		try {
			await this.favoritesDBService.addAlbumToFavorites(id);
			return FavoritesResponseState.Ok;
		} catch {
			return FavoritesResponseState.NotExisting;
		}
	}

	public async deleteAlbumFromFavorites(
		id: string,
	): Promise<FavoritesResponseState> {
		try {
			await this.favoritesDBService.deleteAlbumFromFavorites(id);
			return FavoritesResponseState.Ok;
		} catch {
			return FavoritesResponseState.NotExisting;
		}
	}

	public async addArtistToFavorites(
		id: string,
	): Promise<FavoritesResponseState> {
		try {
			await this.favoritesDBService.addArtistToFavorites(id);
			return FavoritesResponseState.Ok;
		} catch {
			return FavoritesResponseState.NotExisting;
		}
	}

	public async deleteArtistFromFavorites(
		id: string,
	): Promise<FavoritesResponseState> {
		try {
			await this.favoritesDBService.deleteArtistFromFavorites(id);
			return FavoritesResponseState.Ok;
		} catch {
			return FavoritesResponseState.NotExisting;
		}
	}
}
