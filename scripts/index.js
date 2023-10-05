const side = 4;

let snake = {
	points: [
		{ x: 0, y: 0 }, // first element will be tail
		{ x: 1, y: 0 },
		{ x: 2, y: 0 }, // last element will be head
	],
	length: 3,
	direction: "right",
};

const newPoints = (points, direction) => {
	const newPoints = structuredClone(points);
	let newHead = newPoints.slice(-1)[0];

	let newX = newHead.x;
	let newY = newHead.y;
	switch (direction) {
		case "right":
			newPoints.push({ x: ++newX, y: newY });
			break;
		case "left":
			newPoints.push({ x: --newX, y: newY });
			break;
		case "up":
			newPoints.push({ x: newX, y: --newY });
			break;
		case "down":
			newPoints.push({ x: newX, y: ++newY });
			break;
	}
	newPoints.shift();
	return newPoints;
};

const checkKey = (e) => {
	const currentSnake = JSON.parse(JSON.stringify(snake));
	const pointsOld = currentSnake.points;

	let nextSnake = "";
	switch (e.key) {
		case "ArrowRight":
			nextSnake = {
				...currentSnake,
				points: newPoints(pointsOld, "right"),
			};
			break;
		case "ArrowLeft":
			nextSnake = {
				...currentSnake,
				points: newPoints(pointsOld, "left"),
			};
			break;
		case "ArrowUp":
			nextSnake = {
				...currentSnake,
				points: newPoints(pointsOld, "up"),
			};
			break;
		case "ArrowDown":
			nextSnake = {
				...currentSnake,
				points: newPoints(pointsOld, "down"),
			};
			break;
		default:
			return undefined;
	}
	if (checkIfStepExists(nextSnake)) {
		return nextSnake;
	} else return undefined;
};

const checkIfStepExists = (nextSnake) => {
	const head = nextSnake.points.slice(-1)[0];
	console.log(head.x, head.y);
	return !(
		head.x < 0 ||
		head.y < 0 ||
		head.x > side - 1 ||
		head.y > side - 1
	);
};

const drawSnake = (newSnake) => {
	const selected = document.querySelectorAll(".selected");
	for (let item of selected) item.removeAttribute("class"); //  remove current snake

	const newSelectedIds = [];
	for (const item of newSnake.points)
		newSelectedIds.push(`${item.x} ${item.y}`);

	for (const id of newSelectedIds)
		document.getElementById(id).setAttribute("class", "selected");
};

const walk = (e) => {
	const newSnake = checkKey(e);
	if (!newSnake) return; // don't do anything if other keys are pressed
	drawSnake(newSnake);
};

window.addEventListener("keydown", walk);
