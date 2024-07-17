type Snake = {
	head: SnakePoint;
	tail: SnakePoint;
	breakpoints: SnakePoint[];
	alive: boolean;
};

type SnakePoint = { x: number; y: number; direction: string };
