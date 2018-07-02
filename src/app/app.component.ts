import { Component, ViewChild } from '@angular/core';
import { Platform, AlertController, Nav, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { Network } from '@ionic-native/network';
import { TabsPage } from '../pages/tabs/tabs';
import { ProfilePage } from '../pages/profile/profile';
import { AuthProvider } from '../providers/auth/auth';
import { ConsProvider } from '../providers/cons/cons';

@Component({
  selector: 'page-app-root',
  templateUrl: 'app.html'
})
export class MyApp {


  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{
    title: string,
    icon: string;
    index: any;
    component: any,
    param: any
  }>;


  constructor(private network: Network, platform: Platform, public alertCtrl: AlertController,
    statusBar: StatusBar, splashScreen: SplashScreen, private auth: AuthProvider, private app: App,
    public cons: ConsProvider) {
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
      { title: 'Anasayfa', icon: 'home', index: 0, component: TabsPage, param: null },
      { title: 'Aktif Projeler', icon: 'calculator', index: 1, component: TabsPage, param: 1 },
      { title: 'Tamamlanan Projeler', icon: 'calculator', index: 1, component: TabsPage, param: 2 },
      { title: 'Aktif Firmalar', icon: 'calculator', index: 2, component: TabsPage, param: null },
      { title: 'Profilim', icon: 'person', index: null, component: ProfilePage, param: null },
      { title: 'Çıkış', icon: 'log-out', index: null, component: null, param: null }
    ];

  }

  // sites of  sidemenu click then choose  tabs menu or go in page 
  //https://devdactic.com/ionic-side-menu-tabs/


  openPage(page) {

    let params = {};

    // // The index is equal to the order of our tabs inside tabs.ts
    if (page.index) {
      params = { tabIndex: page.index };
    }

    // if (this.nav.getActiveChildNav() && page.index != undefined) {
    //   this.nav.getActiveChildNav().select(page.index);
    // } else {
    //   this.nav.setRoot(page.pageName, params);
    // }


    if (page.index === null && page.component === null) {
      this.auth.logout().subscribe(succ => {
        this.app.getRootNavs()[0].setRoot(LoginPage);
      });
    }
    else if (page.index === null && page.component != undefined) {
      this.nav.setRoot(page.component);
    }
    else {
      this.cons.projestatus = page.param;
      if (this.nav.getActiveChildNav() != undefined) {
        this.nav.getActiveChildNav().select(page.index); 
        
      }
      else {
        this.nav.setRoot(page.component, params);
      }
    }
  }
}
