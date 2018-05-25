import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestapiProvider } from '../../providers/restapi/restapi';


interface IDetails
{
  title:string;
  description:string;
}

@IonicPage()
@Component({
  selector: 'page-project-details',
  templateUrl: 'project-details.html',
})
export class ProjectDetailsPage {
  details:IDetails;
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
       .then( details => {
           this.details = details.data as IDetails;
           console.log(this.details.description);
        },
         error =>  this.errorMessage = <any>error);
  }
 
}
