import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestapiProvider } from '../../providers/restapi/restapi';

@IonicPage()
@Component({
  selector: 'page-company-details',
  templateUrl: 'company-details.html',
})
export class CompanyDetailsPage {
  details: any;
  id2: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public rest: RestapiProvider) {
    this.details = this.navParams.data.cdetails;
    this.id2 = this.zeroFill(this.details.id,11);
  }
  zeroFill(number, width) {
    width -= number.toString().length;
    if (width > 0) {
      return new Array(width + (/\./.test(number) ? 2 : 1)).join('0') + number;
    }
    return number + "";  
  }

  ionViewDidLoad() {
   // console.log('ionViewDidLoad CompanyDetailsPage');
  }

}
