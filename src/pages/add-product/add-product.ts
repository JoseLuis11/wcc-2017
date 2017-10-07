import { LocalNotifications } from '@ionic-native/local-notifications';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Product } from './../../interfaces/product.interface';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

@Component({
  selector: 'page-add-product',
  templateUrl: 'add-product.html',
})
export class AddProductPage {

  product = {} as Product;

  id:string;
  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private toastCtrl: ToastController,
    private afAuth: AngularFireAuth, 
    private afDb: AngularFireDatabase, 
    private localNotifications: LocalNotifications) {

    this.id = navParams.get('value');
  }

  addToInventory() {
    let uid = this.afAuth.auth.currentUser.uid;
    
    this.product.pid = this.id;

      this.afDb.object(`users/${uid}/inventory/${this.id}`).set(this.product).then(() => {
        
        this.notify(this.product.name, this.product.expiredDate);
        this.navCtrl.pop();
      }).catch(error => {
        this.showToast("Algo salió mal, intentalo de nuevo.");
        console.log(error);
      });
    
  }

  private showToast(text: string) {
    this.toastCtrl.create({
      message: text,
      duration: 2500

    }).present();
  }

  notify(name: string, date: string) {
    this.localNotifications.schedule({
      text: name + ' ha expirado',
      at: new Date(date),
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddProductPage');
  }
}
