import { snake, side, state, lengthOfMap, breadthOfMap } from "..";
import { renderGame } from "..";
import { walkIntervalId, setWalkIntervalId } from "..";
import { resetGame } from "./gameStates";

const keysDirectionMap: any = {
	ArrowDown: "down",
	ArrowUp: "up",
	ArrowLeft: "left",
	ArrowRight: "right",
};

const moveSnake = () => {
	// for (let point of snake.points) {
	// 	point.x++;
	// }
	delete snake.points[snake.points.length - 1].head;
	let newHead = snake.points[snake.points.length - 1];
	let newX = newHead.x;
	let newY = newHead.y;

	switch (snake.direction) {
		case "right":
			snake.points.push({ x: ++newX, y: newY, head: true });
			break;
		case "left":
			snake.points.push({ x: --newX, y: newY, head: true });
			break;
		case "up":
			snake.points.push({ x: newX, y: --newY, head: true });
			break;
		case "down":
			snake.points.push({ x: newX, y: ++newY, head: true });
			break;
	}

	// unless the tail catches up to the breakpoint, don't remove the breakpoint from the snake.points
	// every breakpoint and unique point should have a direction parameter
	let tail = snake.points[0];
	let nextBreakpoint = snake.points[1];
	if (tail.x == nextBreakpoint.x && tail.y == nextBreakpoint.y) {
		// remove the breakpoint
		snake.points.splice(1, 1);
	}

	checkIfStepExists();
};

const checkIfOppositeDirectionInput = (direction: string) => {
	switch (direction) {
		case "right":
			return snake.direction === "left";
		case "left":
			return snake.direction === "right";
		case "up":
			return snake.direction === "down";
		case "down":
			return snake.direction === "up";
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

	if (keysDirectionMap[keyPressed] === snake.direction) return; // for handling long key presses

	if (!checkIfOppositeDirectionInput(keysDirectionMap[keyPressed])) {
		snake.direction = keysDirectionMap[keyPressed];
	}
};

const checkIfStepExists = () => {
	const head = snake.points[snake.points.length - 1];

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
