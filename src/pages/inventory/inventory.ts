import { Component } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the InventoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-inventory',
  templateUrl: 'inventory.html',
})
export class InventoryPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public localNotifications: LocalNotifications) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InventoryPage');
  }

  notify(message: string) {
    this.localNotifications.schedule({
      text: 'Una de tus medicinas ha expirado',
      at: new Date(new Date().getTime() + 2500),
    });
  }

}
