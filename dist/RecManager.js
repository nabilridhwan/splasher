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
// RecManager stands for Record [Entry] manager
class RecManager {
    constructor(config) {
        this.config = config;
        this.records = [];
        this.readAllRecords(config.records_path);
    }
    readAllRecords(path) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const recordsFromFile = yield FileReader_1.default.readFile(path);
                this.records = recordsFromFile;
                return recordsFromFile !== null && recordsFromFile !== void 0 ? recordsFromFile : [];
            }
            catch (error) {
                return [];
            }
        });
    }
    getLatestRecord() {
        return this.records.length > 0
            ? this.records[this.records.length - 1]
            : null;
    }
    insertNewRecord(record) {
        return __awaiter(this, void 0, void 0, function* () {
            this.records.push(record);
            yield FileReader_1.default.writeFile(this.config.records_path, this.records);
        });
    }
}
exports.default = RecManager;
