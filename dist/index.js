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
const ConfigManager_1 = __importDefault(require("./ConfigManager"));
const Logger_1 = __importDefault(require("./Logger"));
const RecManager_1 = __importDefault(require("./RecManager"));
const WallpaperSaver_1 = __importDefault(require("./WallpaperSaver"));
const cfgMgr = new ConfigManager_1.default('config.json');
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        Logger_1.default.log('Getting config');
        let config = yield cfgMgr.getConfig();
        if (config === null) {
            Logger_1.default.warn('Config is empty, creating new config');
            // Write new base config
            const newConfig = ConfigManager_1.default.createEmptyConfig();
            yield cfgMgr.overrideConfig(newConfig);
            // Config is now the base config
            config = newConfig;
        }
        else {
            Logger_1.default.log('Loaded config');
        }
        // Instantiate other classes
        const recMgr = new RecManager_1.default(config);
        const wpMgr = new WallpaperSaver_1.default(config, recMgr);
        // Randomly get a wallpaper from unsplash
        const imageURL = 'https://source.unsplash.com/random/1920x1080';
        wpMgr.saveAndSetImageAsWallpaper(imageURL);
    });
}
// Starting point
main();
