import { renderGame, state, snake } from "..";

export const resetGame = () => {
	let score = document.getElementById("score");
	if (score) {
		score.innerText = `Alive 🐍   Score - ${state.score}`;
	}

	state.score = 0;
	state.status = "playing";

	snake.points = [
		{ x: 1, y: 1, direction: "right" }, // tail
		{ x: 2, y: 1, direction: "right" },
		{ x: 3, y: 1, direction: "right" }, // head
	];
	snake.alive = true;

	window.requestAnimationFrame(renderGame);
};

export const setMenu = () => {};
