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
const FileReader_1 = __importDefault(require("./FileReader"));
class ConfigManager {
    constructor(configPath) {
        this.configPath = configPath;
    }
    static createEmptyConfig() {
        const config = {
            collection: [],
            width: 1920,
            height: 1080,
            update_interval: 1000 * 60 * 60 * 24,
            records_path: 'records.json',
            image_path: 'images',
        };
        return config;
    }
    getConfig() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const config = yield FileReader_1.default.readFile(this.configPath);
                return config;
            }
            catch (error) {
                return null;
            }
        });
    }
    static isConfigEmpty(config) {
        return Object.keys(config).length === 0;
    }
    overrideConfig(config) {
        return __awaiter(this, void 0, void 0, function* () {
            yield FileReader_1.default.writeFile(this.configPath, config);
        });
    }
}
exports.default = ConfigManager;
