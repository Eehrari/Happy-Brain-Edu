import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MentorService {
    mentor: any;
    authToken: any;


    constructor(private http: HttpClient) {
        // this.isDev = true;  // Change to false before deployment
    }

    registerMentor(mentor) {
        let headers = new HttpHeaders(('Content-Type:application/json'));
        return this.http.post('http://localhost:3000/mentors/register', mentor, {headers: headers});
    }
    authenticateMentor(mentor) {
        let headers = new HttpHeaders(('Content-Type:application/json'));
        return this.http.post('http://localhost:3000/mentors/authenticate', mentor, {headers: headers});
    }

    storeMentorData(token, mentor) {
        localStorage.setItem('id_token', token);
        localStorage.setItem('user', JSON.stringify(mentor));
        this.authToken = token;
        this.mentor = mentor;
    }


    getMentors(){
        return this.http.get('http://localhost:3000/mentors/getMentors');
    }
    deleteMentor(id) {
        return new Promise((resolve, reject) => {
            this.http.delete('http://localhost:3000/mentors/'+id)
                .subscribe(res => {
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
        });
    }
    editMentor(id, data) {
        return new Promise((resolve, reject) => {
            this.http.put(' http://localhost:3000/mentors/'+id, data)
                .map(res => res)
                .subscribe(res => {
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
        });
    }
    getMentor(id) {
        return new Promise((resolve, reject) => {
            this.http.get('http://localhost:3000/mentors/'+id)
                .map(res => res)
                .subscribe(res => {
                    resolve(res)
                }, (err) => {
                    reject(err);
                });
        });
    }
}

