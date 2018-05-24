import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { TabsPage } from '../tabs/tabs';
 

 

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loading: Loading;
  registerCredentials = { email: '', password: '' };
  
  constructor(private nav: NavController, private auth: AuthProvider, private alertCtrl: AlertController, private loadingCtrl: LoadingController) { }
 
  public createAccount() {
    this.nav.push('RegisterPage');
  }
 
  public login() {
    this.showLoading() 
    this.auth.loginV2(this.registerCredentials).then((sonuc) => { 
         if (sonuc.result ==="success") {        
          this.nav.setRoot(TabsPage);
        } else {
          this.showError(sonuc.message);
        }        
      //console.log(result); 
    }, (err) => {
      this.showError(err);
    });

    // this.auth.login(this.registerCredentials).subscribe(allowed => {
    //   if (allowed) {        
    //     this.nav.setRoot(TabsPage);
    //   } else {
    //     this.showError("Access Denied");
    //   }
    // },
    //   error => {
    //     this.showError(error);
    //   });
  }
 
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Lütfen bekleyiniz...',
      dismissOnPageChange: true, 
    });
    this.loading.present();
  }
 
  showError(text) {
    this.loading.dismiss(); 
    let alert = this.alertCtrl.create({
      title: 'Hata',
      subTitle: text, 
      buttons: ['Tamam']
    });
    alert.present();
  }
}