import { breadthOfMap, lengthOfMap, snake } from "..";

const canvas = <HTMLCanvasElement>document.getElementById("myCanvas");
const ctx = canvas?.getContext("2d");
const snakeWidth = 10;
const scale = 100;
export const drawMap = (offset: number) => {
  if (ctx) {
    ctx.clearRect(0, 0, lengthOfMap * scale, breadthOfMap * scale);
    ctx.fillStyle = "lightgreen";
    ctx.fillRect(0, 0, lengthOfMap * scale, breadthOfMap * scale);

    ctx.fillStyle = "darkgreen";
    for (let i = 0; i < breadthOfMap; i++) {
      for (let j = 0; j < lengthOfMap; j++) {
        if (i % 2 == 0) {
          if (j % 2 != 0) ctx.fillRect(i * scale, j * scale, 100, 100);
        } else {
          if (j % 2 == 0) ctx.fillRect(i * scale, j * scale, 100, 100);
        }
      }
    }

    ctx.beginPath();
    ctx.lineWidth = snakeWidth;
    ctx.strokeStyle = "black";
    let head = snake.points[snake.points.length - 1];
    let tail = snake.points[0];
    //console.log(...snake.breakpoints);
    const [tailX, tailY] = getCoordinates(tail, offset);
    ctx.lineTo(tailX + scale / 2, tailY + scale / 2);
    for (let point of snake.breakpoints) {
      ctx.lineTo(point.x * scale + scale / 2, point.y * scale + scale / 2);
    }
    const [headX, headY] = getCoordinates(head, offset);
    ctx.lineTo(headX + scale / 2, headY + scale / 2);

    ctx.stroke();
  }
};

function getCoordinates(point: SnakePoint, offset: number): number[] {
  switch (point.direction) {
    case "right":
      return [point.x * scale + offset, point.y * scale];
    case "left":
      return [point.x * scale - offset, point.y * scale];
    case "down":
      return [point.x * scale, point.y * scale + offset];
    case "up":
      return [point.x * scale, point.y * scale - offset];
  }
  return [];
}
