import { Component } from '@angular/core';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';

import { App } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  email = '';
  token = '';


  constructor(private auth: AuthProvider,private app:App) {
    let info = this.auth.getUserInfo();
    this.email = info['email'];
    this.token = info['token'];
    // kullanıcı bilgisi getirilecek
    // kredi bilgisi otomatik güncellecek 
  }
  
  public logout() {
    this.auth.logout().subscribe(succ => {
      this.app.getRootNavs()[0].setRoot(LoginPage);
    });
  }
}