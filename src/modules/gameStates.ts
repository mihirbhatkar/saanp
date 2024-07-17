import { renderGame, state, snake } from "..";

export const resetGame = () => {
	let score = document.getElementById("score");
	if (score) {
		score.innerText = `Alive 🐍   Score - ${state.score}`;
	}

	state.score = 0;
	state.status = "playing";

	snake.breakpoints = [];
	snake.tail = { x: 16, y: 16, direction: "right" };
	snake.head = { x: 16 + 8 * 16, y: 16, direction: "right" };
	snake.alive = true;

	window.requestAnimationFrame(renderGame);
};

export const setMenu = () => {};
