import { EntryManager } from "@splasher/entry-manager";
import logger from "@splasher/logger";
import { Unsplash } from "@splasher/unsplash-utils";
import { Config } from "../../packages/config-manager";
import { Wallpaper } from "../../packages/wallpaper-manager";

async function main() {
	// Get the config (if any)
	let config = await Config.getConfig("./config.json");

	// Override config with default config
	if (!config) {
		logger.error("Config not found, using default config");
		await Config.overrideConfig("./config.json", Config.EMPTY_CONFIG);

		config = Config.EMPTY_CONFIG;

		logger.info("Default config saved");
	}

	// Get random image from unsplash
	const link = Unsplash.getRandomImageFromUnsplash();
	const pathToSave = config.image_path;
	const savedImagePath = await Unsplash.downloadImageFromLink(link, pathToSave);

	// Set the wallpaper
	Wallpaper.setWallpaper(savedImagePath.path, config.binary_path);

	// Read all entries

	logger.info("Reading entries");
	const entries = await EntryManager.readEntries(config.entries_path);
	logger.info("Done reading entries");

	// Save to entries
	logger.info("Saving entry");
	await EntryManager.insertNewEntry(
		{
			date: new Date(),
			filename: savedImagePath.name,
			path: savedImagePath.path,
			size: savedImagePath.size,
		},
		entries,
		config.entries_path
	);
	logger.info("Done saving entry");
}

// Starting point
main();
