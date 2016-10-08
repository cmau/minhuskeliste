import {Component} from '@angular/core';
import {TaskService} from '../../providers/task-service/task-service';
import {SettingsService} from '../../providers/settings-service/settings-service';
import {ToastService} from '../../providers/toast-service/toast-service';

@Component({
  templateUrl: 'settings.html'
})
export class SettingsPage {

  showCount: number;
  hiddenClearDbCounter: number;

  constructor(private taskService: TaskService,
              private settingsService: SettingsService,
              private toastService: ToastService
  ) {

    settingsService.getShowCount().then((data) => {
      if (data) {
        this.showCount = data;
      } else {
        this.showCount = 1;
      }
    });
  }

  public ionViewWillEnter() {
    this.hiddenClearDbCounter = 0;
  }

  public toggleShowCount() {
    this.hiddenClearDbCounter++;
    if (this.showCount) {
      this.settingsService.setShowCount(1);
    } else {
      this.settingsService.setShowCount(0);
    }

    if (this.hiddenClearDbCounter === 5) {
      this.toastService.showToast('Five more to go!', 'center');
    }
    if (this.hiddenClearDbCounter === 10) {
      this.hiddenClearDbCounter = 0;
      this.taskService.dropTable('task');
      this.toastService.showToast('Table task dropped!', 'center');
    }
  }

  // public clearDb() {
  //   this.taskService.dropAndRecreateTable('task');
  // }
}
