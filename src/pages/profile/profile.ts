import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestapiProvider } from '../../providers/restapi/restapi';

interface ISonuc {
  readonly result: any;
  readonly message: any;
  readonly data: any;
}

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {


  userinfo: any = {
    id: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    title: '',
    phone: '',
    phoneCountyCode: '',
    parentId: '',
    type: '',
    createdDate: '',
    photo: '',
    companyName: '',
    companyPhone: '',
    companyTax: '',
    companyTaxInst: '',
    companyAddress: '',
    ip: '',
    referansno: '',
    sms: '',
    secure: ''
  }
  errorMessage: string;
  id2: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public rest: RestapiProvider) {

  }
  zeroFill(number, width) {
    width -= number.toString().length;
    if (width > 0) {
      return new Array(width + (/\./.test(number) ? 2 : 1)).join('0') + number;
    }
    return number + "";
  }

  ionViewDidLoad() {
    this.getUserInfo();
  }
  getUserInfo() {
    this.rest.getUserInfo()
      .then((data: ISonuc) => {
        this.userinfo = data.data;
        this.id2 = this.zeroFill(this.userinfo.id,11);
      },
        error => this.errorMessage = <any>error
      );
  }
}
