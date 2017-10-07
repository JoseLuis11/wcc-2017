import { AngularFireDatabase } from 'angularfire2/database';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';


//pages
import { MyApp } from './app.component';
import { 
  HomePage, 
  RegisterPage, 
  LoginPage, 
  ListPage, 
  UserProfilePage,
  InventoryPage
 } from '../pages/index.pages';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//services
import { AuthenticationService } from './../providers/authentication.service';

//firebase
import { AngularFireModule } from 'angularfire2';
import { firebaseConfig } from './../config/firebase.config';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { BarcodeScanner } from "@ionic-native/barcode-scanner";


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    RegisterPage,
    UserProfilePage,
    InventoryPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule, 
    AngularFireAuthModule
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    RegisterPage,
    UserProfilePage,
    InventoryPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthenticationService,
    AngularFireDatabase,
    AngularFireAuthModule,,
    BarcodeScanner,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
