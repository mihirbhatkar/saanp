import { breadthOfMap, lengthOfMap, snake } from "..";

const canvas = <HTMLCanvasElement>document.getElementById("myCanvas");
const ctx = canvas?.getContext("2d");
const snakeWidth = 50;

export const drawMap = (offset: number) => {
	if (ctx) {
		ctx.clearRect(0, 0, lengthOfMap, breadthOfMap);

		ctx.fillStyle = "lightgreen";
		ctx.fillRect(0, 0, lengthOfMap * 100, breadthOfMap * 100);

		// drawing the snake
		ctx.beginPath();
		ctx.lineWidth = snakeWidth;
		ctx.strokeStyle = "black";
		for (let i = 0; i < snake.points.length; i++) {
			const point = snake.points[i];
			ctx.lineTo(point.x * 100 + offset, point.y * 100);
		}
		ctx.stroke();

		// ctx.beginPath();
		// ctx.fillStyle = "darkgreen";
		// ctx.arc(
		// 	snake.points[0].x,
		// 	snake.points[0].y,
		// 	snakeWidth / 2,
		// 	0,
		// 	2 * Math.PI
		// );
		// ctx.fill();

		// ctx.beginPath();
		// ctx.fillStyle = "red";
		// ctx.arc(
		// 	snake.points[snake.points.length - 1].x,
		// 	snake.points[snake.points.length - 1].y,
		// 	snakeWidth / 2,
		// 	0,
		// 	2 * Math.PI
		// );
		// ctx.fill();
	}
};
