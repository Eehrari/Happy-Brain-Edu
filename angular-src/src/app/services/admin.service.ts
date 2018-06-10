import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
    authToken: any;
    admin: any;

    constructor(private http: HttpClient) {
        // this.isDev = true;  // Change to false before deployment
    }

    registerAdmin(admin) {
        let headers = new HttpHeaders(('Content-Type:application/json'));
        return this.http.post('http://localhost:3000/admins/register', admin, {headers: headers});
    }
    authenticateAdmin(admin) {
        let headers = new HttpHeaders(('Content-Type:application/json'));
        return this.http.post('http://localhost:3000/admins/authenticate', admin, {headers: headers});
    }

    storeAdminData(token, admin) {
        localStorage.setItem('id_token', token);
        localStorage.setItem('user', JSON.stringify(admin));
        this.authToken = token;
        this.admin = admin;
    }

    getAdmins(){
        return this.http.get('http://localhost:3000/admins/getAdmins');
    }
    deleteAdmin(id) {
        return new Promise((resolve, reject) => {
            this.http.delete('http://localhost:3000/admins/'+id)
                .subscribe(res => {
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
        });
    }
    editAdmin(id, data) {
        return new Promise((resolve, reject) => {
            this.http.put(' http://localhost:3000/admins/'+id, data)
                .map(res => res)
                .subscribe(res => {
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
        });
    }
    getAdmin(id) {
        return new Promise((resolve, reject) => {
            this.http.get('http://localhost:3000/admins/' + id)
                .map(res => res)
                .subscribe(res => {
                    resolve(res)
                }, (err) => {
                    reject(err);
                });
        });
    }

}
