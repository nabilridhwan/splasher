import { Config } from './ConfigManager';
import FileReader from './FileReader';
import RecEntry from './RecEntry';

// RecManager stands for Record [Entry] manager
export default class RecManager {
	private records: RecEntry[] = [];

	constructor(private config: Config) {
		this.readAllRecords(config.records_path);
	}

	public async readAllRecords(path: string): Promise<RecEntry[] | null> {
		try {
			const recordsFromFile = await FileReader.readFile<RecEntry[]>(path);
			this.records = recordsFromFile;
			return recordsFromFile ?? [];
		} catch (error) {
			return [];
		}
	}

	public getLatestRecord(): RecEntry | null {
		return this.records.length > 0
			? this.records[this.records.length - 1]
			: null;
	}

	public async insertNewRecord(record: RecEntry): Promise<void> {
		this.records.push(record);
		await FileReader.writeFile<RecEntry[]>(
			this.config.records_path,
			this.records
		);
	}
}
