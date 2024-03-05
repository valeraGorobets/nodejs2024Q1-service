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
	UseInterceptors
} from '@nestjs/common';
import {
	CreateUserDTO,
	IUpdatePasswordResult,
	UpdatePasswordDTO,
	UpdatePasswordState,
	User,
	WrongOldPasswordException
} from './users.models';
import { NotFoundException } from '../common/exeptions.models';
import { APIPath } from '../shared/shared.models';
import { UsersService } from './users.service';
import { PasswordRemovalInterceptor } from './users.interceptors';

@Controller(APIPath.Users)
@UseInterceptors(PasswordRemovalInterceptor)
export class UsersController {
	constructor(
		private readonly userService: UsersService,
	) {
	}

	@Get()
	getAll(): User[] {
		return this.userService.getAllUsers();
	}

	@Get(`:${ APIPath.Id }`)
	getById(@Param(APIPath.Id, ParseUUIDPipe) id: string): User {
		const user: User | undefined = this.userService.getUserById(id);
		if (!user) {
			throw new NotFoundException(id);
		}
		return user;
	}

	@Post()
	create(@Body() createUserDTO: CreateUserDTO): User {
		return this.userService.createUser(createUserDTO);
	}

	@Put(`:${ APIPath.Id }`)
	update(@Param(APIPath.Id, ParseUUIDPipe) id: string, @Body() updatePasswordDTO: UpdatePasswordDTO): User {
		const { updatedUser, updatePasswordState }: IUpdatePasswordResult = this.userService.updateUsersPassword(id, updatePasswordDTO);
		switch (updatePasswordState) {
			case UpdatePasswordState.Ok:
				return updatedUser;
			case UpdatePasswordState.UserNotExisting:
				throw new NotFoundException(id);
			case UpdatePasswordState.WrongOldPassword:
				throw new WrongOldPasswordException();
		}
	}

	@Delete(`:${ APIPath.Id }`)
	@HttpCode(204)
	remove(@Param(APIPath.Id, ParseUUIDPipe) id: string): void {
		const isDeleted: boolean = this.userService.deleteUser(id);
		if (!isDeleted) {
			throw new NotFoundException(id);
		}
	}
}
