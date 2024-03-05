import { Inject, Injectable } from '@nestjs/common';
import { Artist, CreateArtistDTO, IArtistsDBService, UpdateArtistDTO } from './artists.models';
import { DBServiceAlias } from '../shared/shared.models';
import { IFavoritesDBService } from '../favorites/favorites.models';
import { IAlbumsDBService } from '../albums/albums.models';
import { ITracksDBService } from '../tracks/tracks.models';

@Injectable()
export class ArtistsService {
	constructor(
		@Inject(DBServiceAlias.ArtistsDBService) private readonly artistsDBService: IArtistsDBService,
		@Inject(DBServiceAlias.FavoritesDBService) private readonly favoritesDBService: IFavoritesDBService,
		@Inject(DBServiceAlias.AlbumsDBService) private readonly albumsDBService: IAlbumsDBService,
		@Inject(DBServiceAlias.TracksDBService) private readonly tracksDBService: ITracksDBService,
	) {
	}

	public getAllArtists(): Artist[] {
		return this.artistsDBService.getAllArtists();
	}

	public getArtistById(id: string): Artist | undefined {
		return this.artistsDBService.getArtistById(id);
	}

	public createArtist(createArtistDTO: CreateArtistDTO): Artist {
		const newArtist: Artist = new Artist(createArtistDTO);
		return this.artistsDBService.createArtist(newArtist);
	}

	public updateArtist(id: string, updateArtistDTO: UpdateArtistDTO): Artist | undefined {
		return this.artistsDBService.updateArtist(id, updateArtistDTO);
	}

	public deleteArtist(id: string): boolean {
		this.favoritesDBService.deleteArtistFromFavorites(id);
		this.albumsDBService.handleArtistDelete(id);
		this.tracksDBService.handleArtistDelete(id);
		return this.artistsDBService.deleteArtist(id);
	}

	protected typeObject(object: Object): Artist {
		return new Artist(object);
	}
}
