import {Injectable} from '@angular/core';
import {Platform, ToastController} from 'ionic-angular';

declare var window: any;

@Injectable()
export class ToastService {

  constructor(private platform: Platform,
              private toastCtrl: ToastController) {

  }

  public showToast(message, position) {
    this.platform.ready().then(() => {
      if (window.plugins) {
        window.plugins.toast.show(message, "long", position);
      } else {
        let toast = this.toastCtrl.create({
          message: message,
          duration: 4000
        });
        toast.present();
      }
    });
  }

}
