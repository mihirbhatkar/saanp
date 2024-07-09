type Snake = {
	points: SnakePoints;
	length: number;
	direction: string;
	alive: boolean;
};

type SnakePoints = { x: number; y: number; head?: boolean }[];
