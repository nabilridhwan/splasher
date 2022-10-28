// import chalk from 'chalk';

export default class Logger {
	static log(message: string): void {
		// console.log(chalk.green(message));
		console.log('LOG: ' + message);
	}

	static error(message: string): void {
		// console.log(chalk.red(message));
		console.log('ERROR: ' + message);
	}

	static warn(message: string): void {
		// console.log(chalk.yellow(message));
		console.log('WARN: ' + message);
	}

	static success(message: string): void {
		// console.log(chalk.green(message));
		console.log('SUCCESS: ' + message);
	}

	static info(message: string): void {
		// console.log(chalk.blue(message));
		console.log('INFO: ' + message);
	}
}
