import "./style.css";
import { drawInitialMap } from "./modules/mapGenerator";
import { changeDirection } from "./modules/snakeMovement";

console.log("Hi from index");

export const side = 24;

export const score = 0;

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

drawInitialMap();

window.addEventListener("keydown", changeDirection);
