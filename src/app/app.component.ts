import { Component } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { Network } from '@ionic-native/network';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  constructor(
    private network:Network,
    platform: Platform,
    public alertCtrl :AlertController, 
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
  }
}
