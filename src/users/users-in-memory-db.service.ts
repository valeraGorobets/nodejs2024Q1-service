import { Injectable } from '@nestjs/common';
import { IUsersDBService, User } from './users.models';
import { InMemoryDBService } from '../common/in-memory-db.service';

@Injectable()
export class UsersInMemoryDBService
	extends InMemoryDBService<User>
	implements IUsersDBService
{
	constructor() {
		super([
			new User({
				id: '099e46eb-041b-4112-8af8-977e2cb6e962',
				login: 'user 1 login',
				password: '1 password',
				version: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			}),
			new User({
				id: 'd8676729-7367-4a8b-8866-bacebed47a0c',
				login: 'user 2 login',
				password: '2 password',
				version: 2,
				createdAt: new Date(),
				updatedAt: new Date(),
			}),
		]);
	}

	public getAllUsers(): User[] {
		return this.loadDB();
	}

	public getUserById(id: string): User | undefined {
		const allUsers: User[] = this.getAllUsers();
		return allUsers.find((user: User) => user.id === id);
	}

	public createUser(newUser: User): User {
		const allUsers: User[] = this.getAllUsers();
		this.writeToDB([...allUsers, newUser]);
		return newUser;
	}

	public updateUsersPassword(userToUpdate: User): void {
		const allUsers: User[] = this.getAllUsers();
		const updatedUsers: User[] = allUsers.map((user: User) => {
			return user.id === userToUpdate.id ? new User(userToUpdate) : user;
		});
		this.writeToDB(updatedUsers);
	}

	public deleteUser(id: string): boolean {
		const allUsers: User[] = this.getAllUsers();
		const updatedUsers: User[] = allUsers.filter(
			(user: User) => user.id !== id,
		);
		this.writeToDB(updatedUsers);
		return allUsers.length !== updatedUsers.length;
	}
}
