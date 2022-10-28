import { execFile } from 'child_process';
import path from 'path';

export async function setWallpaper(imgPath: string) {
	// TODO: Make the windows-wallpaper thing dynamic
	// https://github.com/sindresorhus/win-wallpaper
	const binary = path.join(__dirname, '../windows-wallpaper.exe');
	await execFile(binary, [path.resolve(imgPath)]);
}
