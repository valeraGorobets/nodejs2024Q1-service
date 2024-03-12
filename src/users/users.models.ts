import { v4 as uuidv4 } from 'uuid';
import { IsDefined, IsString } from 'class-validator';
import { HttpException, HttpStatus } from '@nestjs/common';
import { getCurrentTimestamp } from '../common/utils';
import type { User as UserPrismaType } from '@prisma/client';

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
	public createdAt: number | Date = getCurrentTimestamp();
	public updatedAt: number | Date = this.createdAt;

	constructor(user: Partial<User>) {
		Object.assign(this, user);
		this.createdAt =
			this.createdAt instanceof Date
				? this.createdAt.getTime()
				: this.createdAt;
		this.updatedAt =
			this.updatedAt instanceof Date
				? this.updatedAt.getTime()
				: this.updatedAt;
	}
}

export interface IUsersDBService {
	getAllUsers(): Promise<UserPrismaType[]>;

	getUserById(id: string): Promise<UserPrismaType | undefined>;

	createUser(createUserDTO: CreateUserDTO): Promise<UserPrismaType>;

	updateUsersPassword(
		id: string,
		newPassword: string,
	): Promise<UserPrismaType>;

	deleteUser(id: string): Promise<UserPrismaType>;
}
