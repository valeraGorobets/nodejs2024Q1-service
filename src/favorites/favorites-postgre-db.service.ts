import { Injectable } from '@nestjs/common';
import { Favorites, IFavoritesPostgreDBService } from './favorites.models';
import {
	Album as AlbumPrismaType,
	Artist as ArtistPrismaType,
	PrismaClient,
	Track as TrackPrismaType,
} from '@prisma/client';

@Injectable()
export class FavoritesPostgreDbService
	extends PrismaClient
	implements IFavoritesPostgreDBService
{
	public async getFavorites(): Promise<Favorites> {
		return new Favorites({
			artists: await this.artist.findMany({
				where: {
					isFavorite: true,
				},
			}),
			albums: await this.album.findMany({
				where: {
					isFavorite: true,
				},
			}),
			tracks: await this.track.findMany({
				where: {
					isFavorite: true,
				},
			}),
		});
	}

	public addTrackToFavorites(id: string): Promise<TrackPrismaType> {
		return this.track.update({
			where: {
				id,
			},
			data: {
				isFavorite: true,
			},
		});
	}

	public deleteTrackFromFavorites(id: string): Promise<TrackPrismaType> {
		return this.track.update({
			where: {
				id,
				isFavorite: true,
			},
			data: {
				isFavorite: false,
			},
		});
	}

	public addAlbumToFavorites(id: string): Promise<AlbumPrismaType> {
		return this.album.update({
			where: {
				id,
			},
			data: {
				isFavorite: true,
			},
		});
	}

	public deleteAlbumFromFavorites(id: string): Promise<AlbumPrismaType> {
		return this.album.update({
			where: {
				id,
				isFavorite: true,
			},
			data: {
				isFavorite: false,
			},
		});
	}

	public addArtistToFavorites(id: string): Promise<ArtistPrismaType> {
		return this.artist.update({
			where: {
				id,
			},
			data: {
				isFavorite: true,
			},
		});
	}

	public deleteArtistFromFavorites(id: string): Promise<ArtistPrismaType> {
		return this.artist.update({
			where: {
				id,
				isFavorite: true,
			},
			data: {
				isFavorite: false,
			},
		});
	}
}
