import { v4 as uuidv4 } from 'uuid';
import { IsDefined, IsInt, IsOptional, IsString } from 'class-validator';

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
	public id: string = uuidv4();
	public name: string;
	public year: number;
	public artistId: string | null;

	constructor(album: Partial<Album>) {
		Object.assign(this, album);
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
