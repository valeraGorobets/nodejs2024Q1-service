import { v4 as uuidv4 } from 'uuid';
import { IsDefined, IsString } from 'class-validator';
import { HttpException, HttpStatus } from '@nestjs/common';
import { getCurrentTimestamp } from '../common/utils';

export interface IUpdatePasswordResult {
	updatedUser?: User;
	updatePasswordState: UpdatePasswordState;
}

export enum UpdatePasswordState {
	Ok,
	UserNotExisting,
	WrongOldPassword,
}

export class WrongOldPasswordException extends HttpException {
	constructor() {
		super(`Incorrect old password`, HttpStatus.FORBIDDEN);
	}
}

export class CreateUserDTO {
	@IsDefined()
	@IsString()
	public login: string;

	@IsDefined()
	@IsString()
	public password: string;

	constructor(createUserDTO: Partial<CreateUserDTO>) {
		Object.assign(this, createUserDTO);
	}
}

export class UpdatePasswordDTO {
	@IsDefined()
	@IsString()
	public oldPassword: string;

	@IsDefined()
	@IsString()
	public newPassword: string;

	constructor(updatePasswordDTO: Partial<UpdatePasswordDTO>) {
		Object.assign(this, updatePasswordDTO);
	}
}

export class User {
	public id: string = uuidv4();
	public login: string;
	public password: string;
	public version = 1;
	public createdAt: number = getCurrentTimestamp();
	public updatedAt: number = this.createdAt;

	constructor(user: Partial<User>) {
		Object.assign(this, user);
	}

	public updatePassword(newPassword: string): void {
		this.version++;
		this.updatedAt = getCurrentTimestamp();
		this.password = newPassword;
	}
}

export interface IUsersDBService {
	getAllUsers(): User[];

	getUserById(id: string): User | undefined;

	createUser(newUser: User): User;

	updateUsersPassword(userToUpdate: User): void;

	deleteUser(id: string): boolean;
}
