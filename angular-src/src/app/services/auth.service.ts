import {Injectable} from '@angular/core';

import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class AuthService {
    authToken: any;


    constructor(private http: HttpClient) {
        // this.isDev = true;  // Change to false before deployment
    }


    getProfile() {
        this.loadToken();

        let headers = new HttpHeaders({'Authorization': this.authToken, 'Content-Type': 'application/json'});
        const userTypeToken =JSON.parse(localStorage.getItem('user'));

        if(userTypeToken.type=="mentor"){
            return this.http.get('http://localhost:3000/mentors/profile', {headers: headers});
        }else if(userTypeToken.type=="student"){
            return this.http.get('http://localhost:3000/students/profile', {headers: headers});
        }
        else if(userTypeToken.type=="admin"){
            return this.http.get('http://localhost:3000/admins/profile', {headers: headers});
        }

    }






    loadToken() {
        const token = localStorage.getItem('id_token');
        this.authToken = token;
    }

    loggedIn() {
        return tokenNotExpired('id_token');
    }

    logout() {
        this.authToken = null;
      //  this.student = null;
        localStorage.clear();
    }
}
