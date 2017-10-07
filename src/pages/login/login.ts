import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ToastController, LoadingController } from 'ionic-angular';

//pages
import { HomePage } from './../home/home';
import { RegisterPage } from './../register/register';

//firebase
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

//models
import { UserModel } from './../../interfaces/user.interface';

//services
import { AuthenticationService } from './../../providers/authentication.service';




/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  registerPage = RegisterPage;
  homePage = HomePage;

  user = {} as UserModel;

  constructor(public navCtrl: NavController, public navParams: NavParams, private menuCtrl: MenuController,
    private afAuth: AngularFireAuth, private afDb: AngularFireDatabase, private loadingCtrl: LoadingController,
    private authService: AuthenticationService, private toastCtrl: ToastController) {
    menuCtrl.enable(false);
  }

  ionViewDidLoad() {

    this.user.email = '';
    this.user.password = '';

  }

  login(){
    let loading = this.loadingCtrl.create({
      content: 'Iniciando sesión. Por favor, espere...'
    });
    loading.present();

    this.authService.signInWithEmailAndPassword(this.user).then(result => {
      loading.dismiss();
      this.menuCtrl.enable(true);
      this.navCtrl.setRoot(this.homePage);
      
    }).catch(error => {
      loading.dismiss();
      if (error.message.includes("There is no user record corresponding to this identifier")) {
        this.showToast('Usuario inexistente.');
      } else if (error.message.includes("The password is invalid")) {
        this.showToast('Contraseña incorrecta.');
      }
      else {
        this.showToast('Ha ocurrido un error inesperado. Por favor intente nuevamente.');
      }
      console.log(error);

    });
    
  }

  private showToast(text: string) {
    this.toastCtrl.create({
      message: text,
      duration: 2500

    }).present();
  }

}
