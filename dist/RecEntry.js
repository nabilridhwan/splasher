"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// RecEntry stands for Record Entry
class RecEntry {
    constructor(filename, path, size) {
        this.filename = filename;
        this.path = path;
        this.size = size;
        this.date = new Date();
    }
}
exports.default = RecEntry;
