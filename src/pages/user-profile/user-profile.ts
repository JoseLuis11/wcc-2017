import { LoginPage } from './../login/login';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {

  profile;
  name: string;
  email: string;
  subscription;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth, private afDb: AngularFireDatabase,
    private toastCtrl: ToastController, private alertCtrl: AlertController) {
    this.subscription = this.afAuth.authState.subscribe(data => {
      this.profile = this.afDb.object(`/users/${data.uid}`).valueChanges();
      this.email = data.email;
      console.log(this.profile);

    });


  }


  ionViewDidLoad() {

  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  deleteUser() {

    let user = this.afAuth.auth.currentUser;

    this.afAuth.authState.subscribe(data => {

      this.showToast("Usuario eliminado con exito.");
      

      this.subscription.unsubscribe();
      user.delete().then(function () {
        
        const profile = this.afDb.object(`/users/${user.uid}`);
        profile.remove();
        this.goToLogin();
        
      }, function (error) {
        this.showToast("Algo salió mal, intentalo de nuevo.")
      });
    });
  }

  goToLogin() {
    this.navCtrl.setRoot(LoginPage);
  }

  showConfirm(userKey: string) {
    let confirm = this.alertCtrl.create({
      title: 'Alerta',
      message: '¿Seguro que quieres eliminar tu usuario?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('No seleccionado');
          }
        },
        {
          text: 'Sí',
          handler: () => {
            this.deleteUser();
          }
        }
      ]
    });
    confirm.present();
  }


  showToast(text: string) {
    this.toastCtrl.create({
      message: text,
      duration: 2500

    }).present();
  }

}
