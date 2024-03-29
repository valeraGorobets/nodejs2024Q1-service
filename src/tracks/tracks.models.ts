import { v4 as uuidv4 } from 'uuid';
import { IsDefined, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateTrackDTO {
	@IsDefined()
	@IsString()
	public name: string;

	@IsOptional()
	@IsString()
	public artistId: string;

	@IsOptional()
	@IsString()
	public albumId: string;

	@IsDefined()
	@IsInt()
	public duration: number;

	constructor(createTrackDTO: Partial<CreateTrackDTO>) {
		Object.assign(this, createTrackDTO);
	}
}

export class UpdateTrackDTO {
	@IsOptional()
	@IsString()
	public name: string;

	@IsOptional()
	@IsString()
	public artistId: string;

	@IsOptional()
	@IsString()
	public albumId: string;

	@IsOptional()
	@IsInt()
	public duration: number;

	constructor(updateTrackDTO: Partial<UpdateTrackDTO>) {
		Object.assign(this, updateTrackDTO);
	}
}

export class Track {
	public id: string = uuidv4();
	public name: string;
	public artistId: string | null = null;
	public albumId: string | null = null;
	public duration: number;

	constructor(track: Partial<Track>) {
		Object.assign(this, track);
	}
}

export interface ITracksDBService {
	getAllTracks(): Track[];

	getTrackById(id: string): Track | undefined;

	createTrack(newTrack: Track): Track;

	updateTrack(id: string, updateTrackDTO: UpdateTrackDTO): Track | undefined;

	deleteTrack(id: string): boolean;

	handleArtistDelete(artistId: string): void;

	handleAlbumDelete(albumId: string): void;
}
