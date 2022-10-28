// RecEntry stands for Record Entry
export default class RecEntry {
	public date: Date = new Date();
	constructor(
		public filename: string,
		public path: string,
		public size: number
	) {}
}
