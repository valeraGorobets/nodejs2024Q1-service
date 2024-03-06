import { Injectable } from '@nestjs/common';
import { FavoritesIDs, IFavoritesDBService } from './favorites.models';

@Injectable()
export class FavoritesInMemoryDbService implements IFavoritesDBService {
	private readonly favoriteArtistIDs: Set<string> = new Set<string>([
		'e338dd05-f511-46a6-9e44-4ef8b28a8aa6',
	]);
	private readonly favoriteAlbumIDs: Set<string> = new Set<string>([
		'099e46eb-041b-4112-8af8-977e2cb6e962',
	]);
	private readonly favoriteTrackIDs: Set<string> = new Set<string>([
		'd8676729-7367-4a8b-8866-bacebed47a0c',
		'cc66c802-3847-439c-9a42-e1ccd9e26244',
	]);

	public getFavorites(): FavoritesIDs {
		return new FavoritesIDs({
			artistIDs: [...this.favoriteArtistIDs.values()],
			albumIDs: [...this.favoriteAlbumIDs.values()],
			trackIDs: [...this.favoriteTrackIDs.values()],
		});
	}

	public isTrackFavorite(id: string): boolean {
		return this.favoriteTrackIDs.has(id);
	}

	public addTrackToFavorites(id: string): void {
		this.favoriteTrackIDs.add(id);
	}

	public deleteTrackFromFavorites(id: string): void {
		this.favoriteTrackIDs.delete(id);
	}

	public isAlbumFavorite(id: string): boolean {
		return this.favoriteAlbumIDs.has(id);
	}

	public addAlbumToFavorites(id: string): void {
		this.favoriteAlbumIDs.add(id);
	}

	public deleteAlbumFromFavorites(id: string): void {
		this.favoriteAlbumIDs.delete(id);
	}

	public isArtistFavorite(id: string): boolean {
		return this.favoriteArtistIDs.has(id);
	}

	public addArtistToFavorites(id: string): void {
		this.favoriteArtistIDs.add(id);
	}

	public deleteArtistFromFavorites(id: string): void {
		this.favoriteArtistIDs.delete(id);
	}
}
