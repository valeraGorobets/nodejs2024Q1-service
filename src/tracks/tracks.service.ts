import { Inject, Injectable } from '@nestjs/common';
import { CreateTrackDTO, ITracksDBService, Track, UpdateTrackDTO } from './tracks.models';
import { DBServiceAlias } from '../shared/shared.models';
import { IFavoritesDBService } from '../favorites/favorites.models';

@Injectable()
export class TrackService {
	constructor(
		@Inject(DBServiceAlias.TracksDBService) private readonly trackDBService: ITracksDBService,
		@Inject(DBServiceAlias.FavoritesDBService) private readonly favoritesDBService: IFavoritesDBService,
	) {
	}

	public getAllTracks(): Track[] {
		return this.trackDBService.getAllTracks();
	}

	public getTrackById(id: string): Track | undefined {
		return this.trackDBService.getTrackById(id);
	}

	public createTrack(createTrackDTO: CreateTrackDTO): Track {
		const newTrack: Track = new Track(createTrackDTO);
		return this.trackDBService.createTrack(newTrack);
	}

	public updateTrack(id: string, updateTrackDTO: UpdateTrackDTO): Track | undefined {
		return this.trackDBService.updateTrack(id, updateTrackDTO);
	}

	public deleteTrack(id: string): boolean {
		this.favoritesDBService.deleteTrackFromFavorites(id);
		return this.trackDBService.deleteTrack(id);
	}

	protected typeObject(object: Object): Track {
		return new Track(object);
	}
}
