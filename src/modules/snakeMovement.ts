import { snake, side, state } from "..";
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
	if (checkIfOppositeDirectionInput(snake.direction)) return undefined;

	delete snake.points[snake.length - 1].head;
	let newHead = snake.points.slice(-1)[0];
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
	snake.points.shift();

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
		window.clearInterval(walkIntervalId);
		setWalkIntervalId(window.setInterval(renderGame, 200));
		renderGame();
	}
};

const checkIfStepExists = () => {
	const head = snake.points.slice(-1)[0];
	if (head.x < 0 || head.y < 0 || head.x > side - 1 || head.y > side - 1) {
		snake.alive = false;
	}
};

export { keyPressHandler, moveSnake };
