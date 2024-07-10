import { renderGame, state, snake, startPoints, setWalkIntervalId } from "..";

export const resetGame = () => {
	let score = document.getElementById("score");
	if (score) {
		score.innerText = `Alive 🐍   Score - ${state.score}`;
	}

	state.score = 0;
	state.status = "playing";

	snake.points = [
		{ x: 1, y: 10 },
		{ x: 2, y: 10 },
		{ x: 3, y: 10 },
		{ x: 4, y: 10, head: true },
	];
	snake.length = 4;
	snake.direction = "down";
	snake.alive = true;

	const id = window.setInterval(renderGame, 200);
	setWalkIntervalId(id);
};

export const setMenu = () => {};
