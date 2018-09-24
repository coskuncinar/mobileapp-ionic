import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading, IonicPage } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { TabsPage } from '../tabs/tabs';


interface ISonuc {
  readonly result: any;
  readonly message: any;
  readonly data: any;
}

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})


export class LoginPage {
  loading: Loading;
  registerCredentials = { email: '', password: '' };
  public check: boolean = true;

  constructor(
    private nav: NavController,
    private auth: AuthProvider,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController) { }


  ionViewDidEnter() {

  }

  public login() {
    this.showLoading()
    this.auth.login(this.registerCredentials).
      then((sonuc: ISonuc) => {
        if (sonuc.result === "success") {
          this.nav.setRoot(TabsPage);
        } else { 
          this.showError("Giriş hatası!",sonuc.message);
        }
      }, (err) => {
        //console.log(err);
          console.log(err.statusText);
        if (err.statusText == "Unknown Error") {
          this.showError("Erişim hatası!","Sizinproje.com servislerine erişilemiyor!");
        }
      }); 
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Lütfen bekleyiniz...',
      dismissOnPageChange: true,
    });
    this.loading.present();
  } 
  showError(caption,text) {
    this.loading.dismiss(); 
    let alert = this.alertCtrl.create({
      title: caption,
      subTitle: text, 
      buttons: ['Tamam'],
      cssClass: 'alertCustomCss'
 
    });
    alert.present();
  }
}