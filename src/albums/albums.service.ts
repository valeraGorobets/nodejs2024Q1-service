import { Inject, Injectable } from '@nestjs/common';
import {
	Album,
	CreateAlbumDTO,
	IAlbumsDBService,
	UpdateAlbumDTO,
} from './albums.models';
import { DBServiceAlias } from '../shared/shared.models';
import { IFavoritesDBService } from '../favorites/favorites.models';
import { ITracksDBService } from '../tracks/tracks.models';

@Injectable()
export class AlbumsService {
	constructor(
		@Inject(DBServiceAlias.AlbumsDBService)
		private readonly albumsDBService: IAlbumsDBService,
		@Inject(DBServiceAlias.FavoritesDBService)
		private readonly favoritesDBService: IFavoritesDBService,
		@Inject(DBServiceAlias.TracksDBService)
		private readonly tracksDBService: ITracksDBService,
	) {}

	public getAllAlbums(): Album[] {
		return this.albumsDBService.getAllAlbums();
	}

	public getAlbumById(id: string): Album | undefined {
		return this.albumsDBService.getAlbumById(id);
	}

	public createAlbum(createAlbumDTO: CreateAlbumDTO): Album {
		const newAlbum: Album = new Album(createAlbumDTO);
		return this.albumsDBService.createAlbum(newAlbum);
	}

	public updateAlbum(
		id: string,
		updateAlbumDTO: UpdateAlbumDTO,
	): Album | undefined {
		return this.albumsDBService.updateAlbum(id, updateAlbumDTO);
	}

	public deleteAlbum(id: string): boolean {
		this.favoritesDBService.deleteAlbumFromFavorites(id);
		this.tracksDBService.handleAlbumDelete(id);
		return this.albumsDBService.deleteAlbum(id);
	}
}
