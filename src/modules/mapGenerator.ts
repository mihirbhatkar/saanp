import { side, startPoints } from "../index";

export const drawInitialMap = () => {
	let container = document?.getElementById("map");

	// start points are in a straight horizontal line
	// this will find the range of x for that y in which the initial snake exists
	// these variables are for drawing the snake
	let initialY: number = startPoints[0].y; // !could change, need improvements later
	let snakeHeadXValue: number = 0;
	let intialRangeOfX: number[] = startPoints.map((item) => {
		if (item.head) snakeHeadXValue = item.x;
		return item.x;
	});

	for (let i = 0; i < side; i++) {
		for (let j = 0; j < side; j++) {
			let block = document.createElement("div");
			block.setAttribute("id", `${j} ${i}`); // keep in mind j denotes x and i denotes y

			// this part if for drawing the snake
			if (i === initialY && intialRangeOfX.indexOf(j) !== -1) {
				block.classList.add("snake-body");
				if (j === snakeHeadXValue) block.classList.add("snake-head");
			}

			container?.appendChild(block);
		}
	}
};
