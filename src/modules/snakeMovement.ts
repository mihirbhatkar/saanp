import { snake, state, lengthOfMap, breadthOfMap } from "..";
import { resetGame } from "./gameStates";

const keysDirectionMap: any = {
	ArrowDown: "down",
	ArrowUp: "up",
	ArrowLeft: "left",
	ArrowRight: "right",
};

export const incrementTowardsDirection = (obj: SnakePoint): void => {
	switch (obj.direction) {
		case "right":
			obj.x += 1;
			break;
		case "left":
			obj.x -= 1;
			break;
		case "up":
			obj.y -= 1;
			break;
		case "down":
			obj.y += 1;
			break;
	}
};

const compute = () => {
	for (let point of snake.points) incrementTowardsDirection(point);

	// increment other points in direction of the next breakpoint

	checkIfStepExists();
};

const checkIfOppositeDirectionInput = (direction: string) => {
	let head = snake.points[snake.points.length - 1];
	switch (direction) {
		case "right":
			return head.direction === "left";
		case "left":
			return head.direction === "right";
		case "up":
			return head.direction === "down";
		case "down":
			return head.direction === "up";
	}
};

const euclideanDistance = (a: SnakePoint, b: SnakePoint): number => {
	return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
};

const keyPressHandler = (e: KeyboardEvent): void => {
	const keyPressed = e.code;

	if (snake.alive == false && keyPressed === "Space") {
		resetGame();
	}

	if (
		keyPressed !== "ArrowRight" &&
		keyPressed !== "ArrowLeft" &&
		keyPressed !== "ArrowUp" &&
		keyPressed !== "ArrowDown"
	)
		return;

	const dir = keysDirectionMap[keyPressed];

	let head = snake.points[snake.points.length - 1];
	if (dir === head.direction) return; // for handling long key presses

	if (!checkIfOppositeDirectionInput(dir)) {
		head.direction = dir;
	}
};

const checkIfStepExists = () => {
	const head = snake.points[snake.points.length - 1];

	if (
		head.x < 0 ||
		head.y < 0 ||
		head.x > lengthOfMap ||
		head.y > breadthOfMap
	) {
		snake.alive = false;
	}
};

export { keyPressHandler, compute };
