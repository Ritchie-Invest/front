import { Game } from './game';

export interface Lesson {
  id: number;
  title: string;
  description: string;
  games: Game[];
}
