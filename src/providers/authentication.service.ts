import { Injectable } from '@angular/core';

//models
import { Profile } from './../interfaces/profile.interface';
import { UserModel } from './../interfaces/user.interface';


//angular fire imports
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

//firebase authentication
import { User } from 'firebase/app'

//TODO: use this providers
import { NavController, ToastController, LoadingController } from 'ionic-angular';

@Injectable()
export class AuthenticationService {

    user: User;

    constructor(private afAuth: AngularFireAuth, private afDb: AngularFireDatabase, private toastCtrl: ToastController) {
        afAuth.authState.subscribe((user: User) => {
            this.user = user;
        });
    }

    get authenticated(): boolean {
        return this.user != null;
    }

    signInWithEmailAndPassword(userModel: UserModel): Promise<any> {
        return this.afAuth.auth.signInWithEmailAndPassword(userModel.email, userModel.password);
    }

    createUserWithEmailAndPassword(userModel: UserModel): Promise<any> {
        return this.afAuth.auth.createUserWithEmailAndPassword(userModel.email, userModel.password);
    }

    signOut(): Promise<any> {
        return this.afAuth.auth.signOut();
    }

    createProfile(profile: Profile) {

        this.afAuth.authState.take(1).subscribe(auth => {
            this.afDb.object(`users/${auth.uid}`).set(profile).then(() => {
            }).catch(error => {
                this.showToast("Algo salió mal, intentalo de nuevo.");
                console.log(error);
            })
        })
    }

    private showToast(text: string) {
        this.toastCtrl.create({
            message: text,
            duration: 2500
        }).present();
    }

    resetPassword(email: string): Promise<any> {
        return this.afAuth.auth.sendPasswordResetEmail(email);
    }
}
