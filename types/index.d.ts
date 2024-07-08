type Snake = {
	points: SnakePoints;
	length: number;
	direction: string;
};

type SnakePoints = { x: number; y: number; head?: boolean }[];
