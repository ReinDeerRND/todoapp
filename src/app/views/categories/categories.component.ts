import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../service/task.service';
import { Category } from '../../model/Category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css', '../../app.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];
  selectedCategory:Category;
  constructor(private dataHandler:TaskService) { }

  ngOnInit() {
    this.categories=this.dataHandler.getCategories();
  }
  showTasksByCategory(category:Category){
    this.selectedCategory=category;
    this.dataHandler.fillTasksByCategory(category);
  }
  showAllCategories(){
    this.dataHandler.fillTasks();
  }

}