import { Injectable } from '@angular/core';
import { Category } from '../model/Category';
import { Task } from '../model/Task';
import { Priority } from '../model/Priority';
import { TestData } from '../data/TestData';
import { Subject } from 'rxjs';

@Injectable()
export class TaskService {
  taskSubject = new Subject<Task[]>();
  newTaskSubject = new Subject<void>();
  toggleTaskSubject = new Subject<void>();

  constructor() {}

  getCategories(): Category[] {
    return TestData.categories;
  }
  getPriorities(): Priority[] {
    return TestData.priorities;
  }

  getTasks(): Task[] {
    return TestData.tasks;
  }
  fillTasks() {
    this.taskSubject.next(TestData.tasks);
  }
  // getTasksByCategory(category: Category): Task[] {
  //   const tasks = TestData.tasks.filter(task => task.category === category);
  //   console.log(tasks);
  //   return tasks;
  // }
  fillTasksByCategory(category: Category) {
    const tasks = TestData.tasks.filter((task) => task.category === category);
    this.taskSubject.next(tasks);
  }
  makeNewTask() {
    this.newTaskSubject.next();
  }
  findMaxId(): number {
    let max: number = 0;
    for (let i = 0; i < TestData.tasks.length; i++) {
      if (TestData.tasks[i].id > max) max = TestData.tasks[i].id;
    }
    return max;
  }
  addTasktoList(task: string, category: string, priority: string, date: Date) {
    // if (d == 'Invalid Date') {
    //   d = new Date();
    // }
    let newTask: Task = {
      id: this.findMaxId() + 1,
      title: task,
      completed: false,
      priority: TestData.priorities.find((e) => e.title == priority),
      category: TestData.categories.find((e) => e.title == category),
      date: new Date(date)
    }
    TestData.tasks.unshift(newTask);
    this.toggleTaskSubject.next();
  }
  removeTask(id: number) {
    let deletedTask: Task = TestData.tasks.find((e) => e.id === id);
    TestData.tasks = TestData.tasks.filter((obj) => obj !== deletedTask);
    this.taskSubject.next(TestData.tasks);
  }
  calculateEfficiency(): number {
    let completedTasks: number = 0;
    for (let i = 0; i < TestData.tasks.length; i++) {
      if (TestData.tasks[i].completed == true) completedTasks++;
    }
    return completedTasks;
  }
  getTasksAmount(): number {
    return TestData.tasks.length;
  }
}
