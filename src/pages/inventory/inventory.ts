import { Product } from './../../interfaces/product.interface';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Component } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

@Component({
  selector: 'page-inventory',
  templateUrl: 'inventory.html',
})
export class InventoryPage {

  id: string;

  isId: boolean = false;

  productRef: AngularFireObject<any>;

  product: Observable<Product>;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public localNotifications: LocalNotifications,
    private toastCtrl: ToastController, 
    private afDb: AngularFireDatabase, 
    private afAuth: AngularFireAuth) {
    this.id = navParams.get('value');

    this.afAuth.authState.subscribe(data => {
      this.productRef = this.afDb.object(`/users/${data.uid}/inventory/${this.id}`);
      this.product = this.productRef.valueChanges();

    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InventoryPage');
  }

  private showToast(text: string) {
    this.toastCtrl.create({
      message: text,
      duration: 2500

    }).present();
  }
}
