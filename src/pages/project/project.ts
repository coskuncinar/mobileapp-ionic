import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';

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
  loading: Loading;
  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public rest : RestapiProvider,
    private loadingCtrl: LoadingController) {
  }
  ionViewWillEnter() {
    this.showLoading();
    // detaydan çıktığında tekrar doldurmasını istenirse açılsın burası
    this.searchTerm=''; 
    this.getProjects();  
    this.loading.dismiss(); 
  }
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Lütfen bekleyiniz...',
      dismissOnPageChange: true, 
    });
    this.loading.present();
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
    this.showLoading();
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
