import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SQLite } from 'ionic-native';
import { Task } from '../../models/Task';
import { ToastService } from '../toast-service/toast-service';

/*
 Generated class for the TaskService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class TaskService {

  // storage: Storage = null;
  // sqlCreateTableTask: string = "CREATE TABLE IF NOT EXISTS task (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, details TEXT, count INTEGER, completed INTEGER, arrayIndex INTEGER, header INTEGER)";

  public database: SQLite;
  public tasks: Array<Object>;

  constructor(public platform: Platform, public toastService: ToastService) {

    if (this.isDevice()) {
      this.database = new SQLite();
      this.database.openDatabase({name: "data.db", location: "default"}).then(() => {
        console.log("DATASE SUCCESSFULLY OPENED!");
      }, (error) => {
        console.log("ERROR: ", error);
      });
    } else {
      console.log("Database not initialized, as we're in a browser");
    }

  }

  public dropTable(table: string) {
    if (this.isDevice()) {
      return;
    }
    this.database.executeSql('DROP TABLE IF EXISTS '+table+' ', []);
  }

  public getTasks(showHideCount: number) {
    if (this.isDevice()) {
      return;
    }
    return this.database.executeSql("SELECT id, name, details, count, completed, arrayIndex, header FROM task ORDER BY arrayIndex, id", []);
  }

  public getTaskById(id: number, showHideCount: number) {
    if (this.isDevice()) {
      return;
    }
    return this.database.executeSql("SELECT id, name, details, count, completed, arrayIndex, header FROM task WHERE id = ? ", [id]).then((data) => {
      if (data.res.rows.length === 1) {
        let item = data.res.rows.item(0);
        let task: Task = {
          id: item.id,
          name: item.name,
          details: item.details,
          count: item.count,
          completed: item.completed,
          showCount: showHideCount,
          arrayIndex: item.arrayIndex,
          header: item.header
        };
        return task;
      }
      return null;
    });
  }

  public saveTask(task: Task) {
    if (this.isDevice()) {
      return;
    }
    return this.database.executeSql("INSERT INTO task (name, details, count, completed, arrayIndex, header) VALUES (?, ?, ?, ?, ?, ?)", [task.name, task.details, task.count, task.completed, task.arrayIndex, task.header]);
  }

  public updateTask(task: Task) {
    if (this.isDevice()) {
      return;
    }
    let sql: string = 'UPDATE task SET name=?, details=?, count=?, completed=?, arrayIndex=?, header=? WHERE id=? ';
    this.database.executeSql(sql, [task.name, task.details, task.count, task.completed, task.arrayIndex, task.header, task.id]);
  }

  public removeTask(id: number) {
    if (this.isDevice()) {
      return;
    }
    let sql = 'DELETE FROM task WHERE id = ? ';
    return this.database.executeSql(sql, [id]);
  }

  public removeAllTasks() {
    if (this.isDevice()) {
      return;
    }
    let sql = 'DELETE FROM task';
    this.database.executeSql(sql, []);
  }

  private isDevice() {
    if (this.platform.is('cordova')) {
      return true;
    } else {
      return false;
    }
  }
}

