export abstract class InMemoryDBService<T> {
	private db: T[] = [];

	protected constructor(initValues: T[] = []) {
		this.writeToDB(initValues);
	}

	protected abstract typeObject(object: Object): T;

	protected loadDB(): T[] {
		return this.db.map((object: Object) => this.typeObject(object));
	}

	protected writeToDB(collection: T[]): void {
		this.db = [];
		this.db.push(...collection);
	}
}
