import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Task } from './../task';
import { TaskService } from './../task.service';

@Component({
  selector: 'app-task-new',
  templateUrl: './task-new.component.html',
  styleUrls: ['./task-new.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TaskNewComponent implements OnInit {

  newTask: Task = new Task();
  
    constructor(private _taskService: TaskService) { }
  
    ngOnInit() {
    }
  
    onSubmit() {
      this._taskService.createTask(this.newTask);
      this.newTask = new Task();
    }
  

}
