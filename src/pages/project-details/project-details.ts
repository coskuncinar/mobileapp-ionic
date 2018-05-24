import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestapiProvider } from '../../providers/restapi/restapi';

/**
 * Generated class for the ProjectDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-project-details',
  templateUrl: 'project-details.html',
})
export class ProjectDetailsPage {
  details:any;
  id:string;
  errorMessage: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,public rest : RestapiProvider) {
    this.id = this.navParams.get('id');
    // detayı için servise gidilecek
    // console.log(this.id);
   
    //console.log(this.project);
  }

ionViewDidLoad() {
    this.getProjectDetail();
    //console.log('ionViewDidLoad ProjectDetailsPage');
  }

  getProjectDetail() {
    this.rest.getProjectDetails(this.id)
       .subscribe(
        details => {
           this.details = JSON.stringify(details.data);
           console.log(this.details);
        },
         error =>  this.errorMessage = <any>error);
  }
 
}
