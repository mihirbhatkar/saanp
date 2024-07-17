import { snake } from "..";

interface HumanInterface {
	x: number;
	y: number;
	status: boolean; // true means alive false means eaten
}

class Human implements HumanInterface {
	x: number;
	y: number;
	status: boolean;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
		this.status = true;
	}
}
