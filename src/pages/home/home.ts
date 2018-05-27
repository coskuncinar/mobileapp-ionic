import { Component } from '@angular/core';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';

import { App } from 'ionic-angular';
import { RestapiProvider } from '../../providers/restapi/restapi';

interface ISonuc   {
  readonly result: any;
  readonly message:any;
  readonly data: any;
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  email = '';
  token = '';
  dashboard:any={  
    progressProjectCount: '',
    closedProjectCount: '',
    companyCount: '',
    balanceCount: ''
  };
  userinfo:any= {
    firstName:'',
    lastName:''
  }
  errorMessage: string;

  constructor(private auth: AuthProvider,private app:App,public rest:RestapiProvider) {
    let info = this.auth.getUserInfo();
    this.email = info['email'];
    this.token = info['token']; 
  }

  ionViewDidLoad() {
     //console.log("ionViewDidLoad: Fired only when a view is stored in memory");
     this.getUserInfo();
   }

  getUserInfo() {
    this.rest.getUserInfo()
       .then( (data:ISonuc) => {
           this.userinfo = data.data;
        },
         error =>  this.errorMessage = <any>error
        );
  }
  ionViewWillEnter() {
    //console.log("ionViewWillEnter: before it becomes the active"); 
    this.getDasboard();
    // kullanıcı bilgisi getirilecek
    // kredi bilgisi otomatik güncellecek 
  } 
  
  
  getDasboard() {
    this.rest.getDashboard()
       .then( (data:ISonuc) => {
           this.dashboard = data.data;
        },
         error =>  this.errorMessage = <any>error
        );
  }
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

  public logout() {
    this.auth.logout().subscribe(succ => {
      this.app.getRootNavs()[0].setRoot(LoginPage);
    });
  }
}