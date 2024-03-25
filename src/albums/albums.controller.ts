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
import { Album, CreateAlbumDTO, UpdateAlbumDTO } from './albums.models';
import { NotFoundException } from '../common/exeptions.models';
import { APIPath } from '../shared/shared.models';
import { AlbumsService } from './albums.service';

@Controller(APIPath.Albums)
export class AlbumsController {
	constructor(private readonly albumsService: AlbumsService) {}

	@Get()
	getAll(): Album[] {
		return this.albumsService.getAllAlbums();
	}

	@Get(`:${APIPath.Id}`)
	getById(@Param(APIPath.Id, ParseUUIDPipe) id: string): Album {
		const album: Album | undefined = this.albumsService.getAlbumById(id);
		if (!album) {
			throw new NotFoundException(id);
		}
		return album;
	}

	@Post()
	create(@Body() createAlbumDTO: CreateAlbumDTO): Album {
		return this.albumsService.createAlbum(createAlbumDTO);
	}

	@Put(`:${APIPath.Id}`)
	update(
		@Param(APIPath.Id, ParseUUIDPipe) id: string,
		@Body() updateAlbumDTO: UpdateAlbumDTO,
	): Album {
		const updatedAlbum: Album | undefined = this.albumsService.updateAlbum(
			id,
			updateAlbumDTO,
		);
		if (!updatedAlbum) {
			throw new NotFoundException(id);
		}
		return updatedAlbum;
	}

	@Delete(`:${APIPath.Id}`)
	@HttpCode(204)
	remove(@Param(APIPath.Id, ParseUUIDPipe) id: string): void {
		const isDeleted: boolean = this.albumsService.deleteAlbum(id);
		if (!isDeleted) {
			throw new NotFoundException(id);
		}
	}
}
