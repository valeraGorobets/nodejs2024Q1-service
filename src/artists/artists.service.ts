import { Inject, Injectable } from '@nestjs/common';
import {
	Artist,
	CreateArtistDTO,
	IArtistsPostgreDBService,
	UpdateArtistDTO,
} from './artists.models';
import { DBServiceAlias } from '../shared/shared.models';
import type { Artist as ArtistPrismaType } from '.prisma/client';

@Injectable()
export class ArtistsService {
	constructor(
		@Inject(DBServiceAlias.ArtistsDBService)
		private readonly artistsDBService: IArtistsPostgreDBService,
	) {}

	public getAllArtists(): Promise<Artist[]> {
		return this.artistsDBService
			.getAllArtists()
			.then((artists: ArtistPrismaType[]) =>
				artists.map((artist) => new Artist({ ...artist })),
			);
	}

	public getArtistById(id: string): Promise<Artist | undefined> {
		return this.artistsDBService
			.getArtistById(id)
			.then(
				(artist: ArtistPrismaType | undefined) =>
					artist && new Artist({ ...artist }),
			);
	}

	public createArtist(createArtistDTO: CreateArtistDTO): Promise<Artist> {
		return this.artistsDBService
			.createArtist(createArtistDTO)
			.then((artist: ArtistPrismaType) => new Artist({ ...artist }));
	}

	public updateArtist(
		id: string,
		updateArtistDTO: UpdateArtistDTO,
	): Promise<Artist | undefined> {
		return this.artistsDBService
			.updateArtist(id, updateArtistDTO)
			.then((artist: ArtistPrismaType) => new Artist({ ...artist }))
			.catch(() => undefined);
	}

	public deleteArtist(id: string): Promise<Artist> {
		return this.artistsDBService
			.deleteArtist(id)
			.then((artist: ArtistPrismaType) => new Artist({ ...artist }))
			.catch(() => undefined);
	}
}
