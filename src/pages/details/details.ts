import {Component} from '@angular/core';
import {NavParams, ViewController} from 'ionic-angular';
import {Task} from '../../models/Task';
import {TaskService} from '../../providers/task-service/task-service';
import {ToastService} from '../../providers/toast-service/toast-service';

@Component({
  templateUrl: 'details.html',
  providers: [TaskService, ToastService]
})
export class DetailsPage {

  task: Task;

  constructor(public params: NavParams,
              public viewCtrl: ViewController) {
    this.task = this.params.get('task');
  }

  public dismiss() {
    this.viewCtrl.dismiss(this.task);
  }

  public header() {
    if (this.task.header === 1) {
      this.task.header = 0;
    } else {
      this.task.header = 1;
    }
  }

  selectAll(event): void {
    event.target.select();
  }

}
