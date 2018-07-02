import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';
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
  projectStatus: any = 0;

  // @ViewChild('ps0') 
  // private ps0: ElementRef;
  @ViewChild('ps0', { read: ElementRef }) private ps0: ElementRef;
  @ViewChild('ps1', { read: ElementRef }) private ps1: ElementRef;
  @ViewChild('ps2', { read: ElementRef }) private ps2: ElementRef;
  @ViewChild('ps3', { read: ElementRef }) private ps3: ElementRef;
  @ViewChild('ps4', { read: ElementRef }) private ps4: ElementRef;
  @ViewChild('ps5', { read: ElementRef }) private ps5: ElementRef;
  @ViewChild('ps6', { read: ElementRef }) private ps6: ElementRef;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public rest: RestapiProvider,
    public cons: ConsProvider,
    private loadingCtrl: LoadingController,
    public renderer: Renderer2) {

  }
  // ngDoCheck() {
  //   console.log("ngDoCheck")
  // }

  ionSelected() {
    this.ionViewWillEnter();
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
    this.RenkReset();
    this.renderer.setAttribute(this.ps0.nativeElement, "style", 'background-color: red')
    //this.setFilteredItems();
  }
  RenkReset() {
    this.renderer.setAttribute(this.ps0.nativeElement, "style", 'background-color: dark')
    this.renderer.setAttribute(this.ps1.nativeElement, "style", 'background-color: dark')
    this.renderer.setAttribute(this.ps2.nativeElement, "style", 'background-color: dark')
    this.renderer.setAttribute(this.ps3.nativeElement, "style", 'background-color: dark')
    this.renderer.setAttribute(this.ps4.nativeElement, "style", 'background-color: dark')
    this.renderer.setAttribute(this.ps5.nativeElement, "style", 'background-color: dark')
    this.renderer.setAttribute(this.ps6.nativeElement, "style", 'background-color: dark')
  }
  chooseType(value) {
    this.projectStatus = value;
    this.RenkReset();
    switch (value) {
      case 0:
        this.renderer.setAttribute(this.ps0.nativeElement, "style", 'background-color: red')
        break;
      case 1:
        this.renderer.setAttribute(this.ps1.nativeElement, "style", 'background-color: red')
        break;
      case 2:
        this.renderer.setAttribute(this.ps2.nativeElement, "style", 'background-color: red')
        break;
      case 3:
        this.renderer.setAttribute(this.ps3.nativeElement, "style", 'background-color: red')
        break;
      case 4:
        this.renderer.setAttribute(this.ps4.nativeElement, "style", 'background-color: red')
        break;
      case 5:
        this.renderer.setAttribute(this.ps5.nativeElement, "style", 'background-color: red')
        break;
      case 6:
        this.renderer.setAttribute(this.ps6.nativeElement, "style", 'background-color: red')
        break;
      default:
    }
    this.setFilteredItems();
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
    this.projects = this.rest.filterProjects(this.searchTerm, this.projectStatus);
  }


}
