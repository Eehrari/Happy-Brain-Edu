import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {SubjectService} from "../../../services/subject.service";

var $ = require('jquery');
var dt = require('datatables.net');

@Component({
    selector: 'app-subject-list',
    templateUrl: './subject-list.component.html',
    styleUrls: ['./subject-list.component.css']
})
export class SubjectListComponent implements OnInit {

    subjects: Object;

    constructor(private subjectService: SubjectService, private router: Router) {
        this.subjectService.getSubjects()
            .subscribe(subjects => {
                this.subjects = subjects;
            });
        $(document).ready(function () {
            $('#example').dataTable();
        });
    }

    ngOnInit() {
        $(document).ready(function () {
                $('#example').dataTable();
        });
    }

    deleteSubject(id) {
        this.subjectService.deleteSubject(id).then((result) => {
            this.router.navigate(['/subject-list']);
            $('#example').dataTable();
        }, (err) => {
            console.log(err);
        });
    }

}
