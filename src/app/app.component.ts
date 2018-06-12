import { Component, ViewChild } from '@angular/core';
import { Platform, AlertController, Nav, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { Network } from '@ionic-native/network';
import { TabsPage } from '../pages/tabs/tabs';
import { ProfilePage } from '../pages/profile/profile';
import { AuthProvider } from '../providers/auth/auth';


@Component({
  selector: 'page-app-root',
  templateUrl: 'app.html'
})
export class MyApp {


  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{ title: string, icon: string; type: any; component: any }>;


  constructor(private network: Network, platform: Platform, public alertCtrl: AlertController,
    statusBar: StatusBar, splashScreen: SplashScreen, private auth: AuthProvider, private app: App) {
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
      { title: 'Anasayfa', icon: 'home', type: '1', component: TabsPage },
      { title: 'Aktif Projeler', icon: 'person', type: '1', component: ProfilePage },
      { title: 'Tamamlanmış Projeler', icon: 'person', type: '1', component: ProfilePage },
      { title: 'Profilim', icon: 'person', type: '1', component: ProfilePage },
      { title: 'Çıkış', icon: 'log-out', type: '2', component: null }
    ];

  }

  // sites of  sidemenu click then choose  tabs menu or go in page 
  //https://devdactic.com/ionic-side-menu-tabs/


  openPage(page) {
    if (page.type == '2') {
      this.auth.logout().subscribe(succ => {
        this.app.getRootNavs()[0].setRoot(LoginPage);
      });
    } else {
      this.nav.setRoot(page.component);
    }
  }

}
