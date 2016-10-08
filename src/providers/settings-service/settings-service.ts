import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class SettingsService {

  constructor(public storage: Storage) {

  }

  public setShowCount(show: number) {
    this.storage.set('showCount', show);
  }

  public getShowCount() {
    return this.storage.get('showCount');
  }

}
