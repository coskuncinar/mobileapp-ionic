import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController } from 'ionic-angular';
import { RestapiProvider } from '../../providers/restapi/restapi';
import { ProjectDetailsPage } from '../project-details/project-details';
import { ConsProvider } from '../../providers/cons/cons';

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
    public cons: ConsProvider,
    private loadingCtrl: LoadingController) {

  }

  doRefresh(refresher) {
    setTimeout(() => {
      this.status = 0;//this.rest.projestatus;
      if (typeof this.status === "undefined") {
        this.status = 0;
      }
      this.searchTerm = '';
      this.getProjects();
      refresher.complete();
    }, 1000);
  }

  ionViewWillEnter() {
    this.status = this.cons.projestatus;
    if (typeof this.status === "undefined") {
      this.status = 0;
    }
    this.searchTerm = '';
    this.getProjects();
    this.cons.projestatus = 0;
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Lütfen bekleyiniz...',
      dismissOnPageChange: true,
    });
    this.loading.present();
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
        this.loading.dismiss();
      },
        error => {
          this.errorMessage = <any>error;
          this.loading.dismiss();
        }
      );
  }
  setFilteredItems() {
    this.projects = this.rest.filterProjects(this.searchTerm);
  }


}
