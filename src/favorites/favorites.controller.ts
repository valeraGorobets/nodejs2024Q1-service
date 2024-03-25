import {
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	ParseUUIDPipe,
	Post,
} from '@nestjs/common';
import {
	Favorites,
	FavoritesEntity,
	FavoritesNotExistException,
	FavoritesNotFoundException,
	FavoritesResponseState,
} from './favorites.models';
import { APIPath, CommonResponse } from '../shared/shared.models';
import { FavoritesService } from './favorites.service';

@Controller(APIPath.Favorites)
export class FavoritesController {
	constructor(private readonly favoritesService: FavoritesService) {}

	@Get()
	getFavorites(): Favorites {
		return this.favoritesService.getFavorites();
	}

	@Post(`${APIPath.Tracks}/:${APIPath.Id}`)
	addTrackToFavorites(
		@Param(APIPath.Id, ParseUUIDPipe) id: string,
	): CommonResponse {
		const responseState: FavoritesResponseState =
			this.favoritesService.addTrackToFavorites(id);
		return this.handleAddToFavorites(FavoritesEntity.Track, responseState);
	}

	@Delete(`${APIPath.Tracks}/:${APIPath.Id}`)
	@HttpCode(204)
	deleteTrackFromFavorites(
		@Param(APIPath.Id, ParseUUIDPipe) id: string,
	): CommonResponse {
		const responseState: FavoritesResponseState =
			this.favoritesService.deleteTrackFromFavorites(id);
		return this.handleDeleteFromFavorites(
			FavoritesEntity.Track,
			responseState,
		);
	}

	@Post(`${APIPath.Albums}/:${APIPath.Id}`)
	addAlbumToFavorites(
		@Param(APIPath.Id, ParseUUIDPipe) id: string,
	): CommonResponse {
		const responseState: FavoritesResponseState =
			this.favoritesService.addAlbumToFavorites(id);
		return this.handleAddToFavorites(FavoritesEntity.Album, responseState);
	}

	@Delete(`${APIPath.Albums}/:${APIPath.Id}`)
	@HttpCode(204)
	deleteAlbumFromFavorites(
		@Param(APIPath.Id, ParseUUIDPipe) id: string,
	): CommonResponse {
		const responseState: FavoritesResponseState =
			this.favoritesService.deleteAlbumFromFavorites(id);
		return this.handleDeleteFromFavorites(
			FavoritesEntity.Album,
			responseState,
		);
	}

	@Post(`${APIPath.Artists}/:${APIPath.Id}`)
	addArtistToFavorites(
		@Param(APIPath.Id, ParseUUIDPipe) id: string,
	): CommonResponse {
		const responseState: FavoritesResponseState =
			this.favoritesService.addArtistToFavorites(id);
		return this.handleAddToFavorites(FavoritesEntity.Artist, responseState);
	}

	@Delete(`${APIPath.Artists}/:${APIPath.Id}`)
	@HttpCode(204)
	deleteArtistFromFavorites(
		@Param(APIPath.Id, ParseUUIDPipe) id: string,
	): CommonResponse {
		const responseState: FavoritesResponseState =
			this.favoritesService.deleteArtistFromFavorites(id);
		return this.handleDeleteFromFavorites(
			FavoritesEntity.Artist,
			responseState,
		);
	}

	private handleAddToFavorites(
		entity: string,
		responseState: FavoritesResponseState,
	): CommonResponse {
		switch (responseState) {
			case FavoritesResponseState.Ok:
				return new CommonResponse({
					response: `${entity} added to favorites`,
				});
			case FavoritesResponseState.NotExisting:
				throw new FavoritesNotExistException(entity);
		}
	}

	private handleDeleteFromFavorites(
		entity: string,
		responseState: FavoritesResponseState,
	): CommonResponse {
		switch (responseState) {
			case FavoritesResponseState.Ok:
				return new CommonResponse({
					response: `${entity} is deleted from favorites`,
				});
			case FavoritesResponseState.NotExisting:
				throw new FavoritesNotFoundException(entity);
		}
	}
}
