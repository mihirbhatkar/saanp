import "./style.css";
import { drawInitialMap } from "./modules/mapGenerator";
import { keyPressHandler, compute } from "./modules/snakeMovement";
import { drawMap } from "./modules/drawSnake";

export const state = {
	score: 0,
	status: "playing",
};

export const lengthOfMap = 8;
export const breadthOfMap = 6;

export const snake: Snake = {
	points: [
		{ x: 1, y: 2, direction: "right" }, // tail
		{ x: 2, y: 2, direction: "right" },
		{ x: 3, y: 2, direction: "right" }, // head
	],
	alive: true,
};

let previousTimeStamp: any = undefined;

export const renderGame = (timeStamp: number) => {
	if (!previousTimeStamp) {
		previousTimeStamp = timeStamp;
	}
	let elapsed = timeStamp - previousTimeStamp;

	if (elapsed >= 1000) {
		compute();
		previousTimeStamp = timeStamp;
		elapsed = 0;
	}

	if (snake.alive) {
		drawMap(Math.min(elapsed / 10, 99));
		window.requestAnimationFrame(renderGame);
	} else {
		let score = document.getElementById("score");
		if (score) {
			score.innerText = `Dead 💀   Score - ${state.score}`;
		}
	}
};

drawInitialMap();
window.requestAnimationFrame(renderGame);
window.addEventListener("keydown", keyPressHandler);
