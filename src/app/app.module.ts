import { NgModule } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { AddPage } from '../pages/add/add';
import { DetailsPage } from '../pages/details/details';
import { SettingsPage } from '../pages/settings/settings';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ItemTask } from '../pages/modules/item-task/item-task';
import { TaskService } from '../providers/task-service/task-service';
import { ToastService } from '../providers/toast-service/toast-service';
import { SettingsService } from '../providers/settings-service/settings-service';

@NgModule({
  declarations: [
    MyApp,
    AddPage,
    DetailsPage,
    SettingsPage,
    HomePage,
    TabsPage,
    ItemTask
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AddPage,
    SettingsPage,
    DetailsPage,
    HomePage,
    TabsPage,
    ItemTask
  ],
  providers: [Storage, TaskService, ToastService, SettingsService]
})
export class AppModule {}
