import { Injectable } from '@nestjs/common';
import {
	CreateArtistDTO,
	IArtistsDBService2,
	UpdateArtistDTO,
} from './artists.models';
import {
	Artist as ArtistPrismaType,
	Prisma,
	PrismaClient,
} from '@prisma/client';

@Injectable()
export class ArtistsPostgreDBService
	extends PrismaClient
	implements IArtistsDBService2
{
	constructor() {
		super();
	}

	public getAllArtists(): Promise<ArtistPrismaType[]> {
		return this.artist.findMany();
	}

	public getArtistById(id: string): Promise<ArtistPrismaType | undefined> {
		return this.artist.findUnique({
			where: {
				id,
			},
		});
	}

	public createArtist(
		createArtistDTO: CreateArtistDTO,
	): Promise<ArtistPrismaType> {
		return this.artist.create({
			data: {
				...(createArtistDTO as unknown as Prisma.ArtistCreateInput),
			},
		});
	}

	public updateArtist(
		id: string,
		updateArtistDTO: UpdateArtistDTO,
	): Promise<ArtistPrismaType> {
		return this.artist.update({
			where: {
				id,
			},
			data: {
				...updateArtistDTO,
			},
		});
	}

	public deleteArtist(id: string): Promise<ArtistPrismaType> {
		return this.artist.delete({
			where: {
				id,
			},
		});
	}
}
