import { Component } from '@angular/core';
import {
  ModalController,
  AlertController,
  reorderArray,
  Platform,
  Events} from 'ionic-angular';
import { Task } from '../../models/Task';
import { AddPage } from '../add/add';
import { DetailsPage } from '../details/details';
import { ToastService } from '../../providers/toast-service/toast-service';
import { TaskService } from '../../providers/task-service/task-service';
import { SettingsService } from '../../providers/settings-service/settings-service';
// import {ItemTask} from '../modules/item-task/item-task';

@Component({
  templateUrl: 'home.html'
})
export class HomePage {

  tasks: Array<Task>;
  showCount: number = 1;

  constructor(public modalCtrl: ModalController,
              public alertCtrl: AlertController,
              public taskService: TaskService,
              public toastService: ToastService,
              public platform: Platform,
              public settingsService: SettingsService,
              public events: Events
  ) {

    if (!this.tasks) {
      this.tasks = new Array<Task>();
    }

    settingsService.getShowCount().then((data) => {
      if (data) {
        this.showCount = data;
      } else {
        this.showCount = 1;
      }

      if (this.isDevice()) {
        taskService.getTasks(this.showCount).then((data) => {
          let tasks = [];
          if (data.res.rows && data.res.rows.length > 0) {
            let rows = data.res.rows;
            if (rows.length > 0) {
              for (let i = 0; i < rows.length; i++) {
                let item = rows.item(i);
                let details = '';
                if (item.details && item.details !== 'null') {
                  details = item.details;
                }
                let task: Task = {
                  id: item.id,
                  name: item.name,
                  details: item.details,
                  count: item.count,
                  completed: item.completed,
                  showCount: this.showCount,
                  arrayIndex: item.arrayIndex,
                  header: item.header
                };
                tasks.push(task);
              }
              // console.log(JSON.stringify(tasks));
              return tasks;
            }
          }
        });
      }
    });

    events.subscribe('menu:clear', (eventData) => {
      // eventData is an array of parameters, so grab our first and only arg
      // console.log('Triggered clear!', eventData[0]);
      this.clear();
    });

  }

  ionViewWillEnter() {
    if (!this.tasks || this.tasks.length === 0) {
      return;
    }
    this.settingsService.getShowCount().then((data) => {
      if (data) {
        this.showCount = data;
      } else {
        this.showCount = 1;
      }
      if (this.tasks && this.tasks.length > 0) {
        for (var i=0; i<this.tasks.length; i++) {
          this.tasks[i].showCount = this.showCount;
        }
      }
    });
  }

  add() {
    let modal = this.modalCtrl.create(AddPage);
    modal.onDidDismiss(data => {
      if (data) {
        for (var i = 0; i < data.length; i++) {
          var task = new Task();
          task.name = data[i];
          task.details = '';
          task.count = 1;
          task.completed = 0;
          task.showCount = this.showCount;
          task.header = 0;

          if (this.isDevice()) {
            this.taskService.saveTask(task).then((data) => {
              let taskId = data.res["insertId"];
              return this.taskService.getTaskById(taskId, this.showCount);
            });
          } else {
            this.tasks.push(task);
          }
        }
      }
      console.log("home.ts: tasks.length="+this.tasks.length);
    });
    modal.present();
  }

  delete(task) {
    let index = this.tasks.indexOf(task);
    if (index > -1) {
      if (this.isDevice()) {
        this.taskService.removeTask(task.id).then((data) => {
          this.tasks.splice(index, 1);
        });
      } else {
        this.tasks.splice(index, 1);
      }
    }
  }

  details(task) {
    let modal = this.modalCtrl.create(DetailsPage, {task});
    modal.onDidDismiss((updatedTask: Task) => {
      if (this.isDevice()) {
        this.taskService.updateTask(updatedTask);
      }
      task = updatedTask;
    });
    modal.present();
  }

  reorderItems(indexes) {
    this.tasks = reorderArray(this.tasks, indexes);
    for (var i=0; i<this.tasks.length; i++) {
      this.tasks[i].arrayIndex = i;
      if (this.isDevice()) {
        this.taskService.updateTask(this.tasks[i]);
      }
    }
  }

  clear() {
    let alert = this.alertCtrl.create({
      title: 'Slette',
      message: 'Fjerne alt innhold i listen?',
      buttons: [
        {
          text: 'Avbryt',
          role: 'cancel',
          handler: () => {
            //do nothing
          }
        },
        {
          text: 'Ok',
          handler: () => {
            if (this.isDevice()) {
              this.taskService.removeAllTasks();
            }
            this.tasks = [];
          }
        }
      ]
    });
    alert.present();
  }

  // getTasksFromDb() {
  //   this.tasks = [];
  //   this.taskService.getTasks(this.showCount).then((data) => {
  //     if (data) {
  //       this.tasks = data;
  //     }
  //   });
  // }

  check(task) {
    if (this.isDevice()) {
      this.taskService.updateTask(task);
    }
  }

  private isDevice() {
    if (this.platform.is('cordova')) {
      return true;
    } else {
      return false;
    }
  }

}
