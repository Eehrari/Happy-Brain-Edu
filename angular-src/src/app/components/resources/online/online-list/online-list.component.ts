import {Component, OnInit} from '@angular/core';
import {OnlineResService} from "../../../../services/online_res/online-res.service";
import {Router} from "@angular/router";

var $ = require('jquery');
var dt = require('datatables.net');

@Component({
    selector: 'app-online-list',
    templateUrl: './online-list.component.html',
    styleUrls: ['./online-list.component.css']
})
export class OnlineListComponent implements OnInit {

    resources: Object;

    constructor(private onlineService: OnlineResService, private router: Router) {
        this.onlineService.getOnlineRess()
            .subscribe(resources => {
                this.resources = resources;
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

    deleteRes(id) {
        this.onlineService.deleteOnlineRes(id).then((result) => {
            this.router.navigate(['/online-list']);
            $('#example').dataTable();
        }, (err) => {
            console.log(err);
        });
    }
}
