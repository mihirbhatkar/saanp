import { breadthOfMap, lengthOfMap, snake } from "..";

const canvas = <HTMLCanvasElement>document.getElementById("myCanvas");
const ctx = canvas?.getContext("2d");

export const drawSnake = () => {
	if (ctx) {
		// ctx.clearRect(0, 0, lengthOfMap, breadthOfMap);

		ctx.fillStyle = "lightgreen";
		ctx.fillRect(0, 0, lengthOfMap, breadthOfMap);

		// drawing the snake
		ctx.beginPath();
		ctx.lineWidth = 8;

		for (let i = 0; i < snake.points.length; i++) {
			const point = snake.points[i];
			if (i === 0) {
				ctx.moveTo(point.x, point.y);
			} else {
				ctx.lineTo(point.x, point.y);
			}
		}

		ctx.stroke();
	}
};
