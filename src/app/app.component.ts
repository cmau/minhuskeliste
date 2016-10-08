import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, SQLite } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';


@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = TabsPage;

  sqlCreateTableTask: string = "CREATE TABLE IF NOT EXISTS task (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, details TEXT, count INTEGER, completed INTEGER, arrayIndex INTEGER, header INTEGER)";

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();

      if (platform.is('cordova')) {
        console.log("You're running on a device with Cordova!");

        let db = new SQLite();
        db.openDatabase({
          name: "data.db",
          location: "default"
        }).then(() => {
          db.executeSql(this.sqlCreateTableTask, {}).then((data) => {
            console.log("TABLE CREATED: ", data);
          }, (error) => {
            console.error("Unable to execute sql", error);
          })
        }, (error) => {
          console.error("Unable to open database", error);
        });

      }else{
        console.log("You're running from a browser");
      }
    });
  }
}
