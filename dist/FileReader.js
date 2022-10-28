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
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = require("fs/promises");
class FileReader {
    static readFile(path) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = yield (0, promises_1.readFile)(path, 'utf-8');
            return JSON.parse(file);
        });
    }
    static writeFile(path, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = JSON.stringify(data);
            yield (0, promises_1.writeFile)(path, file);
        });
    }
}
exports.default = FileReader;
