import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Task} from '../../../models/Task';

@Component({
  selector: 'item-task',
  templateUrl: 'item-task.html'
})
export class ItemTask {
  @Input()
  task: Task;

  @Output()
  itemRemove = new EventEmitter();

  @Output()
  itemDetails = new EventEmitter();

  @Output()
  itemCheck = new EventEmitter();

  public remove() {
    this.itemRemove.emit(this.task);
  }

  public details() {
    this.itemDetails.emit(this.task);
  }

  public checkTask() {
    if (this.task.completed === 0) {
      this.task.completed = 1;
    } else {
      this.task.completed = 0;
    }
    this.itemCheck.emit(this.task);
  }

}
