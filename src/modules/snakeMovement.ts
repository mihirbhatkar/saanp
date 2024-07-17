import { snake, side, state, lengthOfMap, breadthOfMap } from "..";
import { resetGame } from "./gameStates";

const keysDirectionMap: any = {
	ArrowDown: "down",
	ArrowUp: "up",
	ArrowLeft: "left",
	ArrowRight: "right",
};

const incrementTowardsDirection = (obj: SnakePoint): void => {
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

const moveSnake = () => {
	const head = snake.head;
	incrementTowardsDirection(head);
	// unless the tail catches up to the breakpoint, don't remove the breakpoint from the snake.points
	// every breakpoint and unique point should have a direction parameter

	let tail = snake.tail;
	if (snake.breakpoints.length != 0) {
		let nextBreakpoint = snake.breakpoints[0];
		if (tail.x === nextBreakpoint.x && tail.y === nextBreakpoint.y) {
			// remove the breakpoint
			tail.direction = nextBreakpoint.direction;
			snake.breakpoints.shift();
		}
	}
	incrementTowardsDirection(tail);

	// increment other points in direction of the next breakpoint

	checkIfStepExists();
};

const checkIfOppositeDirectionInput = (direction: string) => {
	switch (direction) {
		case "right":
			return snake.head.direction === "left";
		case "left":
			return snake.head.direction === "right";
		case "up":
			return snake.head.direction === "down";
		case "down":
			return snake.head.direction === "up";
	}
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

	if (dir === snake.head.direction) return; // for handling long key presses

	if (!checkIfOppositeDirectionInput(dir)) {
		snake.head.direction = dir;
		snake.breakpoints.push({ ...snake.head });
	}
};

const checkIfStepExists = () => {
	const head = snake.head;

	if (
		head.x < side ||
		head.y < side ||
		head.x > lengthOfMap - side ||
		head.y > breadthOfMap - side
	) {
		snake.alive = false;
	}
};

export { keyPressHandler, moveSnake };
