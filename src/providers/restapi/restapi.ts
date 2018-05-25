import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import { AuthProvider } from '../auth/auth';
 

/*
  Generated class for the RestapiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestapiProvider {

  token = '';
  private apiUrl = 'https://www.sizinproje.com/api/';
  
  constructor(public http: HttpClient,private auth:AuthProvider) {
    //console.log('Hello RestProvider Provider');
    let info = this.auth.getUserInfo();
    this.token = info['token'];
  }

  getProjects(): Observable<string[]> { 
    //console.log(this.apiUrl+'get-project-list/token/'+this.token);
    return this.http.get(this.apiUrl+'get-project-list/token/'+this.token).pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }
 
   getProjectDetails(id)  {  
    return new Promise((resolve, reject) => { 
      return this.http.get(this.apiUrl+'get-project-detail/token/'+this.token+'/id/'+id)
        .subscribe(res => { 
          //console.log(res)
          resolve(res); 
        }, (err) => {
          reject(err);
      });
    });
  }  

  private extractData(res: Response) {
    let body = res;
    //console.log(body);
    return body || {};
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const err = error || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    //console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
