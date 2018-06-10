import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import {StudentService} from "../../services/student.service";
import {MentorService} from "../../services/mentor.service";
import {AdminService} from "../../services/admin.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: String;
  password: String;
  type: String;

  constructor(
    private authService: AuthService,
    private studentService: StudentService,
    private mentorService: MentorService,
    private adminService: AdminService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) {
      this.type="admin";
  }

  ngOnInit() {
  }

    onLoginSubmit() {
      const student = {
        email: this.email,
        password: this.password
      }
        const mentor = {
            email: this.email,
            password: this.password
        }
        const admin = {
            email: this.email,
            password: this.password
        }
    if(this.type=="mentor"){
        this.mentorService.authenticateMentor(mentor).subscribe(data => {
            if(data['success']) {
                this.mentorService.storeMentorData(data['token'], data['mentor']);
                this.flashMessage.show('You are now logged in', {cssClass: 'alert-success', timeout: 5000});
                this.router.navigate(['dashboard']);
            } else {
                this.flashMessage.show(data['msg'], {cssClass: 'alert-danger', timeout: 5000});
                this.router.navigate(['login']);
            }
        });
    }
    else if(this.type=="student"){
        this.studentService.authenticateStudent(student).subscribe(data => {
            if(data['success']) {
                this.studentService.storeStudentData(data['token'], data['student']);
                this.flashMessage.show('You are now logged in', {cssClass: 'alert-success', timeout: 5000});
                this.router.navigate(['dashboard']);
            }else {
                this.flashMessage.show(data['msg'], {cssClass: 'alert-danger', timeout: 5000});
                this.router.navigate(['login']);
            }
        });
    }
    else if(this.type=="admin"){
        this.adminService.authenticateAdmin(admin).subscribe(data => {
            if(data['success']) {
                this.adminService.storeAdminData(data['token'], data['admin']);
                this.flashMessage.show('You are now logged in', {cssClass: 'alert-success', timeout: 5000});
                this.router.navigate(['dashboard']);
            }else {
                this.flashMessage.show(data['msg'], {cssClass: 'alert-danger', timeout: 5000});
                this.router.navigate(['login']);
            }
        });
    }
  }

}
