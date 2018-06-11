import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController } from 'ionic-angular';
import { RestapiProvider } from '../../providers/restapi/restapi';
import { CompanyDetailsPage } from '../company-details/company-details';

interface ISonuc {
  readonly result: any;
  readonly message: any;
  readonly data: any;
}

@IonicPage()
@Component({
  selector: 'page-company',
  templateUrl: 'company.html',
})
export class CompanyPage {

  companies: any;
  errorMessage: string;
  searchTerm: string = '';
  loading: Loading;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public rest: RestapiProvider,
    private loadingCtrl: LoadingController) {

  }


  doRefresh(refresher) {
    setTimeout(() => {
      this.searchTerm = '';
      this.getCompanies();
      refresher.complete();
    }, 1000);
  }

  ionViewWillEnter() {
    // detaydan çıktığında tekrar doldurmasını istenirse açılsın burası
    this.searchTerm = '';
    this.getCompanies();
  }
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Lütfen bekleyiniz...',
      dismissOnPageChange: true,
    });
    this.loading.present();
  }
  getCompanies() {
    this.showLoading();
    this.rest.getCompanies()
      .then((data: ISonuc) => {
        this.companies = data.data;
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
    this.rest.getCompanyDetails(id)
      .then((data: any) => {
        //console.log(data);
        this.navCtrl.push(CompanyDetailsPage, { cdetails: data.data });
        //this.loading.dismiss();
      },
        error => {
          //console.log(error);
          this.errorMessage = <any>error;
          //this.loading.dismiss();
        }
      );
  }

  setFilteredItems() {
    this.companies = this.rest.filterCompanies(this.searchTerm);
  }
}
