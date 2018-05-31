import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { RestapiProvider } from '../../providers/restapi/restapi';
import { ProjectDetailsPage } from '../project-details/project-details';

 

interface ISonuc   {
  readonly result: any;
  readonly message:any;
  readonly data: any;
}

@IonicPage()
@Component({
  selector: 'page-project',
  templateUrl: 'project.html',
})
export class ProjectPage {

  projects: any;
  errorMessage: string;
  searchTerm: string = '';
  constructor(public navCtrl: NavController, public navParams: NavParams,public rest : RestapiProvider) {
  }
  ionViewWillEnter() {
    // detaydan çıktığında tekrar doldurmasını istenirse açılsın burası
    this.searchTerm=''; 
    this.getProjects(); 
  }
  ionViewDidLoad() {
   // this.getProjects(); 
  } 
  getProjects() {
    this.rest.getProjects()
      .then( (data:ISonuc) => {
        this.projects = data.data;
      },
      error =>  this.errorMessage = <any>error
    );
  }

  openDetails(id) {
    this.rest.getProjectDetails(id)
    .then( (data:any) => {
        this.navCtrl.push(ProjectDetailsPage, {details: data.data});
      },
      error =>  this.errorMessage = <any>error
    );
  }

  setFilteredItems() { 
    this.projects = this.rest.filterProjects(this.searchTerm); 
  }
}
