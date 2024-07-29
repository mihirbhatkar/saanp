import { snake, state, lengthOfMap, breadthOfMap } from "..";
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

const compute = () => {
	let head = snake.points.at(-1) as SnakePoint;
	const fake = [...snake.points];

	for (let i = 0; i < snake.points.length; i++) {
		if (i == snake.points.length - 1) incrementTowardsDirection(head);
		else {
			snake.points[i] = { ...fake[i + 1] };
		}
	}
	//! improve this algo
	checkIfStepExists();
};

const checkIfOppositeDirectionInput = (direction: string) => {
	let head = snake.points.at(-1) as SnakePoint;
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

	let head = snake.points.at(-1) as SnakePoint;
	if (dir === head.direction) return; // for handling long key presses

	if (!checkIfOppositeDirectionInput(dir)) {
		head.direction = dir;
	}
};

const checkIfStepExists = () => {
	let head = snake.points.at(-1) as SnakePoint;

	if (
		head.x < 0 ||
		head.y < 0 ||
		head.x > lengthOfMap - 1 ||
		head.y > breadthOfMap - 1
	) {
		snake.alive = false;
	}
};

export { keyPressHandler, compute };
