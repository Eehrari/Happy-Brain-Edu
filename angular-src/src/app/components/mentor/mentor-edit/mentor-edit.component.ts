import { Component, OnInit } from '@angular/core';
import {MentorService} from "../../../services/mentor.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FlashMessagesService} from "angular2-flash-messages";

@Component({
  selector: 'app-mentor-edit',
  templateUrl: './mentor-edit.component.html',
  styleUrls: ['./mentor-edit.component.css']
})
export class MentorEditComponent implements OnInit {

    mentor={};

    constructor(private  mentorService:MentorService,private route:Router,private activatedRoute:ActivatedRoute,private flashMessage:FlashMessagesService){

    }

    ngOnInit() {
        this.getMentor(this.activatedRoute.snapshot.params['id']);
    }
    getMentor(id) {
        this.mentorService.getMentor(id).then((res) => {
            this.mentor = res;
        }, (err) => {
            console.log(err);
        });
    }
    updateMentor(id) {
        this.mentorService.editMentor(id, this.mentor).then((result) => {
            let id = result['_id'];
            this.route.navigate(['/mentor-list']);
            this.flashMessage.show('Mentor updated!', {cssClass: 'alert-success', timeout: 3000});

        }, (err) => {
            console.log(err);
        });
    }
}
