import { Injectable } from '@nestjs/common';
import { Artist, UpdateArtistDTO } from './artists.models';
import { InMemoryDBService } from '../common/in-memory-db.service';

@Injectable()
export class ArtistsInMemoryDBService extends InMemoryDBService<Artist> {
	constructor() {
		super([
			new Artist({
				id: '099e46eb-041b-4112-8af8-977e2cb6e962',
				name: 'Init User 1',
				grammy: true,
			}),
			new Artist({
				id: 'e338dd05-f511-46a6-9e44-4ef8b28a8aa6',
				name: 'ARTIST',
				grammy: false,
			}),
		]);
	}

	public getAllArtists(): Artist[] {
		return this.loadDB();
	}

	public getArtistById(id: string): Artist | undefined {
		const allArtists: Artist[] = this.getAllArtists();
		return allArtists.find((artist: Artist) => artist.id === id);
	}

	public createArtist(newArtist: Artist): Artist {
		const allArtists: Artist[] = this.getAllArtists();
		this.writeToDB([...allArtists, newArtist]);
		return newArtist;
	}

	public updateArtist(
		id: string,
		updateArtistDTO: UpdateArtistDTO,
	): Artist | undefined {
		const allArtists: Artist[] = this.getAllArtists();
		let artistToUpdate: Artist | undefined = allArtists.find(
			(artist: Artist) => artist.id === id,
		);
		if (!artistToUpdate) {
			return;
		}
		artistToUpdate = new Artist({
			...artistToUpdate,
			...updateArtistDTO,
		});
		const updatedArtists: Artist[] = allArtists.map((artist: Artist) => {
			return artist.id === id ? artistToUpdate : artist;
		});
		this.writeToDB(updatedArtists);
		return artistToUpdate;
	}

	public deleteArtist(id: string): boolean {
		const allArtists: Artist[] = this.getAllArtists();
		const updatedArtists: Artist[] = allArtists.filter(
			(artist: Artist) => artist.id !== id,
		);
		this.writeToDB(updatedArtists);
		return allArtists.length !== updatedArtists.length;
	}
}
