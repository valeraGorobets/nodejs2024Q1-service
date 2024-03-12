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
	getAll(): Promise<Album[]> {
		return this.albumsService.getAllAlbums();
	}

	@Get(`:${APIPath.Id}`)
	async getById(
		@Param(APIPath.Id, ParseUUIDPipe) id: string,
	): Promise<Album> {
		const album: Album | undefined = await this.albumsService.getAlbumById(
			id,
		);
		if (!album) {
			throw new NotFoundException(id);
		}
		return album;
	}

	@Post()
	create(@Body() createAlbumDTO: CreateAlbumDTO): Promise<Album> {
		return this.albumsService.createAlbum(createAlbumDTO);
	}

	@Put(`:${APIPath.Id}`)
	async update(
		@Param(APIPath.Id, ParseUUIDPipe) id: string,
		@Body() updateAlbumDTO: UpdateAlbumDTO,
	): Promise<Album> {
		const updatedAlbum: Album | undefined =
			await this.albumsService.updateAlbum(id, updateAlbumDTO);
		if (!updatedAlbum) {
			throw new NotFoundException(id);
		}
		return updatedAlbum;
	}

	@Delete(`:${APIPath.Id}`)
	@HttpCode(204)
	async remove(@Param(APIPath.Id, ParseUUIDPipe) id: string): Promise<void> {
		const deletedAlbum: Album = await this.albumsService.deleteAlbum(id);
		if (!deletedAlbum) {
			throw new NotFoundException(id);
		}
	}
}
