import logger from "@splasher/logger";
import fs from "fs/promises";

export namespace FileUtils {
	export async function readFileAsJSON<T>(path: string): Promise<T> {
		const file = await fs.readFile(path, "utf-8");
		return JSON.parse(file) as T;
	}

	export async function createFolderIfNotExists(path: string): Promise<void> {
		logger.info(`Creating folder ${path}`);
		try {
			await fs.access(path);

			logger.warn(`Folder ${path} already exists`);
		} catch (error) {
			logger.error(`Folder ${path} does not exist, Creating now`);
			await fs.mkdir(path);
			logger.info(`Folder ${path} created`);
		}
	}

	export async function writeFileAsJSON<T>(
		path: string,
		data: T
	): Promise<void> {
		const file = JSON.stringify(data);
		await fs.writeFile(path, file);
	}
}
