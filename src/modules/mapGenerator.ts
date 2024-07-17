import { breadthOfMap, lengthOfMap, side, snake, startPoints } from "../index";

const canvas = <HTMLCanvasElement>document.getElementById("myCanvas");
const ctx = canvas?.getContext("2d");

export const drawInitialMap = () => {
	if (ctx) {
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

	// start points are in a straight horizontal line
	// this will find the range of x for that y in which the initial snake exists
	// these variables are for drawing the snake
	let initialY: number = startPoints[0].y; // !could change, need improvements later
	let snakeHeadXValue: number = 0;
	let intialRangeOfX: number[] = startPoints.map((item) => {
		if (item.head) snakeHeadXValue = item.x;
		return item.x;
	});
};
