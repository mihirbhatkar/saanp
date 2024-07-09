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
	length: 3,
	direction: "down",
};

const keysDirectionMap: any = {
	ArrowDown: "down",
	ArrowUp: "up",
	ArrowLeft: "left",
	ArrowRight: "right",
};

// !
const newPoints = (points: SnakePoints, direction: string) => {
	const newPoints = structuredClone(points);
	let newHead = newPoints.slice(-1)[0];

	let newX = newHead.x;
	let newY = newHead.y;
	switch (direction) {
		case "right":
			newPoints.push({ x: ++newX, y: newY });
			break;
		case "left":
			newPoints.push({ x: --newX, y: newY });
			break;
		case "up":
			newPoints.push({ x: newX, y: --newY });
			break;
		case "down":
			newPoints.push({ x: newX, y: ++newY });
			break;
	}
	newPoints.shift();
	return newPoints;
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

const moveSnake = (direction: string) => {
	if (checkIfOppositeDirectionInput(direction)) return undefined;

	const pointsOld = snake.points;
	snake.points = newPoints(pointsOld, direction);
	snake.direction = direction;

	if (checkIfStepExists(snake)) {
		return snake;
	} else return undefined;
};

const checkIfStepExists = (nextSnake: any) => {
	const head = nextSnake.points.slice(-1)[0];
	return !(
		head.x < 0 ||
		head.y < 0 ||
		head.x > side - 1 ||
		head.y > side - 1
	);
};

const changeDirection = (e: KeyboardEvent) => {
	if (checkIfOppositeDirectionInput(keysDirectionMap[e.key]))
		return undefined;
	snake.direction = keysDirectionMap[e.key];
};

const autoWalk = () => {
	const newSnake = moveSnake(snake.direction);
	if (!newSnake) return;
	drawSnake();
};

drawInitialMap();

window.addEventListener("keydown", changeDirection);
setInterval(autoWalk, 200);
