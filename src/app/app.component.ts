import { Component, ViewChild } from '@angular/core';
import { Platform, AlertController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { Network } from '@ionic-native/network';
import { TabsPage } from '../pages/tabs/tabs';
import { ProfilePage } from '../pages/profile/profile';


@Component({
  selector: 'page-app-root',
  templateUrl: 'app.html'
})
export class MyApp {


  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{ title: string, component: any }>;


  constructor(
    private network: Network,
    platform: Platform,
    public alertCtrl: AlertController,
    statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      this.network.onDisconnect().subscribe(() => {

        let alert = this.alertCtrl.create({
          title: "İnternet bağlantı hatası",
          subTitle: "İnternet bağlantınızı kontrol ediniz!",
          buttons: [{
            text: ("Tamam"),
            handler: () => {
              platform.exitApp();
            }
          }]
        });
        alert.present();
      });

    });

    this.pages = [
      { title: 'Anasayfa', component: TabsPage },
      { title: 'Profil', component: ProfilePage }
    ];

  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

}
