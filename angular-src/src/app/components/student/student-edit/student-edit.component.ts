import { Component, OnInit } from '@angular/core';
import {StudentService} from "../../../services/student.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FlashMessagesService} from "angular2-flash-messages";

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit {

    student={};

    constructor(private  studentService:StudentService,private route:Router,private activatedRoute:ActivatedRoute,private flashMessage:FlashMessagesService){
        // this.adminService.getAdmin()
        //     .subscribe(admin=>{
        //         this.admin=admin;
        //     });
    }

    ngOnInit() {
        this.getStudent(this.activatedRoute.snapshot.params['id']);
    }
    getStudent(id) {
        this.studentService.getStudent(id).then((res) => {
            this.student = res;
        }, (err) => {
            console.log(err);
        });
    }
    updateStudent(id) {
        this.studentService.editStudent(id, this.student).then((result) => {
            let id = result['_id'];
            this.flashMessage.show('Student updated!', {cssClass: 'alert-success', timeout: 3000});
            this.route.navigate(['/student-list']);
        }, (err) => {
            console.log(err);
        });
    }

}
