import { Inject, Injectable } from '@nestjs/common';
import {
	Favorites,
	FavoritesIDs,
	FavoritesResponseState,
	IFavoritesDBService,
} from './favorites.models';
import { DBServiceAlias } from '../shared/shared.models';
import { Artist, IArtistsDBService } from '../artists/artists.models';
import { Album, IAlbumsDBService } from '../albums/albums.models';
import { ITracksDBService, Track } from '../tracks/tracks.models';

@Injectable()
export class FavoritesService {
	constructor(
		@Inject(DBServiceAlias.FavoritesDBService)
		private readonly favoritesDBService: IFavoritesDBService,
		@Inject(DBServiceAlias.ArtistsDBService)
		private readonly artistsDBService: IArtistsDBService,
		@Inject(DBServiceAlias.AlbumsDBService)
		private readonly albumsDBService: IAlbumsDBService,
		@Inject(DBServiceAlias.TracksDBService)
		private readonly tracksDBService: ITracksDBService,
	) {}

	public getFavorites(): Favorites {
		const { artistIDs, albumIDs, trackIDs }: FavoritesIDs =
			this.favoritesDBService.getFavorites();
		return new Favorites({
			artists: artistIDs.map((id: string) =>
				this.artistsDBService.getArtistById(id),
			),
			albums: albumIDs.map((id: string) =>
				this.albumsDBService.getAlbumById(id),
			),
			tracks: trackIDs.map((id: string) =>
				this.tracksDBService.getTrackById(id),
			),
		});
	}

	public addTrackToFavorites(id: string): FavoritesResponseState {
		const entity: Track | undefined = this.tracksDBService.getTrackById(id);
		if (entity) {
			this.favoritesDBService.addTrackToFavorites(id);
			return FavoritesResponseState.Ok;
		} else {
			return FavoritesResponseState.NotExisting;
		}
	}

	public deleteTrackFromFavorites(id: string): FavoritesResponseState {
		if (this.favoritesDBService.isTrackFavorite(id)) {
			this.favoritesDBService.deleteTrackFromFavorites(id);
			return FavoritesResponseState.Ok;
		} else {
			return FavoritesResponseState.NotExisting;
		}
	}

	public addAlbumToFavorites(id: string): FavoritesResponseState {
		const entity: Album | undefined = this.albumsDBService.getAlbumById(id);
		if (entity) {
			this.favoritesDBService.addAlbumToFavorites(id);
			return FavoritesResponseState.Ok;
		} else {
			return FavoritesResponseState.NotExisting;
		}
	}

	public deleteAlbumFromFavorites(id: string): FavoritesResponseState {
		if (this.favoritesDBService.isAlbumFavorite(id)) {
			this.favoritesDBService.deleteAlbumFromFavorites(id);
			return FavoritesResponseState.Ok;
		} else {
			return FavoritesResponseState.NotExisting;
		}
	}

	public addArtistToFavorites(id: string): FavoritesResponseState {
		const entity: Artist | undefined =
			this.artistsDBService.getArtistById(id);
		if (entity) {
			this.favoritesDBService.addArtistToFavorites(id);
			return FavoritesResponseState.Ok;
		} else {
			return FavoritesResponseState.NotExisting;
		}
	}

	public deleteArtistFromFavorites(id: string): FavoritesResponseState {
		if (this.favoritesDBService.isArtistFavorite(id)) {
			this.favoritesDBService.deleteArtistFromFavorites(id);
			return FavoritesResponseState.Ok;
		} else {
			return FavoritesResponseState.NotExisting;
		}
	}
}
