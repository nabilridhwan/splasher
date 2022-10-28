"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const promises_1 = require("fs/promises");
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
const Logger_1 = __importDefault(require("./Logger"));
const RecEntry_1 = __importDefault(require("./RecEntry"));
const WallpaperManager_1 = require("./WallpaperManager");
class WallpaperSaver {
    constructor(config, recordManager) {
        this.config = config;
        this.recordManager = recordManager;
    }
    saveAndSetImageAsWallpaper(imageURL) {
        return __awaiter(this, void 0, void 0, function* () {
            Logger_1.default.info('Downloading image');
            const response = yield axios_1.default.get(imageURL, {
                responseType: 'arraybuffer',
            });
            Logger_1.default.success('Downloaded image');
            Logger_1.default.info('Saving image');
            const imageBuffer = Buffer.from(response.data, 'binary');
            const filename = `wallpaper-${(0, uuid_1.v4)()}.jpg`;
            const finalPath = path_1.default.join(this.config.image_path, filename);
            // Write the file
            (0, promises_1.writeFile)(finalPath, imageBuffer);
            Logger_1.default.success('Saved image');
            // Use RecordManager to make a new record
            const record = new RecEntry_1.default(filename, finalPath, imageBuffer.length);
            Logger_1.default.info('Creating new record and saving');
            this.recordManager.insertNewRecord(record);
            Logger_1.default.success('Created new record and saved');
            Logger_1.default.info('Setting wallpaper');
            // Complete the set wallpaper functionality
            (0, WallpaperManager_1.setWallpaper)(finalPath);
            Logger_1.default.success('Wallpaper Set');
        });
    }
}
exports.default = WallpaperSaver;
