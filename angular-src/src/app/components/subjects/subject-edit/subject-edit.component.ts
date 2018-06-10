import { Component, OnInit } from '@angular/core';
import {SubjectService} from "../../../services/subject.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FlashMessagesService} from "angular2-flash-messages";

@Component({
  selector: 'app-subject-edit',
  templateUrl: './subject-edit.component.html',
  styleUrls: ['./subject-edit.component.css']
})
export class SubjectEditComponent implements OnInit {

    subject={};

    constructor(private  subjectService:SubjectService,private route:Router,private activatedRoute:ActivatedRoute,private flashMessage:FlashMessagesService){
    }

    ngOnInit() {
        this.getSubject(this.activatedRoute.snapshot.params['id']);
    }
    getSubject(id) {
        this.subjectService.getSubject(id).then((res) => {
            this.subject = res;
        }, (err) => {
            console.log(err);
        });
    }
    updateSubject(id) {
        this.subjectService.editSubject(id, this.subject).then((result) => {
            let id = result['_id'];
            this.route.navigate(['/subject-list']);
            this.flashMessage.show('Subject updated!', {cssClass: 'alert-success', timeout: 3000});

        }, (err) => {
            console.log(err);
        });
    }

}
