import { Inject, Injectable } from '@nestjs/common';
import {
	CreateTrackDTO,
	ITracksDBService2,
	Track,
	UpdateTrackDTO,
} from './tracks.models';
import { DBServiceAlias } from '../shared/shared.models';
import { IFavoritesDBService } from '../favorites/favorites.models';
import type { Track as TrackPrismaType } from '.prisma/client';

@Injectable()
export class TrackService {
	constructor(
		@Inject(DBServiceAlias.TracksDBService)
		private readonly trackDBService: ITracksDBService2,
		@Inject(DBServiceAlias.FavoritesDBService)
		private readonly favoritesDBService: IFavoritesDBService,
	) {}

	public getAllTracks(): Promise<Track[]> {
		return this.trackDBService
			.getAllTracks()
			.then((tracks: TrackPrismaType[]) =>
				tracks.map((track) => new Track({ ...track })),
			);
	}

	public getTrackById(id: string): Promise<Track | undefined> {
		return this.trackDBService
			.getTrackById(id)
			.then(
				(track: TrackPrismaType | undefined) =>
					track && new Track({ ...track }),
			);
	}

	public createTrack(createTrackDTO: CreateTrackDTO): Promise<Track> {
		return this.trackDBService
			.createTrack(createTrackDTO)
			.then((track: TrackPrismaType) => new Track({ ...track }));
	}

	public updateTrack(
		id: string,
		updateTrackDTO: UpdateTrackDTO,
	): Promise<Track | undefined> {
		return this.trackDBService
			.updateTrack(id, updateTrackDTO)
			.then((track: TrackPrismaType) => new Track({ ...track }))
			.catch(() => undefined);
	}

	public deleteTrack(id: string): Promise<Track> {
		this.favoritesDBService.deleteTrackFromFavorites(id);
		return this.trackDBService
			.deleteTrack(id)
			.then((track: TrackPrismaType) => new Track({ ...track }))
			.catch(() => undefined);
	}
}
