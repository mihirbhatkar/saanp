import { snake } from "..";

export const drawSnake = () => {
	const selected = document.querySelectorAll(".snake-body");
	for (let item of selected) item.removeAttribute("class"); //  remove current snake

	const newSelectedIds = [];
	for (const item of snake.points) newSelectedIds.push(`${item.x} ${item.y}`);

	for (let i = 0; i < newSelectedIds.length; i++) {
		let obj = document.getElementById(newSelectedIds[i]);
		obj?.setAttribute(
			"class",
			`snake-body ${i === newSelectedIds.length - 1 ? "snake-head" : ""}`
		);
	}
};
