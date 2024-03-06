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

@Injectable()
export class UsersService {
	constructor(
		@Inject(DBServiceAlias.UsersDBService)
		private readonly userDBService: IUsersDBService,
	) {}

	public getAllUsers(): User[] {
		return this.userDBService.getAllUsers();
	}

	public getUserById(id: string): User | undefined {
		return this.userDBService.getUserById(id);
	}

	public createUser(createUserDTO: CreateUserDTO): User {
		const newUser: User = new User(createUserDTO);
		return this.userDBService.createUser(newUser);
	}

	public updateUsersPassword(
		id: string,
		{ oldPassword, newPassword }: UpdatePasswordDTO,
	): IUpdatePasswordResult {
		const userToUpdate: User | undefined = this.getUserById(id);
		if (!userToUpdate) {
			return { updatePasswordState: UpdatePasswordState.UserNotExisting };
		} else if (userToUpdate.password !== oldPassword) {
			return {
				updatePasswordState: UpdatePasswordState.WrongOldPassword,
			};
		}
		userToUpdate.updatePassword(newPassword);
		this.userDBService.updateUsersPassword(userToUpdate);
		return {
			updatePasswordState: UpdatePasswordState.Ok,
			updatedUser: userToUpdate,
		};
	}

	public deleteUser(id: string): boolean {
		return this.userDBService.deleteUser(id);
	}
}
