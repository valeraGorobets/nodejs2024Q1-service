import { Inject, Injectable } from '@nestjs/common';
import {
	CreateUserDTO,
	IUpdatePasswordResult,
	IUsersDBService,
	UpdatePasswordDTO,
	UpdatePasswordState,
	User,
} from './users.models';
import { DBServiceAlias } from '../shared/shared.models';
import type { User as UserPrismaType } from '.prisma/client';

@Injectable()
export class UsersService {
	constructor(
		@Inject(DBServiceAlias.UsersDBService)
		private readonly userDBService: IUsersDBService,
	) {}

	public getAllUsers(): Promise<User[]> {
		return this.userDBService
			.getAllUsers()
			.then((users: UserPrismaType[]) =>
				users.map((user) => new User({ ...user })),
			);
	}

	public getUserById(id: string): Promise<User | undefined> {
		return this.userDBService
			.getUserById(id)
			.then(
				(user: UserPrismaType | undefined) =>
					user && new User({ ...user }),
			);
	}

	public createUser(createUserDTO: CreateUserDTO): Promise<User> {
		return this.userDBService
			.createUser(createUserDTO)
			.then((user: UserPrismaType) => new User({ ...user }));
	}

	public async updateUsersPassword(
		id: string,
		{ oldPassword, newPassword }: UpdatePasswordDTO,
	): Promise<IUpdatePasswordResult> {
		const userToUpdate: User | undefined = await this.getUserById(id);
		if (!userToUpdate) {
			return { updatePasswordState: UpdatePasswordState.UserNotExisting };
		} else if (userToUpdate.password !== oldPassword) {
			return {
				updatePasswordState: UpdatePasswordState.WrongOldPassword,
			};
		}
		const updatedUser: User = await this.userDBService
			.updateUsersPassword(userToUpdate.id, newPassword)
			.then((user: UserPrismaType) => new User({ ...user }));
		return {
			updatePasswordState: UpdatePasswordState.Ok,
			updatedUser,
		};
	}

	public deleteUser(id: string): Promise<User> {
		return this.userDBService
			.deleteUser(id)
			.then((user: UserPrismaType) => new User({ ...user }))
			.catch(() => undefined);
	}
}
