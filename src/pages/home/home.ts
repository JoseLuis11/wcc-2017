import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  barcodeValue:String;

  constructor(public navCtrl: NavController,
    private barcodeScanner: BarcodeScanner, 
    public toastCtrl: ToastController) {

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
