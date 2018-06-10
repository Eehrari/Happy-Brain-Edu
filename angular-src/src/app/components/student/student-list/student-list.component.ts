import { Component, OnInit } from '@angular/core';
import {StudentService} from "../../../services/student.service";
import {Router} from "@angular/router";
var $ = require('jquery');
var dt= require('datatables.net');

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

    students:Object;
    constructor(private studentService:StudentService,private router:Router) {
        this.studentService.getStudents()
            .subscribe(students=>{
                this.students=students;

            });
    }

    ngOnInit(){
        $(document).ready(function() {
            $('#example').dataTable();
        } );
    }

    deleteStudent(id) {
        this.studentService.deleteStudent(id).then((result) => {
            this.router.navigate(['/student-list']);
        }, (err) => {
            console.log(err);
        });
        $('#example').dataTable();

    }

}
