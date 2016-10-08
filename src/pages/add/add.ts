import {Component} from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';

@Component({
  templateUrl: 'add.html'
})
export class AddPage {

  autosplit: boolean;
  newTasks: string;

  constructor(private navCtrl: NavController, public params: NavParams, public viewCtrl: ViewController) {
    this.autosplit = true;
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  save() {
    let taskArr = [];

    if(this.autosplit) {
      taskArr = this.newTasks.split(/[\n,]/);
    } else {
      taskArr = this.newTasks.split('\n');
    }
    for (var i=0; i<taskArr.length; i++) {
      taskArr[i] = taskArr[i].trim();
      if (taskArr[i].length === 0) {
        taskArr.splice(i, 1);
      }
    }
    this.viewCtrl.dismiss(taskArr);
  }

}
