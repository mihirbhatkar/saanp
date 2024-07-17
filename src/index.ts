import "./style.css";
import { drawInitialMap } from "./modules/mapGenerator";
import { keyPressHandler, moveSnake } from "./modules/snakeMovement";
import { drawSnake } from "./modules/drawSnake";

export const state = {
	score: 0,
	status: "playing",
};

export const lengthOfMap = 640;
export const breadthOfMap = 320;

export const side = 8; // side of a unit area

export const startPoints: SnakePoints = [
	{ x: 16, y: 16 },
	{ x: 16 + 8 * 4, y: 16, head: true },
]; // array points are going to be continous and in a straight horizontal line.

export const snake: Snake = {
	points: startPoints,
	length: 4,
	direction: "right",
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
	} else {
		drawSnake();
		window.requestAnimationFrame(renderGame);
	}
};

drawInitialMap();
export let walkIntervalId: number;
// setWalkIntervalId(window.setInterval(renderGame, 200));
window.requestAnimationFrame(renderGame);
window.addEventListener("keydown", keyPressHandler);
