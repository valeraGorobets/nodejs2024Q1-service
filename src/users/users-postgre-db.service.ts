import { Injectable } from '@nestjs/common';
import { CreateUserDTO, IUsersPostgreDBService } from './users.models';
import { Prisma, PrismaClient } from '@prisma/client';
import type { User as UserPrismaType } from '@prisma/client';

@Injectable()
export class UsersPostgreDbService
	extends PrismaClient
	implements IUsersPostgreDBService
{
	constructor() {
		super();
	}

	public getAllUsers(): Promise<UserPrismaType[]> {
		return this.user.findMany();
	}

	public getUserById(id: string): Promise<UserPrismaType | undefined> {
		return this.user.findUnique({
			where: {
				id,
			},
		});
	}

	public createUser(createUserDTO: CreateUserDTO): Promise<UserPrismaType> {
		return this.user.create({
			data: {
				...(createUserDTO as unknown as Prisma.UserCreateInput),
			},
		});
	}

	public updateUsersPassword(
		id: string,
		newPassword: string,
	): Promise<UserPrismaType> {
		return this.user.update({
			where: {
				id,
			},
			data: {
				password: newPassword,
				version: {
					increment: 1,
				},
			},
		});
	}

	public deleteUser(id: string): Promise<UserPrismaType> {
		return this.user.delete({
			where: {
				id,
			},
		});
	}
}
