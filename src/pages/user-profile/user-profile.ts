import { AuthenticationService } from './../../providers/authentication.service';
import { LoginPage } from './../login/login';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController, AlertController } from 'ionic-angular';

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
    private toastCtrl: ToastController, private alertCtrl: AlertController, private loadingCtrl: LoadingController, private authService: AuthenticationService) {
    this.subscription = this.afAuth.authState.subscribe(data => {
      this.profile = this.afDb.object(`/users/${data.uid}`).valueChanges();
      this.email = data.email;
      console.log(this.profile);
    });
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
      title: 'Eliminar',
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

  showConfirmPass(){
    let confirm = this.alertCtrl.create({
      title: 'Cambiar contraseña',
      message: '¿Seguro que quieres cambiar tu contraseña?',
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
            this.changePassword();
          }
        }
      ]
    });
    confirm.present();
  }

  changePassword() {
    
            let email: string;
    
            this.afAuth.authState.take(1).subscribe(auth => {
    
                email = auth.email;
    
                let loading = this.loadingCtrl.create({
                    content: 'Enviando correo...'
                });
                loading.present();
    
                this.authService.resetPassword(email).then(result => {
                    loading.dismiss();
                    this.showToast("Correo enviado a tu email.");
                    
                }).catch(error => {
                    this.showToast("Algo salió mal, intentalo nuevamente.");
                });
            });
    
        }


  showToast(text: string) {
    this.toastCtrl.create({
      message: text,
      duration: 2500

    }).present();
  }

}
