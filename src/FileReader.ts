import { readFile, writeFile } from 'fs/promises';

export default class FileReader {
	static async readFile<T>(path: string): Promise<T> {
		const file = await readFile(path, 'utf-8');
		return JSON.parse(file) as T;
	}

	static async writeFile<T>(path: string, data: T): Promise<void> {
		const file = JSON.stringify(data);
		await writeFile(path, file);
	}
}
