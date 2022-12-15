import { FileUtils } from "@splasher/file-utils";

export interface Config {
	// Unsplash API collection query items
	collection: string[];
	width: number;
	height: number;

	// Update interval in ms
	update_interval: number;

	// Paths related items
	entries_path: string;
	image_path: string;

	// Binary path
	binary_path: string;
}

export namespace Config {
	export const EMPTY_CONFIG: Config = {
		collection: [],
		width: 1920,
		height: 1080,
		update_interval: 1000 * 60 * 60 * 24,
		entries_path: "entries.json",
		image_path: "images",
		binary_path: "bin\\windows-wallpaper.exe",
	};

	export async function getConfig(path: string): Promise<Config | null> {
		try {
			const config = await FileUtils.readFileAsJSON<Config>(path);
			return config;
		} catch (error) {
			return null;
		}
	}

	export function isConfigEmpty(config: Config): boolean {
		return Object.keys(config).length === 0;
	}

	export async function overrideConfig(
		path: string,
		config: Config
	): Promise<void> {
		// Create folders if they don't exist
		await FileUtils.createFolderIfNotExists(config.image_path);
		await FileUtils.writeFileAsJSON<Config>(path, config);
	}
}
