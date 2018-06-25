import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class LocalResService {
    LocalRes: any;

    constructor(private http: HttpClient) {
    }

    registerLocalRes(LocalRes) {
        const headers = new HttpHeaders(('Content-Type:application/json'));
        return this.http.post('http://localhost:3000/local-res/register', LocalRes, {headers: headers});
    }

    getLocalRess() {
        return this.http.get('http://localhost:3000/local-res/getAll');
    }

    deleteLocalRes(id) {
        return new Promise((resolve, reject) => {
            this.http.delete('http://localhost:3000/local-res/' + id)
                .subscribe(res => {
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
        });
    }

    editLocalRes(id, data) {
        return new Promise((resolve, reject) => {
            this.http.put(' http://localhost:3000/local-res/' + id, data)
                .map(res => res)
                .subscribe(res => {
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
        });
    }

    getLocalRes(id) {
        return new Promise((resolve, reject) => {
            this.http.get('http://localhost:3000/local-res/' + id)
                .map(res => res)
                .subscribe(res => {
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
        });
    }


    downloadFile(file: String) {
        const body = {filename: file};

        return this.http.post('http://localhost:3000/local-res/download', body, {
            responseType: 'blob',
            headers: new HttpHeaders().append('Content-Type', 'application/json')
        });
    }
    deleteFile(file: String) {
        const body = {filename: file};

        return this.http.post('http://localhost:3000/local-res/deletefile', body, {
            responseType: 'blob',
            headers: new HttpHeaders().append('Content-Type', 'application/json')
        });
    }
}
