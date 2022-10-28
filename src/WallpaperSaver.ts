import axios from 'axios';
import { writeFile } from 'fs/promises';
import path from 'path';
import { v4 as genUUID } from 'uuid';
import { Config } from './ConfigManager';
import Logger from './Logger';
import RecEntry from './RecEntry';
import RecManager from './RecManager';
import { setWallpaper } from './WallpaperManager';

export default class WallpaperSaver {
	constructor(private config: Config, private recordManager: RecManager) {}

	public async saveAndSetImageAsWallpaper(imageURL: string): Promise<void> {
		Logger.info('Downloading image');
		const response = await axios.get(imageURL, {
			responseType: 'arraybuffer',
		});

		Logger.success('Downloaded image');

		Logger.info('Saving image');

		const imageBuffer = Buffer.from(response.data, 'binary');
		const filename = `wallpaper-${genUUID()}.jpg`;
		const finalPath = path.join(this.config.image_path, filename);

		// Write the file
		writeFile(finalPath, imageBuffer);

		Logger.success('Saved image');

		// Use RecordManager to make a new record
		const record: RecEntry = new RecEntry(
			filename,
			finalPath,
			imageBuffer.length
		);

		Logger.info('Creating new record and saving');

		this.recordManager.insertNewRecord(record);

		Logger.success('Created new record and saved');

		Logger.info('Setting wallpaper');
		// Complete the set wallpaper functionality
		setWallpaper(finalPath);

		Logger.success('Wallpaper Set');
	}
}
