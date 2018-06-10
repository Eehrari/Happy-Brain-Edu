import {Component, OnInit} from '@angular/core';
import {FlashMessagesService} from "angular2-flash-messages";
import {AuthService} from "../../../../services/auth.service";
import {Router} from "@angular/router";
import {ValidateService} from "../../../../services/validate.service";
import {MentorService} from "../../../../services/mentor.service";

@Component({
    selector: 'app-mentor-register',
    templateUrl: './mentor-register.component.html',
    styleUrls: ['./mentor-register.component.css']
})
export class MentorRegisterComponent implements OnInit {

    name: String;
    password: String;
    email: String;
    phone: String;
    language: String;
    vce_subjects: String;
    location: String;
    studying: String;
    experience: String;
    volunteering: String;
    wwcc: String;
    why_join: String;
    about_us: String;
    refugee_definition: String;
    preference: String;
    gender: String;
    send_me_copy: String;

    constructor(private flashMessage: FlashMessagesService,
                private mentorService: MentorService,
                private router: Router,
                private validateService: ValidateService) {
    }

    onRegisterSubmit() {
        const mentor = {
            name: this.name,
            password: this.password,
            email: this.email,
            phone: this.phone,
            language: this.language,
            vce_subjects: this.vce_subjects,
            location:  this.location,
            studying:  this.studying,
            experience:  this.experience,
            volunteering: this.volunteering,
            wwcc:  this.wwcc,
            why_join:  this.why_join,
            about_us:  this.about_us,
            refugee_definition:  this.refugee_definition,
            preference:  this.preference,
            gender:  this.gender,
            send_me_copy:  this.send_me_copy

        }
        // Register mentor
        this.mentorService.registerMentor(mentor).subscribe(data => {
            if(data['success']) {
                this.flashMessage.show('You are now registered and can now login', {cssClass: 'alert-success', timeout: 3000});
                this.router.navigate(['/login']);
            } else {
                this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
                this.router.navigate(['/register-mentor']);
            }
        });
    }



    ngOnInit() {
    }

}
