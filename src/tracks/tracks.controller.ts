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
import { CreateTrackDTO, Track, UpdateTrackDTO } from './tracks.models';
import { NotFoundException } from '../common/exeptions.models';
import { APIPath } from '../shared/shared.models';
import { TrackService } from './tracks.service';

@Controller(APIPath.Tracks)
export class TracksController {
	constructor(private readonly trackService: TrackService) {}

	@Get()
	getAll(): Promise<Track[]> {
		return this.trackService.getAllTracks();
	}

	@Get(`:${APIPath.Id}`)
	async getById(
		@Param(APIPath.Id, ParseUUIDPipe) id: string,
	): Promise<Track> {
		const track: Track | undefined = await this.trackService.getTrackById(
			id,
		);
		if (!track) {
			throw new NotFoundException(id);
		}
		return track;
	}

	@Post()
	create(@Body() createTrackDTO: CreateTrackDTO): Promise<Track> {
		return this.trackService.createTrack(createTrackDTO);
	}

	@Put(`:${APIPath.Id}`)
	async update(
		@Param(APIPath.Id, ParseUUIDPipe) id: string,
		@Body() updateTrackDTO: UpdateTrackDTO,
	): Promise<Track> {
		const updatedTrack: Track | undefined =
			await this.trackService.updateTrack(id, updateTrackDTO);
		if (!updatedTrack) {
			throw new NotFoundException(id);
		}
		return updatedTrack;
	}

	@Delete(`:${APIPath.Id}`)
	@HttpCode(204)
	async remove(@Param(APIPath.Id, ParseUUIDPipe) id: string): Promise<void> {
		const deletedTrack: Track = await this.trackService.deleteTrack(id);
		if (!deletedTrack) {
			throw new NotFoundException(id);
		}
	}
}
