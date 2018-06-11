import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthProvider } from '../auth/auth';


interface ISonuc {
  readonly result: any;
  readonly message: any;
  readonly data: any;
}


@Injectable()
export class RestapiProvider {

  token = '';
  public projestatus: any;
  public tempProjeDetay: ISonuc;
  public tempCompanyDetay: ISonuc;
  private apiUrl = 'https://www.sizinproje.com/api/';

  constructor(public http: HttpClient, private auth: AuthProvider) {
    let info = this.auth.getUserInfo();
    this.token = info['token'];
  }

  getUserInfo() {
    return new Promise((resolve, reject) => {
      //console.log(this.apiUrl+'get-user-info/token/'+this.token);
      return this.http.get(this.apiUrl + 'get-user-info/token/' + this.token)
        .subscribe((res: ISonuc) => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getDashboard() {
    return new Promise((resolve, reject) => {
      return this.http.get(this.apiUrl + 'get-dashboard-counts/token/' + this.token)
        .subscribe((res: ISonuc) => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }


  getProjects(status) {
    return new Promise((resolve, reject) => {
      return this.http.get(this.apiUrl + 'get-project-list/status/' + status + '/token/' + this.token)
        .subscribe((res: ISonuc) => {
          this.tempProjeDetay = res;
          resolve(this.tempProjeDetay);
        }, (err) => {
          reject(err);
        });
    });
  }

  getProjectDetails(id) {
    return new Promise((resolve, reject) => {
      //console.log(this.apiUrl+'get-project-detail/token/'+this.token+'/id/'+id);
      return this.http.get(this.apiUrl + 'get-project-detail/token/' + this.token + '/id/' + id)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  filterProjects(searchTerm) {
    // return this.tempProjeDetay.data.filter((item) => {
    //   return item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    // });
    let val = searchTerm.toLowerCase();; 

    return this.tempProjeDetay.data.filter((item) => {
      //return item.companyName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
      return (item.id.toLowerCase().indexOf(val) > -1 ||
        item.title.toLowerCase().indexOf(val) > -1);

    });


  }

  getCompanies() {
    return new Promise((resolve, reject) => {
      return this.http.get(this.apiUrl + 'get-company-list/token/' + this.token)
        .subscribe((res: ISonuc) => {
          //console.log(res)
          this.tempCompanyDetay = res;
          resolve(this.tempCompanyDetay);
        }, (err) => {
          reject(err);
        });
    });
  }


  getCompanyDetails(id) {
    return new Promise((resolve, reject) => {
      //console.log(this.apiUrl+'get-company-detail/token/'+this.token+'/id/'+id);
      return this.http.get(this.apiUrl + 'get-company-detail/token/' + this.token + '/id/' + id)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
 
  filterCompanies(searchTerm) {
    //let searhClear =searchTerm.trim().split(' ');
    // let stringofWord = searchTerm.split(' ');
    // console.log(stringofWord); 
    let val = searchTerm.toLowerCase();; 
    return this.tempCompanyDetay.data.filter((item) => {
      //return item.companyName.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
      return (item.id.toLowerCase().indexOf(val) > -1 ||
        item.companyName.toLowerCase().indexOf(val) > -1);

    });
  }


}
