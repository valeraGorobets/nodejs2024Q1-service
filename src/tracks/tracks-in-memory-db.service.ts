import { Injectable } from '@nestjs/common';
import { ITracksDBService, Track, UpdateTrackDTO } from './tracks.models';
import { InMemoryDBService } from '../common/in-memory-db.service';

@Injectable()
export class TrackInMemoryDBService
	extends InMemoryDBService<Track>
	implements ITracksDBService
{
	constructor() {
		super([
			new Track({
				id: '099e46eb-041b-4112-8af8-977e2cb6e962',
				name: 'Track 1',
				artistId: 'artist 1 id',
				albumId: 'album 1 id',
				duration: 100500,
			}),
			new Track({
				id: 'd8676729-7367-4a8b-8866-bacebed47a0c',
				name: 'Track#1 ARTIST Album#1',
				artistId: 'e338dd05-f511-46a6-9e44-4ef8b28a8aa6',
				albumId: '099e46eb-041b-4112-8af8-977e2cb6e962',
				duration: 300,
			}),
			new Track({
				id: 'cc66c802-3847-439c-9a42-e1ccd9e26244',
				name: 'Track#2 ARTIST Album#1',
				artistId: 'e338dd05-f511-46a6-9e44-4ef8b28a8aa6',
				albumId: '099e46eb-041b-4112-8af8-977e2cb6e962',
				duration: 300,
			}),
			new Track({
				id: 'cc66c802-3847-439c-9a42-e1ccd9e26244',
				name: 'Track#3 ARTIST Album#2',
				artistId: 'e338dd05-f511-46a6-9e44-4ef8b28a8aa6',
				albumId: '18a3436a-a253-4997-900f-0c704c7a63d1',
				duration: 300,
			}),
		]);
	}

	public getAllTracks(): Track[] {
		return this.loadDB();
	}

	public getTrackById(id: string): Track | undefined {
		const allTracks: Track[] = this.getAllTracks();
		return allTracks.find((track: Track) => track.id === id);
	}

	public createTrack(newTrack: Track): Track {
		const allTracks: Track[] = this.getAllTracks();
		this.writeToDB([...allTracks, newTrack]);
		return newTrack;
	}

	public updateTrack(
		id: string,
		updateTrackDTO: UpdateTrackDTO,
	): Track | undefined {
		const allTracks: Track[] = this.getAllTracks();
		let trackToUpdate: Track | undefined = allTracks.find(
			(track: Track) => track.id === id,
		);
		if (!trackToUpdate) {
			return;
		}
		trackToUpdate = new Track({
			...trackToUpdate,
			...updateTrackDTO,
		});
		const updatedTracks: Track[] = allTracks.map((track: Track) => {
			return track.id === id ? trackToUpdate : track;
		});
		this.writeToDB(updatedTracks);
		return trackToUpdate;
	}

	public deleteTrack(id: string): boolean {
		const allTracks: Track[] = this.getAllTracks();
		const updatedTracks: Track[] = allTracks.filter(
			(track: Track) => track.id !== id,
		);
		this.writeToDB(updatedTracks);
		return allTracks.length !== updatedTracks.length;
	}

	public handleArtistDelete(artistId: string): void {
		const allTracks: Track[] = this.getAllTracks();
		const updatedTracks: Track[] = allTracks.map((track: Track) => {
			if (track.artistId === artistId) {
				return new Track({
					...track,
					artistId: null,
				});
			}
			return track;
		});
		this.writeToDB(updatedTracks);
	}

	public handleAlbumDelete(albumId: string): void {
		const allTracks: Track[] = this.getAllTracks();
		const updatedTracks: Track[] = allTracks.map((track: Track) => {
			if (track.albumId === albumId) {
				return new Track({
					...track,
					albumId: null,
				});
			}
			return track;
		});
		this.writeToDB(updatedTracks);
	}
}
