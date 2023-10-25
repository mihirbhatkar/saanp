const side = 8;

let snake = {
    points: [
        { x: 0, y: 0 }, // first element will be tail
        { x: 1, y: 0 },
        { x: 2, y: 0 },
    ],
    length: 3,
    direction: "right",
};

const newFruitPosition = (snake) => {
    let isColliding = true;
    let newX, newY;

    while (isColliding) {
        newX = Math.floor(Math.random() * 8);
        newY = Math.floor(Math.random() * 8);

        // Check if the new position collides with the snake's points
        isColliding = snake.points.some(point => point.x === newX && point.y === newY);
    }

    return { x: newX, y: newY };
}
class Fruit {
    constructor(snake) {
        this.position = newFruitPosition(snake);
    }
}

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

const checkIfOppositeDirectionInput = (direction) => {
    switch (direction) {
        case "ArrowRight":
            return snake.direction === "left";
        case "ArrowLeft":
            return snake.direction === "right";
        case "ArrowUp":
            return snake.direction === "down";
        case "ArrowDown":
            return snake.direction === "up";
    }
};

const checkKey = (e) => {
    if (checkIfOppositeDirectionInput(e.key)) return undefined;

    const currentSnake = structuredClone(snake);
    const pointsOld = currentSnake.points;
    let nextSnake = "";
    switch (e.key) {
        case "ArrowRight":
            nextSnake = {
                ...currentSnake,
                points: newPoints(pointsOld, "right"),
                direction: "right",
            };
            break;
        case "ArrowLeft":
            nextSnake = {
                ...currentSnake,
                points: newPoints(pointsOld, "left"),
                direction: "left",
            };
            break;
        case "ArrowUp":
            nextSnake = {
                ...currentSnake,
                points: newPoints(pointsOld, "up"),
                direction: "up",
            };
            break;
        case "ArrowDown":
            nextSnake = {
                ...currentSnake,
                points: newPoints(pointsOld, "down"),
                direction: "down",
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

    for (let i = 0; i < newSelectedIds.length; i++)
        document
            .getElementById(newSelectedIds[i])
            .setAttribute(
                "class",
                `selected ${i === newSelectedIds.length - 1 ? "head" : ""}`
            );
};

const changeDirection = (e) => {

    if (checkIfOppositeDirectionInput(e.key)) return undefined;
    switch (e.key) {
        case "ArrowRight":
            snake.direction = "right";
            break;
        case "ArrowLeft":
            snake.direction = "left";
            break;
        case "ArrowUp":
            snake.direction = "up";
            break;
        case "ArrowDown":
            snake.direction = "down";
            break;
    }
};


const autoWalk = () => {

    let key = "";
    switch (snake.direction) {
        case "right":
            key = "ArrowRight";
            break;
        case "left":
            key = "ArrowLeft";
            break;
        case "down":
            key = "ArrowDown";
            break;
        case "up":
            key = "ArrowUp";
            break;
    }
    const newSnake = checkKey({ key: key });
    if (!newSnake) return;
    snake = newSnake;
    drawSnake(snake);
}

window.addEventListener("keydown", changeDirection);
setInterval(autoWalk, 1000);
