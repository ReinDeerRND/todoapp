import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../service/task.service';
import { Category } from '../../model/Category';
import { Priority } from '../../model/Priority';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css', '../../app.component.css'],
})
export class NewTaskComponent implements OnInit {
  visibleMenu: boolean;
  categories: Category[];
  priorities: Priority[];
  taskForm: FormGroup;

  constructor(private dataHandler: TaskService) {}

  ngOnInit() {
    this.taskForm = new FormGroup({
      taskContent: new FormControl(null, [Validators.required]),
      category: new FormControl(),
      priority: new FormControl(),
      taskDate: new FormControl(new Date()),
    });
    this.visibleMenu = false;
    this.dataHandler.newTaskSubject.subscribe(() => (this.visibleMenu = true));
    this.priorities = this.dataHandler.getPriorities();
    this.categories = this.dataHandler.getCategories();
  }
  addAndCloseMenu() {
    console.log(this.taskForm);
    let newTask = this.taskForm.value;
    this.dataHandler.addTasktoList(
      newTask.taskContent,
      newTask.category,
      newTask.priority,
      newTask.taskDate
    );
    this.closeMenu();
  }
  closeMenu() {
    this.visibleMenu = false;
  }
}
