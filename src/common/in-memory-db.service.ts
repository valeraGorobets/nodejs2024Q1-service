export abstract class InMemoryDBService<T> {
	private db: T[] = [];

	protected constructor(initValues: T[] = []) {
		this.writeToDB(initValues);
	}

	protected loadDB(): T[] {
		return this.db;
	}

	protected writeToDB(collection: T[]): void {
		this.db = [];
		this.db.push(...collection);
	}
}
