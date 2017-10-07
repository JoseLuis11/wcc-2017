import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {

  profile;
  name: string;
  email: string;
  

  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth, private afDb: AngularFireDatabase) {
  }


  ionViewDidLoad() {
    this.afAuth.authState.subscribe(data => {
      this.profile = this.afDb.object(`/users/${data.uid}`).valueChanges();
      this.email = data.email;
      console.log(this.profile);
    });
  }

    

  

}
