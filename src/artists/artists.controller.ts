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
	getAll(): Artist[] {
		return this.artistsService.getAllArtists();
	}

	@Get(`:${APIPath.Id}`)
	getById(@Param(APIPath.Id, ParseUUIDPipe) id: string): Artist {
		const artist: Artist | undefined =
			this.artistsService.getArtistById(id);
		if (!artist) {
			throw new NotFoundException(id);
		}
		return artist;
	}

	@Post()
	create(@Body() createArtistDTO: CreateArtistDTO): Artist {
		return this.artistsService.createArtist(createArtistDTO);
	}

	@Put(`:${APIPath.Id}`)
	update(
		@Param(APIPath.Id, ParseUUIDPipe) id: string,
		@Body() updateArtistDTO: UpdateArtistDTO,
	): Artist {
		const updatedArtist: Artist | undefined =
			this.artistsService.updateArtist(id, updateArtistDTO);
		if (!updatedArtist) {
			throw new NotFoundException(id);
		}
		return updatedArtist;
	}

	@Delete(`:${APIPath.Id}`)
	@HttpCode(204)
	remove(@Param(APIPath.Id, ParseUUIDPipe) id: string): void {
		const isDeleted: boolean = this.artistsService.deleteArtist(id);
		if (!isDeleted) {
			throw new NotFoundException(id);
		}
	}
}
