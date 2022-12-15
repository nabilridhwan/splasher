import logger from "@splasher/logger";
import { execFile } from "child_process";
import path from "path";

export namespace Wallpaper {
	export async function setWallpaper(
		imgPath: string,
		binPath?: string
	): Promise<void> {
		logger.info("Setting wallpaper");
		binPath = binPath ? binPath : path.join(__dirname, "../bin");

		// https://github.com/sindresorhus/win-wallpaper
		const binary = path.resolve(binPath);
		const imagePath = path.resolve(imgPath);

		logger.info(`Binary: ${binary}`);
		logger.info(`Image: ${imagePath}`);

		await execFile(binary, [imagePath]);

		logger.info("Successfully set wallpaper");
	}
}
