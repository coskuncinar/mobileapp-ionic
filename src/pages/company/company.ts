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
  selector: 'page-company',
  templateUrl: 'company.html',
})
export class CompanyPage {


  companies: any;
  errorMessage: string;
  searchTerm: string = '';
  constructor(public navCtrl: NavController, public navParams: NavParams,public rest : RestapiProvider) {
  }
  
  ionViewWillEnter() {
    // detaydan çıktığında tekrar doldurmasını istenirse açılsın burası
    this.searchTerm=''; 
    this.getCompanies(); 
  }

  ionViewDidLoad() {
   // this.getProjects(); 
  } 
  getCompanies() {
    this.rest.getCompanies()
       .then( (data:ISonuc) => {
           this.companies = data.data;
        },
         error =>  this.errorMessage = <any>error
        );
  }
  
  openDetails(id) {
    //this.navCtrl.push(CompanyDetailsPage, {id: id});
  }

  setFilteredItems() { 
    this.companies = this.rest.filterCompanies(this.searchTerm); 
  }

}
