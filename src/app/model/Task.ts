import { Priority } from './Priority';
import { Category } from './Category';

export type Task = {
  id: number;
  title: string;
  completed: boolean;
  priority?: Priority;
  category?: Category;
  date?: Date;
}


