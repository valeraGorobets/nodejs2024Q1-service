import { Inject, Injectable } from '@nestjs/common';
import {
	Album,
	CreateAlbumDTO,
	IAlbumsDBService2,
	UpdateAlbumDTO,
} from './albums.models';
import { DBServiceAlias } from '../shared/shared.models';
import { IFavoritesDBService } from '../favorites/favorites.models';
import { ITracksDBService } from '../tracks/tracks.models';
import type { Album as AlbumPrismaType } from '@prisma/client';

@Injectable()
export class AlbumsService {
	constructor(
		@Inject(DBServiceAlias.AlbumsDBService)
		private readonly albumsDBService: IAlbumsDBService2,
		@Inject(DBServiceAlias.FavoritesDBService)
		private readonly favoritesDBService: IFavoritesDBService,
		@Inject(DBServiceAlias.TracksDBService)
		private readonly tracksDBService: ITracksDBService,
	) {}

	public getAllAlbums(): Promise<Album[]> {
		return this.albumsDBService
			.getAllAlbums()
			.then((albums: AlbumPrismaType[]) =>
				albums.map((album) => new Album({ ...album })),
			);
	}

	public getAlbumById(id: string): Promise<Album | undefined> {
		return this.albumsDBService
			.getAlbumById(id)
			.then(
				(album: AlbumPrismaType | undefined) =>
					album && new Album({ ...album }),
			);
	}

	public createAlbum(createAlbumDTO: CreateAlbumDTO): Promise<Album> {
		return this.albumsDBService
			.createAlbum(createAlbumDTO)
			.then((album: AlbumPrismaType) => new Album({ ...album }));
	}

	public updateAlbum(
		id: string,
		updateAlbumDTO: UpdateAlbumDTO,
	): Promise<Album | undefined> {
		return this.albumsDBService
			.updateAlbum(id, updateAlbumDTO)
			.then((album: AlbumPrismaType) => new Album({ ...album }))
			.catch(() => undefined);
	}

	public deleteAlbum(id: string): Promise<Album> {
		this.favoritesDBService.deleteAlbumFromFavorites(id);
		this.tracksDBService.handleAlbumDelete(id);
		return this.albumsDBService
			.deleteAlbum(id)
			.then((album: AlbumPrismaType) => new Album({ ...album }))
			.catch(() => undefined);
	}
}
