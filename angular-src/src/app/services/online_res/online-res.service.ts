import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class OnlineResService {
    OnlineRes: any;

    constructor(private http: HttpClient) {
    }

    registerOnlineRes(OnlineRes) {
        const headers = new HttpHeaders(('Content-Type:application/json'));
        return this.http.post('http://localhost:3000/online-res/register', OnlineRes, {headers: headers});
    }

    getOnlineRess() {
        return this.http.get('http://localhost:3000/online-res/getAll');
    }

    deleteOnlineRes(id) {
        return new Promise((resolve, reject) => {
            this.http.delete('http://localhost:3000/online-res/' + id)
                .subscribe(res => {
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
        });
    }

    editOnlineRes(id, data) {
        return new Promise((resolve, reject) => {
            this.http.put(' http://localhost:3000/online-res/' + id, data)
                .map(res => res)
                .subscribe(res => {
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
        });
    }

    getOnlineRes(id) {
        return new Promise((resolve, reject) => {
            this.http.get('http://localhost:3000/online-res/' + id)
                .map(res => res)
                .subscribe(res => {
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
        });
    }
}
