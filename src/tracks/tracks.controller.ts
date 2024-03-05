import { Body, Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { CreateTrackDTO, Track, UpdateTrackDTO } from './tracks.models';
import { NotFoundException } from '../common/exeptions.models';
import { APIPath } from '../shared/shared.models';
import { TrackService } from './tracks.service';

@Controller(APIPath.Tracks)
export class TracksController {
	constructor(
		private readonly trackService: TrackService,
	) {
	}

	@Get()
	getAll(): Track[] {
		return this.trackService.getAllTracks();
	}

	@Get(`:${ APIPath.Id }`)
	getById(@Param(APIPath.Id, ParseUUIDPipe) id: string): Track {
		const track: Track | undefined = this.trackService.getTrackById(id);
		if (!track) {
			throw new NotFoundException(id);
		}
		return track;
	}

	@Post()
	create(@Body() createTrackDTO: CreateTrackDTO): Track {
		return this.trackService.createTrack(createTrackDTO);
	}

	@Put(`:${ APIPath.Id }`)
	update(@Param(APIPath.Id, ParseUUIDPipe) id: string, @Body() updateTrackDTO: UpdateTrackDTO): Track {
		const updatedTrack: Track | undefined = this.trackService.updateTrack(id, updateTrackDTO);
		if (!updatedTrack) {
			throw new NotFoundException(id);
		}
		return updatedTrack;
	}

	@Delete(`:${ APIPath.Id }`)
	@HttpCode(204)
	remove(@Param(APIPath.Id, ParseUUIDPipe) id: string): void {
		const isDeleted: boolean = this.trackService.deleteTrack(id);
		if (!isDeleted) {
			throw new NotFoundException(id);
		}
	}
}
