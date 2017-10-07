
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, App, ToastController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//services
import { AuthenticationService } from './../providers/authentication.service';

import { HomePage } from '../pages/home/home';
import {UserProfilePage} from '../pages/user-profile/user-profile';
import {LoginPage} from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, private app: App , public statusBar: StatusBar, public splashScreen: SplashScreen, private authService: AuthenticationService,
  private toastCtrl:ToastController, private menuCtrl: MenuController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Inventario', component: HomePage },
      {title: 'Perfil', component: UserProfilePage}
    ];

  }
  
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  signOut(){
    this.authService.signOut();
    this.app.getRootNav().setRoot(LoginPage);
    this.showToast("Sesión cerrada.")
    this.menuCtrl.enable(false);
    this.menuCtrl.close();
  }

  private showToast(text: string) {
    this.toastCtrl.create({
      message: text,
      duration: 2500

    }).present();
  }

}
