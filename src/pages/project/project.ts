import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';

import { RestapiProvider } from '../../providers/restapi/restapi';
import { ProjectDetailsPage } from '../project-details/project-details';



interface ISonuc {
  readonly result: any;
  readonly message: any;
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
  status: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public rest: RestapiProvider,
    private loadingCtrl: LoadingController) {

  }
  ionViewWillLeave() {
    this.rest.projestatus=0;
    //console.log("ionViewWillLeave: before it stops being the active");
  }
 
  ionViewWillEnter() {
    this.status = this.rest.projestatus;
    if (typeof this.status === "undefined") {
      this.status = 0;
    }
    
   // console.log("status:" + this.status);
    // detaydan çıktığında tekrar doldurmasını istenirse açılsın burası
    this.searchTerm = '';
    this.getProjects();
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
   
    this.showLoading();

    this.rest.getProjects(this.status)
      .then((data: ISonuc) => {
        this.projects = data.data;
        this.loading.dismiss();
      },
        error => {
          this.errorMessage = <any>error;
          this.loading.dismiss();
        }
      );
  }

   
  openDetails(id) {
    this.showLoading();
    this.rest.getProjectDetails(id)
      .then((data: any) => {
        this.navCtrl.push(ProjectDetailsPage, { details: data.data });
      },
        error => this.errorMessage = <any>error
      );

  }

  setFilteredItems() {
    this.projects = this.rest.filterProjects(this.searchTerm);
  }

    ionViewDidEnter() {
    console.log("ionViewDidEnter: after it becomes the active");
  } 
  
  ionViewDidLeave() {
    console.log("ionViewDidLeave: after it stops being the active");
  } 
  ionViewWillUnload() {
    console.log("ionViewWillUnload: Fired when a view is going to be completely removed");
  }  
  ionViewCanEnter() {
    console.log("ionViewCanEnter: Fired before entering into a view");
  } 
  ionViewCanLeave() {
    console.log("ionViewCanLeave: Fired before leaving a view");
  } 
}
