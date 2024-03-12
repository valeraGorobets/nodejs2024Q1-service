import { Injectable } from '@nestjs/common';
import {
	CreateTrackDTO,
	ITracksDBService2,
	UpdateTrackDTO,
} from './tracks.models';
import { Prisma, PrismaClient } from '@prisma/client';
import type { Track as TrackPrismaType } from '.prisma/client';

@Injectable()
export class TrackPostgreDBService
	extends PrismaClient
	implements ITracksDBService2
{
	constructor() {
		super();
	}

	public getAllTracks(): Promise<TrackPrismaType[]> {
		return this.track.findMany();
	}

	public getTrackById(id: string): Promise<TrackPrismaType | undefined> {
		return this.track.findUnique({
			where: {
				id,
			},
		});
	}

	public createTrack(
		createTrackDTO: CreateTrackDTO,
	): Promise<TrackPrismaType> {
		return this.track.create({
			data: {
				...(createTrackDTO as unknown as Prisma.TrackCreateInput),
			},
		});
	}

	public updateTrack(
		id: string,
		updateTrackDTO: UpdateTrackDTO,
	): Promise<TrackPrismaType> {
		return this.track.update({
			where: {
				id,
			},
			data: {
				...updateTrackDTO,
			},
		});
	}

	public deleteTrack(id: string): Promise<TrackPrismaType> {
		return this.track.delete({
			where: {
				id,
			},
		});
	}
}
