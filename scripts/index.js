let matrix = [
	[1, 0],
	[0, 0],
];

let currentPosition = {
	x: 0,
	y: 0,
};

// let universalDirection = "right";

const checkKey = (e) => {
	const currentPositionOld = JSON.parse(JSON.stringify(currentPosition));
	switch (e.key) {
		case "ArrowRight":
			return { x: ++currentPositionOld.x, y: currentPositionOld.y };
		case "ArrowLeft":
			return { x: --currentPositionOld.x, y: currentPositionOld.y };
		case "ArrowUp":
			return { x: currentPositionOld.x, y: --currentPositionOld.y };
		case "ArrowDown":
			return { x: currentPositionOld.x, y: ++currentPositionOld.y };
		default:
			return undefined;
	}
};

// const stepExistence = () => {};

const walk = (e) => {
	const newSquare = checkKey(e);
	if (!newSquare) return; // don't do anything if other keys are pressed

	// check if step exists
	if (
		newSquare.x < 0 ||
		newSquare.y < 0 ||
		newSquare.x > 1 ||
		newSquare.y > 1
	) {
		// console.error(currentPosition);
		// console.error(newSquare);
		console.error("step doesn't exist!");
	} else {
		// console.log(newSquare);
		// console.info("exists!!");

		const selected = document.querySelector(".selected");
		const [x, y] = selected.id.split(" ").map(Number); // getting x and y coordinates

		selected.removeAttribute("class");

		currentPosition = { x: newSquare.x, y: newSquare.y };
		// console.info("the position after moving is ", currentPosition);

		const newSelectedId = `${currentPosition.x} ${currentPosition.y}`;
		document
			.getElementById(newSelectedId)
			.setAttribute("class", "selected");
	}
};

window.addEventListener("keydown", walk);
