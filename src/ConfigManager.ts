import FileReader from './FileReader';

export type Config = {
	// Unsplash API collection query items
	collection: string[];
	width: number;
	height: number;

	// Update interval in ms
	update_interval: number;

	// Paths related items
	records_path: string;
	image_path: string;
};

export default class ConfigManager {
	constructor(private configPath: string) {}

	public static createEmptyConfig(): Config {
		const config: Config = {
			collection: [],
			width: 1920,
			height: 1080,
			update_interval: 1000 * 60 * 60 * 24,
			records_path: 'records.json',
			image_path: 'images',
		};

		return config;
	}

	public async getConfig(): Promise<Config | null> {
		try {
			const config = await FileReader.readFile<Config>(this.configPath);
			return config;
		} catch (error) {
			return null;
		}
	}

	public static isConfigEmpty(config: Config): boolean {
		return Object.keys(config).length === 0;
	}

	public async overrideConfig(config: Config): Promise<void> {
		await FileReader.writeFile<Config>(this.configPath, config);
	}
}
