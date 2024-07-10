import "./style.css";
import { drawInitialMap } from "./modules/mapGenerator";
import { keyPressHandler, moveSnake } from "./modules/snakeMovement";
import { drawSnake } from "./modules/drawSnake";

export const state = {
	score: 0,
	status: "playing",
};

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

export const setWalkIntervalId = (id: number) => {
	walkIntervalId = id;
};

export const renderGame = () => {
	moveSnake();
	if (!snake.alive) {
		let score = document.getElementById("score");
		if (score) {
			score.innerText = `Dead 💀   Score - ${state.score}`;
		}
		window.clearInterval(walkIntervalId);
	} else {
		drawSnake();
	}
};

drawInitialMap();
export let walkIntervalId: number;
setWalkIntervalId(window.setInterval(renderGame, 200));
window.addEventListener("keydown", keyPressHandler);
