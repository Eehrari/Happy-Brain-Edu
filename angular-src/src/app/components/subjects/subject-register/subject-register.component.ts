import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FlashMessagesService} from "angular2-flash-messages";
import {SubjectService} from "../../../services/subject.service";

@Component({
  selector: 'app-subject-register',
  templateUrl: './subject-register.component.html',
  styleUrls: ['./subject-register.component.css']
})
export class SubjectRegisterComponent implements OnInit {

    name: String;
    description: String;
    sections: String;

    constructor(private router:Router,
                private flashMessage:FlashMessagesService,
                private subjectService:SubjectService,
    ) { }

    ngOnInit() {
    }
    onRegisterSubmit(formList:any){
        const subject = {
            name:this.name,
            description:this.description,
            sections:this.sections
        }

        this.subjectService.registerSubject(subject).subscribe(data => {
            if(data['success']) {
                this.flashMessage.show('New subject added', {cssClass: 'alert-success', timeout: 3000});
                formList.form.reset();
                //this.router.navigate(['/admin-register']);
            } else {
                this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
                //  this.router.navigate(['/register']);
            }
        });
    }

}
