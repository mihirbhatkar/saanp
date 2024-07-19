import "./style.css";
import { drawInitialMap } from "./modules/mapGenerator";
import { keyPressHandler, moveSnake } from "./modules/snakeMovement";
import { drawSnake } from "./modules/drawSnake";

export const state = {
	score: 0,
	status: "playing",
};

export const lengthOfMap = 800;
export const breadthOfMap = 600;

export const side = 10; // side of a unit area

export const snake: Snake = {
	tail: { x: 16, y: 16, direction: "right" },
	head: { x: 16 + 8 * 16, y: 16, direction: "right" },
	breakpoints: [],
	alive: true,
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
window.requestAnimationFrame(renderGame);
window.addEventListener("keydown", keyPressHandler);
