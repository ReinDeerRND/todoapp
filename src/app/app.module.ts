import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CategoriesComponent } from './views/categories/categories.component';
import { TaskService } from './service/task.service';
import { TasksComponent } from './views/tasks/tasks.component';
import { NewTaskComponent } from './views/new-task/new-task.component';

@NgModule({
  imports: [BrowserModule, FormsModule, ReactiveFormsModule],
  declarations: [
    AppComponent,
    CategoriesComponent,
    TasksComponent,
    NewTaskComponent,
  ],
  bootstrap: [AppComponent],
  providers: [TaskService],
})
export class AppModule {}
