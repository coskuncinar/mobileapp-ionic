import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestapiProvider } from '../../providers/restapi/restapi';
 

interface ISonuc   {
  readonly result: any;
  readonly message:any;
  readonly data: any;
}
 

@IonicPage()
@Component({
  selector: 'page-project-details',
  templateUrl: 'project-details.html',
})
export class ProjectDetailsPage {
  xid:string; 
  details:any={  
    id: '',
    companyId: '',
    customerId: '',
    cityId: '',
    stateId: '',
    cityGroupId: '',
    startDate: '',
    finishDate: '',
    status: '',
    price: '',
    currency: '',
    landSize: '',
    closedAreaSize: '',
    structureType: '',
    numberOfPart: '',
    title: '',
    description: '',
    photo: '',
    photos: '',
    projectStatus: '',
    createdDate: '',
    createdBy: '',
    updatedDate: '',
    statusName: '',
    structureTypeName: '',
    projectStatusName: '',
    cityGroupName: '',
    cityName: '',
    stateName: ''
  };
  
  errorMessage: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,public rest : RestapiProvider) {
    this.xid = this.navParams.get('id');
  }

  ionViewDidLoad() {
    this.getProjectDetails();
  } 
  getProjectDetails() {
    this.rest.getProjectDetails(this.xid)
       .then( (data:ISonuc) => {
           this.details = data.data;
           //console.log(this.details);
        },
         error =>  this.errorMessage = <any>error);
  }
 
}
