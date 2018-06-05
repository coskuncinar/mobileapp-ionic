import { Component } from '@angular/core';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';

import { App, NavController } from 'ionic-angular';
import { RestapiProvider } from '../../providers/restapi/restapi';

interface ISonuc {
  readonly result: any;
  readonly message: any;
  readonly data: any;
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  email = '';
  token = '';
  dashboard: any = {
    progressProjectCount: '',
    closedProjectCount: '',
    companyCount: '',
    balanceCount: ''
  };
  userinfo: any = {
    firstName: '',
    lastName: ''
  }
  errorMessage: string;

  constructor(private auth: AuthProvider, private app: App, 
    public rest: RestapiProvider, 
    public nav: NavController,
  ) {
    let info = this.auth.getUserInfo();
    this.email = info['email'];
    this.token = info['token'];
  }

  ionViewDidLoad() {
    this.getUserInfo();
  }
  getUserInfo() {
    this.rest.getUserInfo()
      .then((data: ISonuc) => {
        this.userinfo = data.data;
      },
        error => this.errorMessage = <any>error
      );
  }
  ionViewWillEnter() {
  //  console.log("ionViewWillEnter: before it becomes the active"); 
    
    this.getDasboard();
  }
  projelist(status) {
    this.rest.projestatus=status;
    this.nav.parent.select(1);
  }
  getDasboard() {
    this.rest.getDashboard()
      .then((data: ISonuc) => {
        this.dashboard = data.data;
      },
        error => this.errorMessage = <any>error
      );
  }
  

  public logout() {
    this.auth.logout().subscribe(succ => {
      this.app.getRootNavs()[0].setRoot(LoginPage);
    });
  }

  
}


//ionViewDidLoad(){
  //   console.log("Fired only when a view is stored in memory. ");
  //}
  // ionViewWillEnter() {
  //   console.log("ionViewWillEnter: before it becomes the active"); 
  // }
  // ionViewDidEnter() {
  //   console.log("ionViewDidEnter: after it becomes the active");
  // } 
  // ionViewWillLeave() {
  //   console.log("ionViewWillLeave: before it stops being the active");
  // } 
  // ionViewDidLeave() {
  //   console.log("ionViewDidLeave: after it stops being the active");
  // } 
  // ionViewWillUnload() {
  //   console.log("ionViewWillUnload: Fired when a view is going to be completely removed");
  // }  
  // ionViewCanEnter() {
  //   console.log("ionViewCanEnter: Fired before entering into a view");
  // } 
  // ionViewCanLeave() {
  //   console.log("ionViewCanLeave: Fired before leaving a view");
  // } 