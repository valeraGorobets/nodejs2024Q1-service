import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundException extends HttpException {
	constructor(id: string) {
		super(`Entity with UUID: ${id} was not found`, HttpStatus.NOT_FOUND);
	}
}
