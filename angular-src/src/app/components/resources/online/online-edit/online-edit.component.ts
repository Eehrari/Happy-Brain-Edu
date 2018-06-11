import { Component, OnInit } from '@angular/core';
import {OnlineResService} from "../../../../services/online_res/online-res.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FlashMessagesService} from "angular2-flash-messages";
import {SubjectService} from "../../../../services/subject.service";

@Component({
  selector: 'app-online-edit',
  templateUrl: './online-edit.component.html',
  styleUrls: ['./online-edit.component.css']
})
export class OnlineEditComponent implements OnInit {

    onlineRes={};
    subjects: Object;

    constructor(private subjectService:SubjectService,private  onlineResService:OnlineResService,private route:Router,private activatedRoute:ActivatedRoute,private flashMessage:FlashMessagesService){
        subjectService.getSubjects().subscribe(subjects => {
            this.subjects = subjects;
        });
    }

    ngOnInit() {
        this.getOnlineRes(this.activatedRoute.snapshot.params['id']);
    }
    getOnlineRes(id) {
        this.onlineResService.getOnlineRes(id).then((res) => {
            this.onlineRes = res;
        }, (err) => {
            console.log(err);
        });
    }
    updateOnlineRes(id) {
        this.onlineResService.editOnlineRes(id, this.onlineRes).then((result) => {
            let id = result['_id'];
            this.route.navigate(['/online-list']);
            this.flashMessage.show('Resource updated!', {cssClass: 'alert-success', timeout: 3000});

        }, (err) => {
            console.log(err);
        });
    }

}
