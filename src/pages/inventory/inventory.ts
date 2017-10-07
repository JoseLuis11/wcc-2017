import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Component } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

@Component({
  selector: 'page-inventory',
  templateUrl: 'inventory.html',
})
export class InventoryPage {

  id: string;
  product;
  isId: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public localNotifications: LocalNotifications,
    private toastCtrl: ToastController, private afDb:AngularFireDatabase, private afAuth: AngularFireAuth) {
    this.id = navParams.get('value');
    
    this.showToast(this.id);

    this.afAuth.authState.subscribe(data => {
      this.product = this.afDb.object(`/users/${data.uid}/${this.id}`);
    });

    if(this.product == null || this.product == undefined){
      this.isId = false;
    }else{
      this.isId = true;
    }
    

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

  private showToast(text: string) {
    this.toastCtrl.create({
      message: text,
      duration: 2500

    }).present();
  }

}
