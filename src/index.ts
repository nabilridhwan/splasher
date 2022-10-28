import ConfigManager from './ConfigManager';
import Logger from './Logger';
import RecManager from './RecManager';
import WallpaperSaver from './WallpaperSaver';

const cfgMgr = new ConfigManager('config.json');

async function main() {
	Logger.log('Getting config');
	let config = await cfgMgr.getConfig();

	if (config === null) {
		Logger.warn('Config is empty, creating new config');
		// Write new base config
		const newConfig = ConfigManager.createEmptyConfig();
		await cfgMgr.overrideConfig(newConfig);

		// Config is now the base config
		config = newConfig;
	} else {
		Logger.log('Loaded config');
	}

	// Instantiate other classes
	const recMgr = new RecManager(config);
	const wpMgr = new WallpaperSaver(config, recMgr);

	// Randomly get a wallpaper from unsplash
	const imageURL = 'https://source.unsplash.com/random/1920x1080';
	wpMgr.saveAndSetImageAsWallpaper(imageURL);
}

// Starting point
main();
