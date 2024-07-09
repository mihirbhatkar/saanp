import { snake } from "..";

export const drawSnake = () => {
	const selected = document.querySelectorAll(".snake-body");
	for (let item of selected) item.removeAttribute("class"); //  remove current snake

	// const newSelectedIds = [];
	// for (const item of snake.points) newSelectedIds.push(`${item.x} ${item.y}`);

	for (const item of snake.points) {
		let obj = document.getElementById(`${item.x} ${item.y}`);
		obj?.setAttribute(
			"class",
			`snake-body ${item.head == true && "snake-head"}`
		);
	}
};
