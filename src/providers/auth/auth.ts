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
 
@Injectable()
export class AuthProvider {
  currentUser: User;
  sonuc :any;
 
  private apiUrl = 'https://www.sizinproje.com/api/auth/';
  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
  }

  public login(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
         
        let access = (credentials.password === "c" && credentials.email === "c");
        this.currentUser = new User('Coşkun ÇINAR', 'c@c.com');
        observer.next(access);
        observer.complete();
      });
    }
  }
  public loginV2(credentials) {
    return new Promise((resolve, reject) => { 
      const body = {email: credentials.email, password:md5( credentials.password,"hex")}; 
     // console.log(body);
      this.http.post(this.apiUrl, JSON.stringify(body) )
        .subscribe(res => {
          resolve(JSON.parse(JSON.stringify(res)))
        this.sonuc =  JSON.parse(JSON.stringify(res)) ;
        console.log(this.sonuc);      
        this.currentUser = new User(credentials.email,this.sonuc.token);
        }, (err) => {
          reject(err);
        });
  });
  }
  public register(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      // At this point store the credentials to your backend!
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
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