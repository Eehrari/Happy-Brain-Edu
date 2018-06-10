import { Component, OnInit } from '@angular/core';
import {MentorService} from "../../../services/mentor.service";
import {Router} from "@angular/router";
var $ = require('jquery');
var dt= require('datatables.net');

@Component({
  selector: 'app-mentor-list',
  templateUrl: './mentor-list.component.html',
  styleUrls: ['./mentor-list.component.css']
})
export class MentorListComponent implements OnInit {


    mentors:Object;
    constructor(private mentorService:MentorService,private router:Router) {
        this.mentorService.getMentors()
            .subscribe(mentors=>{
                this.mentors=mentors;

            });
    }

    ngOnInit(){
        $(document).ready(function() {
            $('#example').dataTable();
        } );
    }

    deleteMentor(id) {
        this.mentorService.deleteMentor(id).then((result) => {
            this.router.navigate(['/mentor-list']);
        }, (err) => {
            console.log(err);
        });
        $('#example').dataTable();

    }
}
