import { breadthOfMap, lengthOfMap, snake } from "..";

const canvas = <HTMLCanvasElement>document.getElementById("myCanvas");
const ctx = canvas?.getContext("2d");
const snakeWidth = 10;

export const drawSnake = () => {
	if (ctx) {
		ctx.clearRect(0, 0, lengthOfMap, breadthOfMap);

		ctx.fillStyle = "lightgreen";
		ctx.fillRect(0, 0, lengthOfMap, breadthOfMap);

		// drawing the snake
		ctx.beginPath();
		ctx.lineWidth = snakeWidth;
		ctx.strokeStyle = "darkgreen";

		ctx.moveTo(snake.tail.x, snake.tail.y);

		for (let i = 0; i < snake.breakpoints.length; i++) {
			const point = snake.breakpoints[i];
			ctx.lineTo(point.x, point.y);
		}

		ctx.lineTo(snake.head.x, snake.head.y);

		ctx.stroke();

		ctx.beginPath();
		ctx.fillStyle = "darkgreen";
		ctx.arc(snake.tail.x, snake.tail.y, snakeWidth / 2, 0, 2 * Math.PI);
		ctx.fill();

		ctx.beginPath();
		ctx.fillStyle = "red";
		ctx.arc(snake.head.x, snake.head.y, snakeWidth / 2, 0, 2 * Math.PI);
		ctx.fill();
	}
};
