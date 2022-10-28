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
exports.setWallpaper = void 0;
const child_process_1 = require("child_process");
const path_1 = __importDefault(require("path"));
function setWallpaper(imgPath) {
    return __awaiter(this, void 0, void 0, function* () {
        // TODO: Make the windows-wallpaper thing dynamic
        // https://github.com/sindresorhus/win-wallpaper
        const binary = path_1.default.join(__dirname, '../windows-wallpaper.exe');
        yield (0, child_process_1.execFile)(binary, [path_1.default.resolve(imgPath)]);
    });
}
exports.setWallpaper = setWallpaper;
