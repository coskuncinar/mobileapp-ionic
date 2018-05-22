import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { RestapiProvider } from '../../providers/restapi/restapi';


@IonicPage()
@Component({
  selector: 'page-project',
  templateUrl: 'project.html',
})
export class ProjectPage {

  projects: string[];
  errorMessage: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,public rest : RestapiProvider) {
  }

  ionViewDidLoad() {
    this.getProjects();
  }
  
  getProjects() {
    this.rest.getProjects()
       .subscribe(
        projects => this.projects = projects,
         error =>  this.errorMessage = <any>error);
  }
}
