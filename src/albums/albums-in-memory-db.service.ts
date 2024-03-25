import { Injectable } from '@nestjs/common';
import { Album, IAlbumsDBService, UpdateAlbumDTO } from './albums.models';
import { InMemoryDBService } from '../common/in-memory-db.service';

@Injectable()
export class AlbumsInMemoryDbService
	extends InMemoryDBService<Album>
	implements IAlbumsDBService
{
	constructor() {
		super([
			new Album({
				id: '099e46eb-041b-4112-8af8-977e2cb6e962',
				name: 'ARTIST Album#1',
				year: 2011,
				artistId: 'e338dd05-f511-46a6-9e44-4ef8b28a8aa6',
			}),
			new Album({
				id: '18a3436a-a253-4997-900f-0c704c7a63d1',
				name: 'ARTIST Album#2',
				year: 1998,
				artistId: 'e338dd05-f511-46a6-9e44-4ef8b28a8aa6',
			}),
		]);
	}

	public getAllAlbums(): Album[] {
		return this.loadDB();
	}

	public getAlbumById(id: string): Album | undefined {
		const allAlbums: Album[] = this.getAllAlbums();
		return allAlbums.find((album: Album) => album.id === id);
	}

	public createAlbum(newAlbum: Album): Album {
		const allAlbums: Album[] = this.getAllAlbums();
		this.writeToDB([...allAlbums, newAlbum]);
		return newAlbum;
	}

	public updateAlbum(
		id: string,
		updateAlbumDTO: UpdateAlbumDTO,
	): Album | undefined {
		const allAlbums: Album[] = this.getAllAlbums();
		let albumToUpdate: Album | undefined = allAlbums.find(
			(album: Album) => album.id === id,
		);
		if (!albumToUpdate) {
			return;
		}
		albumToUpdate = new Album({
			...albumToUpdate,
			...updateAlbumDTO,
		});
		const updatedAlbum: Album[] = allAlbums.map((album: Album) => {
			return album.id === id ? albumToUpdate : album;
		});
		this.writeToDB(updatedAlbum);
		return albumToUpdate;
	}

	public deleteAlbum(id: string): boolean {
		const allAlbums: Album[] = this.getAllAlbums();
		const updatedAlbums: Album[] = allAlbums.filter(
			(album: Album) => album.id !== id,
		);
		this.writeToDB(updatedAlbums);
		return allAlbums.length !== updatedAlbums.length;
	}

	public handleArtistDelete(artistId: string): void {
		const allAlbums: Album[] = this.getAllAlbums();
		const updatedAlbums: Album[] = allAlbums.map((album: Album) => {
			if (album.artistId === artistId) {
				return new Album({
					...album,
					artistId: null,
				});
			}
			return album;
		});
		this.writeToDB(updatedAlbums);
	}
}
