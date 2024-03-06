import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { User } from './users.models';

@Injectable()
export class PasswordRemovalInterceptor<T> implements NestInterceptor<T> {
	intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
		return next.handle().pipe(
			map((data: User | User[]) => {
				const removePassword = (user: User): User => {
					const userWithoutPassword: User = new User({ ...user });
					delete userWithoutPassword.password;
					return userWithoutPassword;
				};

				return Array.isArray(data)
					? data.map((user) => removePassword(user))
					: removePassword(data);
			}),
		);
	}
}
