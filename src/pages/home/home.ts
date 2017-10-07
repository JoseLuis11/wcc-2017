import { Component } from '@angular/core';
import { NavController, ToastController, ModalController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
//Agregar pagina para direccionar el modal
import {  } from '../index.pages';

//firebase
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  barcodeValue:String;
  products;

  constructor(public navCtrl: NavController,
    private barcodeScanner: BarcodeScanner, 
    public toastCtrl: ToastController,
    private modalCtrl: ModalController,
    private afAuth: AngularFireAuth,
    private afDb: AngularFireDatabase) {

      this.afAuth.authState.subscribe(data => {
        this.products = this.afDb.list(`/users/${data.uid}/inventory`).valueChanges();  
      });

  }
  public scan(){
    this.barcodeScanner.scan().then((barcodeData) => {
      console.log("Value: ",barcodeData.text);
      this.barcodeValue = barcodeData.text;
     }, (err) => {
       console.log("Error: ",err);
      this.showError(err);
     });
  }

  private showError(msg: string){
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2500
    });
    toast.present();
  }

  private deleteProduct(){
    
  }

}
