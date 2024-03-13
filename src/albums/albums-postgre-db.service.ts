import { Injectable } from '@nestjs/common';
import { Album as AlbumPrismaType, Prisma, PrismaClient } from '@prisma/client';
import {
	CreateAlbumDTO,
	IAlbumsPostgreDBService,
	UpdateAlbumDTO,
} from './albums.models';

@Injectable()
export class AlbumsPostgreDbService
	extends PrismaClient
	implements IAlbumsPostgreDBService
{
	constructor() {
		super();
	}

	public getAllAlbums(): Promise<AlbumPrismaType[]> {
		return this.album.findMany();
	}

	public getAlbumById(id: string): Promise<AlbumPrismaType | undefined> {
		return this.album.findUnique({
			where: {
				id,
			},
		});
	}

	public createAlbum(
		createAlbumDTO: CreateAlbumDTO,
	): Promise<AlbumPrismaType> {
		return this.album.create({
			data: {
				...(createAlbumDTO as unknown as Prisma.AlbumCreateInput),
			},
		});
	}

	public updateAlbum(
		id: string,
		updateAlbumDTO: UpdateAlbumDTO,
	): Promise<AlbumPrismaType> {
		return this.album.update({
			where: {
				id,
			},
			data: {
				...updateAlbumDTO,
			},
		});
	}

	public deleteAlbum(id: string): Promise<AlbumPrismaType> {
		return this.album.delete({
			where: {
				id,
			},
		});
	}
}
