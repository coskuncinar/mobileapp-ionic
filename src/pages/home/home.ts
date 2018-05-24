import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  email = '';
  token = '';


  constructor(private nav: NavController, private auth: AuthProvider) {
    let info = this.auth.getUserInfo();
    this.email = info['email'];
    this.token = info['token'];
  }
 
  
  public logout() {
    this.auth.logout().subscribe(succ => {
      this.nav.setRoot(LoginPage)
    });
  }


}