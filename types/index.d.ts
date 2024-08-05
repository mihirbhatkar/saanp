type Snake = {
  points: SnakePoint[];
  alive: boolean;
  breakpoints: SnakePoint[];
};

type SnakePoint = { x: number; y: number; direction: string };
