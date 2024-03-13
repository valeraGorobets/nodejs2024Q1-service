import { HttpException, HttpStatus } from '@nestjs/common';
import { Artist } from '../artists/artists.models';
import { Album } from '../albums/albums.models';
import { Track } from '../tracks/tracks.models';
import {
	Album as AlbumPrismaType,
	Artist as ArtistPrismaType,
	Track as TrackPrismaType,
} from '@prisma/client';

export enum FavoritesResponseState {
	Ok,
	NotExisting,
}

export enum FavoritesEntity {
	Artist = 'Artist',
	Album = 'Album',
	Track = 'Track',
}

export class FavoritesNotExistException extends HttpException {
	constructor(entity: string) {
		super(`${entity} does not exist`, HttpStatus.UNPROCESSABLE_ENTITY);
	}
}

export class FavoritesNotFoundException extends HttpException {
	constructor(entity: string) {
		super(`${entity} is not favorite`, HttpStatus.NOT_FOUND);
	}
}

export class FavoritesIDs {
	public artistIDs: string[] = [];
	public albumIDs: string[] = [];
	public trackIDs: string[] = [];

	constructor(favorites: Partial<FavoritesIDs>) {
		Object.assign(this, favorites);
	}
}

export class Favorites {
	public artists: Artist[] = [];
	public albums: Album[] = [];
	public tracks: Track[] = [];

	constructor(favorites: Partial<Favorites>) {
		Object.assign(this, favorites);
	}
}

export interface IFavoritesDBService {
	getFavorites(): FavoritesIDs;

	isTrackFavorite(id: string): boolean;

	addTrackToFavorites(id: string): void;

	deleteTrackFromFavorites(id: string): void;

	isAlbumFavorite(id: string): boolean;

	addAlbumToFavorites(id: string): void;

	deleteAlbumFromFavorites(id: string): void;

	isArtistFavorite(id: string): boolean;

	addArtistToFavorites(id: string): void;

	deleteArtistFromFavorites(id: string): void;
}

export interface IFavoritesPostgreDBService {
	getFavorites(): Promise<Favorites>;

	addTrackToFavorites(id: string): Promise<TrackPrismaType>;

	deleteTrackFromFavorites(id: string): Promise<TrackPrismaType>;

	addAlbumToFavorites(id: string): Promise<AlbumPrismaType>;

	deleteAlbumFromFavorites(id: string): Promise<AlbumPrismaType>;

	addArtistToFavorites(id: string): Promise<ArtistPrismaType>;

	deleteArtistFromFavorites(id: string): Promise<ArtistPrismaType>;
}
