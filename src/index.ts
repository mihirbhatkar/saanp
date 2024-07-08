import "./style.css";
import { drawInitialMap } from "./modules/mapGenerator";

export const side = 24;

export const startPoints: SnakePoints = [
	{ x: 1, y: 10 },
	{ x: 2, y: 10 },
	{ x: 3, y: 10 },
	{ x: 4, y: 10, head: true },
]; // array points are going to be continous and in a straight horizontal line.

let snake: Snake = {
	points: startPoints,
	length: 3,
	direction: "down",
};

const newPoints = (points: any, direction: any) => {
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
		case "ArrowRight":
			return snake.direction === "left";
		case "ArrowLeft":
			return snake.direction === "right";
		case "ArrowUp":
			return snake.direction === "down";
		case "ArrowDown":
			return snake.direction === "up";
	}
};

const checkKey = (key: string) => {
	if (checkIfOppositeDirectionInput(key)) return undefined;

	const currentSnake = structuredClone(snake);
	const pointsOld = currentSnake.points;
	let nextSnake;
	switch (key) {
		case "ArrowRight":
			nextSnake = {
				...currentSnake,
				points: newPoints(pointsOld, "right"),
				direction: "right",
			};
			break;
		case "ArrowLeft":
			nextSnake = {
				...currentSnake,
				points: newPoints(pointsOld, "left"),
				direction: "left",
			};
			break;
		case "ArrowUp":
			nextSnake = {
				...currentSnake,
				points: newPoints(pointsOld, "up"),
				direction: "up",
			};
			break;
		case "ArrowDown":
			nextSnake = {
				...currentSnake,
				points: newPoints(pointsOld, "down"),
				direction: "down",
			};
			break;
		default:
			return undefined;
	}
	if (checkIfStepExists(nextSnake)) {
		return nextSnake;
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

const drawSnake = (newSnake: any) => {
	const selected = document.querySelectorAll(".snake-body");
	for (let item of selected) item.removeAttribute("class"); //  remove current snake

	const newSelectedIds = [];
	for (const item of newSnake.points)
		newSelectedIds.push(`${item.x} ${item.y}`);

	for (let i = 0; i < newSelectedIds.length; i++) {
		let obj = document.getElementById(newSelectedIds[i]);

		obj?.setAttribute(
			"class",
			`snake-body ${i === newSelectedIds.length - 1 ? "snake-head" : ""}`
		);
	}
};

const changeDirection = (e: KeyboardEvent) => {
	if (checkIfOppositeDirectionInput(e.key)) return undefined;
	switch (e.key) {
		case "ArrowRight":
			snake.direction = "right";
			break;
		case "ArrowLeft":
			snake.direction = "left";
			break;
		case "ArrowUp":
			snake.direction = "up";
			break;
		case "ArrowDown":
			snake.direction = "down";
			break;
	}
};

const autoWalk = () => {
	let key: string = "";
	switch (snake.direction) {
		case "right":
			key = "ArrowRight";
			break;
		case "left":
			key = "ArrowLeft";
			break;
		case "down":
			key = "ArrowDown";
			break;
		case "up":
			key = "ArrowUp";
			break;
	}
	const newSnake = checkKey(key);
	if (!newSnake) return;
	snake = newSnake;
	drawSnake(snake);
};

drawInitialMap();

window.addEventListener("keydown", changeDirection);
setInterval(autoWalk, 200);
