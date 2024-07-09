import "./style.css";
import { drawInitialMap } from "./modules/mapGenerator";
import { drawSnake } from "./modules/drawSnake";

export const side = 24;

export const startPoints: SnakePoints = [
	{ x: 1, y: 10 },
	{ x: 2, y: 10 },
	{ x: 3, y: 10 },
	{ x: 4, y: 10, head: true },
]; // array points are going to be continous and in a straight horizontal line.

export const snake: Snake = {
	points: startPoints,
	length: 4,
	direction: "down",
	alive: true,
};

const keysDirectionMap: any = {
	ArrowDown: "down",
	ArrowUp: "up",
	ArrowLeft: "left",
	ArrowRight: "right",
};

// !

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

const checkIfStepExists = () => {
	const head = snake.points.slice(-1)[0];
	if (head.x < 0 || head.y < 0 || head.x > side - 1 || head.y > side - 1) {
		snake.alive = false;
	}
};

const changeDirection = (e: KeyboardEvent) => {
	if (
		e.key !== "ArrowRight" &&
		e.key !== "ArrowLeft" &&
		e.key !== "ArrowUp" &&
		e.key !== "ArrowDown"
	)
		return;

	if (!checkIfOppositeDirectionInput(keysDirectionMap[e.key])) {
		snake.direction = keysDirectionMap[e.key];
	}
};

const autoWalk = () => {
	moveSnake();

	if (!snake.alive) {
		// fail state
		let score = document.getElementById("score");
		if (score) {
			score.innerText = "Dead 💀";
		}
		clearInterval(walkIntervalId);
		window.removeEventListener("keydown", changeDirection);
	} else {
		drawSnake();
	}
};

drawInitialMap();

window.addEventListener("keydown", changeDirection);
const walkIntervalId = setInterval(autoWalk, 150);
