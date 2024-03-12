import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	ParseUUIDPipe,
	Post,
	Put,
} from '@nestjs/common';
import { Artist, CreateArtistDTO, UpdateArtistDTO } from './artists.models';
import { NotFoundException } from '../common/exeptions.models';
import { APIPath } from '../shared/shared.models';
import { ArtistsService } from './artists.service';

@Controller(APIPath.Artists)
export class ArtistsController {
	constructor(private readonly artistsService: ArtistsService) {}

	@Get()
	async getAll(): Promise<Artist[]> {
		return await this.artistsService.getAllArtists();
	}

	@Get(`:${APIPath.Id}`)
	async getById(
		@Param(APIPath.Id, ParseUUIDPipe) id: string,
	): Promise<Artist> {
		const artist: Artist | undefined =
			await this.artistsService.getArtistById(id);
		if (!artist) {
			throw new NotFoundException(id);
		}
		return artist;
	}

	@Post()
	create(@Body() createArtistDTO: CreateArtistDTO): Promise<Artist> {
		return this.artistsService.createArtist(createArtistDTO);
	}

	@Put(`:${APIPath.Id}`)
	async update(
		@Param(APIPath.Id, ParseUUIDPipe) id: string,
		@Body() updateArtistDTO: UpdateArtistDTO,
	): Promise<Artist> {
		const updatedArtist: Artist | undefined =
			await this.artistsService.updateArtist(id, updateArtistDTO);
		if (!updatedArtist) {
			throw new NotFoundException(id);
		}
		return updatedArtist;
	}

	@Delete(`:${APIPath.Id}`)
	@HttpCode(204)
	async remove(@Param(APIPath.Id, ParseUUIDPipe) id: string): Promise<void> {
		const deletedArtist: Artist = await this.artistsService.deleteArtist(
			id,
		);
		if (!deletedArtist) {
			throw new NotFoundException(id);
		}
	}
}
