import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import {ValidateService} from "../../../../services/validate.service";
import {StudentService} from "../../../../services/student.service";

@Component({
    selector: 'app-student-register',
    templateUrl: './student-register.component.html',
    styleUrls: ['./student-register.component.css']
})
export class StudentRegisterComponent implements OnInit {
    name: String;
    password: String;
    email: String;
    phone: String;
    parents_phone: String;
    country: String;
    language: String;
    school_level: String;
    school_name: String;
    family_situation: String;
    english_level: String;
    tutor_gender: String;
    gender: String;

    constructor(
        private validateService: ValidateService,
        private studentService: StudentService,
        private router: Router,
        private flashMessage: FlashMessagesService) { }

    ngOnInit() {
    }

    onRegisterSubmit() {
        const student = {
            name: this.name,
            email: this.email,
            password: this.password,
            phone: this.phone,
            parents_phone: this.parents_phone,
            country: this.country,
            language: this.language,
            school_level: this.school_level,
            school_name: this.school_name,
            family_situation: this.family_situation,
            english_level: this.english_level,
            tutor_gender: this.tutor_gender,
            gender: this.gender

        }

        // Required Fields
        if(!this.validateService.validateRegister(student)) {
          this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
          return false;
        }

        // Validate Email
        if(!this.validateService.validateEmail(student.email)) {
        this.flashMessage.show('Please use a valid email', {cssClass: 'alert-danger', timeout: 3000});
          return false;
        }

        // Register user
        this.studentService.registerStudent(student).subscribe(data => {
            if(data['success']) {
                this.flashMessage.show('You are now registered and can now login', {cssClass: 'alert-success', timeout: 3000});
                this.router.navigate(['/login']);
            } else {
                this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
                this.router.navigate(['/register']);
            }
        });
    }
}
