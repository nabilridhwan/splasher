"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
class Logger {
    static log(message) {
        console.log(chalk_1.default.green(message));
    }
    static error(message) {
        console.log(chalk_1.default.red(message));
    }
    static warn(message) {
        console.log(chalk_1.default.yellow(message));
    }
    static success(message) {
        console.log(chalk_1.default.green(message));
    }
    static info(message) {
        console.log(chalk_1.default.blue(message));
    }
}
exports.default = Logger;
