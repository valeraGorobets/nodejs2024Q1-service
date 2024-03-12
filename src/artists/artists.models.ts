import { v4 as uuidv4 } from 'uuid';
import { IsBoolean, IsDefined, IsOptional, IsString } from 'class-validator';
import type { Artist as ArtistPrismaType } from '@prisma/client';

export class CreateArtistDTO {
	@IsDefined()
	@IsString()
	public name: string;

	@IsDefined()
	@IsBoolean()
	public grammy: boolean;

	constructor(createArtistDTO: Partial<CreateArtistDTO>) {
		Object.assign(this, createArtistDTO);
	}
}

export class UpdateArtistDTO {
	@IsOptional()
	@IsString()
	public name: string;

	@IsOptional()
	@IsBoolean()
	public grammy: boolean;

	constructor(updateArtistDTO: Partial<UpdateArtistDTO>) {
		Object.assign(this, updateArtistDTO);
	}
}

export class Artist {
	public id: string = uuidv4();
	public name: string;
	public grammy: boolean;

	constructor(artist: Partial<Artist>) {
		Object.assign(this, artist);
	}
}

export interface IArtistsDBService {
	getAllArtists(): Artist[];

	getArtistById(id: string): Artist | undefined;

	createArtist(newArtist: Artist): Artist;

	updateArtist(
		id: string,
		updateArtistDTO: UpdateArtistDTO,
	): Artist | undefined;

	deleteArtist(id: string): boolean;
}

export interface IArtistsDBService2 {
	getAllArtists(): Promise<ArtistPrismaType[]>;

	getArtistById(id: string): Promise<ArtistPrismaType | undefined>;

	createArtist(createArtistDTO: CreateArtistDTO): Promise<ArtistPrismaType>;

	updateArtist(
		id: string,
		updateArtistDTO: UpdateArtistDTO,
	): Promise<ArtistPrismaType>;

	deleteArtist(id: string): Promise<ArtistPrismaType>;
}
