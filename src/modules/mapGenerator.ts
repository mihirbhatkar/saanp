import { breadthOfMap, lengthOfMap, snake } from "../index";

const canvas = <HTMLCanvasElement>document.getElementById("myCanvas");
const ctx = canvas?.getContext("2d");

export const drawInitialMap = () => {
	if (ctx) {
		ctx.clearRect(0, 0, lengthOfMap, breadthOfMap);

		ctx.fillStyle = "lightgreen";
		ctx.fillRect(0, 0, lengthOfMap * 100, breadthOfMap * 100);

		// drawing the snake

		ctx.beginPath();
		ctx.lineWidth = 50;
		ctx.strokeStyle = "black";
		for (let i = 0; i < snake.points.length; i++) {
			const point = snake.points[i];
			ctx.lineTo(point.x * 100, point.y * 100);
		}
		ctx.stroke();
	}
};
