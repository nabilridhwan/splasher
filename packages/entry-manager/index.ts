import { FileUtils } from "@splasher/file-utils";
export interface Entry {
	readonly date: Date;
	readonly filename: string;
	readonly path: string;
	readonly size: number;
}

export namespace EntryManager {
	export async function readEntries(entriesPath: string): Promise<Entry[]> {
		try {
			const entriesFromFile = await FileUtils.readFileAsJSON<Entry[]>(
				entriesPath
			);
			return entriesFromFile ?? [];
		} catch (error) {
			return [];
		}
	}

	export function getLatestEntry(entries: Entry[]): Entry | null {
		return entries.length > 0 ? entries[entries.length - 1] : null;
	}

	export async function insertNewEntry(
		newEntry: Entry,
		entries: Entry[],
		entriesPath: string
	) {
		entries.push(newEntry);
		FileUtils.writeFileAsJSON<Entry[]>(entriesPath, entries);
	}
}
