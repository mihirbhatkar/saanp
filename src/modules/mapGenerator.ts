import { breadthOfMap, lengthOfMap, snake } from "../index";

const canvas = <HTMLCanvasElement>document.getElementById("myCanvas");
const ctx = canvas?.getContext("2d");

export const drawInitialMap = () => {
	if (ctx) {
		ctx.fillStyle = "lightgreen";
		ctx.fillRect(0, 0, lengthOfMap, breadthOfMap);

		// drawing the snake
		ctx.beginPath();
		ctx.lineWidth = 8;

		ctx.moveTo(snake.tail.x, snake.tail.y);
		ctx.lineTo(snake.head.x, snake.head.y);

		ctx.stroke();
	}
};
