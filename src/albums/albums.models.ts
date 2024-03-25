import { v4 as uuidv4 } from 'uuid';
import { IsDefined, IsInt, IsOptional, IsString } from 'class-validator';
import type { Album as AlbumPrismaType } from '@prisma/client';

export class CreateAlbumDTO {
	@IsDefined()
	@IsString()
	public name: string;

	@IsDefined()
	@IsInt()
	public year: number;

	@IsOptional()
	@IsString()
	public artistId: string;

	constructor(createAlbumDTO: Partial<CreateAlbumDTO>) {
		Object.assign(this, createAlbumDTO);
	}
}

export class UpdateAlbumDTO {
	@IsOptional()
	@IsString()
	public name: string;

	@IsOptional()
	@IsInt()
	public year: number;

	@IsOptional()
	@IsString()
	public artistId: string;

	constructor(updateAlbumDTO: Partial<UpdateAlbumDTO>) {
		Object.assign(this, updateAlbumDTO);
	}
}

export class Album {
	public id: string;
	public name: string;
	public year: number;
	public artistId: string | null;

	constructor(album: Partial<Album>) {
		this.id = album.id || uuidv4();
		this.name = album.name || undefined;
		this.year = album.year || undefined;
		this.artistId = album.artistId || null;
	}
}

export interface IAlbumsDBService {
	getAllAlbums(): Album[];

	getAlbumById(id: string): Album | undefined;

	createAlbum(newAlbum: Album): Album;

	updateAlbum(id: string, updateAlbumDTO: UpdateAlbumDTO): Album | undefined;

	deleteAlbum(id: string): boolean;

	handleArtistDelete(artistId: string): void;
}

export interface IAlbumsPostgreDBService {
	getAllAlbums(): Promise<AlbumPrismaType[]>;

	getAlbumById(id: string): Promise<AlbumPrismaType | undefined>;

	createAlbum(createAlbumDTO: CreateAlbumDTO): Promise<AlbumPrismaType>;

	updateAlbum(
		id: string,
		updateAlbumDTO: UpdateAlbumDTO,
	): Promise<AlbumPrismaType>;

	deleteAlbum(id: string): Promise<AlbumPrismaType>;
}
