import { Component, OnInit } from "@angular/core";
import { TaskService } from "../../service/task.service";
import { Task } from "../../model/Task";

@Component({
  selector: "app-tasks",
  templateUrl: "./tasks.component.html",
  styleUrls: ["./tasks.component.css", '../../app.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Task[];
  completedTasks: number;
  tasksAmount: number;

  constructor(private dataHandler: TaskService) {}

  ngOnInit() {
    this.tasks = this.dataHandler.getTasks();
    this.dataHandler.taskSubject.subscribe(tasks => (this.tasks = tasks));
    this.changeEfficiency();
    this.dataHandler.taskSubject.subscribe(tasks=>this.changeEfficiency());
    this.dataHandler.toggleTaskSubject.subscribe(()=>this.changeEfficiency());
  }
  toggleTaskCompleted(task: Task) {
    task.completed = !task.completed;
    this.dataHandler.toggleTaskSubject.next();
  }

  showNewTask() {
    this.dataHandler.makeNewTask();
  }
  deleteTask(id: number) {
    this.dataHandler.removeTask(id);
  }

  changeEfficiency() {
    this.completedTasks = this.dataHandler.calculateEfficiency();
    this.tasksAmount = this.dataHandler.getTasksAmount();
  }
}
