import logger from "@splasher/logger";
import axios from "axios";
import fs from "fs/promises";
import path from "path";
import { v4 as genUUID } from "uuid";

export interface ImageMetadata {
	readonly id: string;
	readonly name: string;
	readonly path: string;
	readonly size: number;
}

export namespace Unsplash {
	// TODO: Account for config file
	export function getRandomImageFromUnsplash(): string {
		return "https://source.unsplash.com/random?orientation=landscape";
	}

	export async function downloadImageFromLink(
		imageURL: string,
		pathToSave: string
	): Promise<ImageMetadata> {
		logger.info("Downloading image");

		// Download the image as array buffer
		const response = await axios.get(imageURL, {
			responseType: "arraybuffer",
		});

		logger.info("Downloaded image");

		// Save the image
		logger.info("Saving image");
		const id = genUUID();
		const imageBuffer = Buffer.from(response.data, "binary");
		const filename = `wallpaper-${id}.jpg`;
		const finalPath = path.join(pathToSave, filename);

		// Write the image file
		fs.writeFile(finalPath, imageBuffer);
		logger.info("Saved image");

		return {
			id,
			name: filename,
			path: finalPath,
			size: imageBuffer.length,
		};
	}
}
