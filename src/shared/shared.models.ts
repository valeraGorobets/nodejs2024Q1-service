export enum DBServiceAlias {
	ArtistsDBService = 'ArtistsDBService',
	UsersDBService = 'UsersDBService',
	TracksDBService = 'TracksDBService',
	AlbumsDBService = 'AlbumsDBService',
	FavoritesDBService = 'FavoritesDBService',
}

export enum APIPath {
	Artists = 'artist',
	Users = 'user',
	Tracks = 'track',
	Albums = 'album',
	Favorites = 'favs',
	Id = 'id',
}

export class CommonResponse {
	public response: string;

	constructor(commonResponse: Partial<CommonResponse>) {
		Object.assign(this, commonResponse);
	}
}
