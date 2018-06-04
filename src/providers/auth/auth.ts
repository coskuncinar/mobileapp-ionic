import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http'; 
import md5 from 'crypto-md5';

export class User {
  email: string;
  token:string; 
  constructor( email: string,token: string) {
    this.email = email;
    this.token = token;
  }
}
 
interface ISonuc {
  result :string;
  message:string;
  token:string;
} 
  

@Injectable()
export class AuthProvider {
  currentUser: User;
  sonuc :any;
 
  private apiUrl = 'https://www.sizinproje.com/api/auth/';
  
  constructor(public http: HttpClient) {
    //console.log('Hello RestProvider Provider');
  } 
  public login(credentials) {
    return new Promise((resolve, reject) => { 
      const body = {email: credentials.email, password:md5( credentials.password,"hex")}; 
      this.http.post(this.apiUrl, JSON.stringify(body))
        .subscribe( (res:ISonuc) => {
          this.sonuc =  res ;
          this.currentUser = new User(credentials.email,this.sonuc.token);
          resolve(res); 
        }, (err) => {
          reject(err);
        });
   });
  }

  public getUserInfo() : User {
    return this.currentUser;
  }
 
  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }

 
  
}