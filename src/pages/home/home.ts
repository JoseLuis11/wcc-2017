import { AddProductPage } from './../add-product/add-product';
import { Product } from './../../interfaces/product.interface';
import { Component } from '@angular/core';
import { NavController, ToastController, ModalController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
//Agregar pagina para direccionar el modal
import { InventoryPage } from '../index.pages';

//firebase
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  barcodeValue: String;
  products: Observable<Product[]>;

  subscription: Subscription;

  constructor(public navCtrl: NavController,
    private barcodeScanner: BarcodeScanner,
    public toastCtrl: ToastController,
    private modalCtrl: ModalController,
    private afAuth: AngularFireAuth,
    private afDb: AngularFireDatabase) {

    this.subscription = this.afAuth.authState.subscribe(data => {
      this.products = this.afDb.list(`/users/${data.uid}/inventory`).valueChanges();
    });

  }
  public scan() {
    this.barcodeScanner.scan().then((barcodeData) => {

      this.openModal(barcodeData.text);

      console.log("Value: ", barcodeData.text);
      this.barcodeValue = barcodeData.text;


    }, (err) => {
      console.log("Error: ", err);
      this.showError(err);
    });
  }

  public scan2() {

  }





  public addProduct() {

    this.barcodeScanner.scan().then((barcodeData) => {


      console.log("Value: ", barcodeData.text);
      this.barcodeValue = barcodeData.text;

      let modal = this.modalCtrl.create(AddProductPage, { value: this.barcodeValue });

      modal.present();

    }, (err) => {
      console.log("Error: ", err);
      this.showError(err);
    });

  }

  private openModal(value: string) {
    let modal = this.modalCtrl.create(InventoryPage, { value: value });

    modal.present();
  }

  private showError(msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2500
    });
    toast.present();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private deleteProduct(productKey: string) {

    let uid = this.afAuth.auth.currentUser.uid;

    const itemsRef = this.afDb.list(`users/${uid}/inventory`);
    // to get a key, check the Example app below
    itemsRef.remove(productKey);
  }

}
