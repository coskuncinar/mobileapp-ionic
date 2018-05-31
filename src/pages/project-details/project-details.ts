import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestapiProvider } from '../../providers/restapi/restapi';

@IonicPage()
@Component({
  selector: 'page-project-details',
  templateUrl: 'project-details.html',
})
export class ProjectDetailsPage {
  details:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public rest : RestapiProvider) {
    this.details = this.navParams.data.details;
  }
  ionViewDidLoad() {  
  } 
}
