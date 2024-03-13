import { Inject, Injectable } from '@nestjs/common';
import {
	Album,
	CreateAlbumDTO,
	IAlbumsPostgreDBService,
	UpdateAlbumDTO,
} from './albums.models';
import { DBServiceAlias } from '../shared/shared.models';
import type { Album as AlbumPrismaType } from '@prisma/client';

@Injectable()
export class AlbumsService {
	constructor(
		@Inject(DBServiceAlias.AlbumsDBService)
		private readonly albumsDBService: IAlbumsPostgreDBService,
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
		return this.albumsDBService
			.deleteAlbum(id)
			.then((album: AlbumPrismaType) => new Album({ ...album }))
			.catch(() => undefined);
	}
}
