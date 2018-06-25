import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LocalResService} from '../../../../services/local_res/local-res.service';
import {saveAs} from 'file-saver';

var $ = require('jquery');
var dt = require('datatables.net');

@Component({
    selector: 'app-local-list',
    templateUrl: './local-list.component.html',
    styleUrls: ['./local-list.component.css']
})
export class LocalListComponent implements OnInit {


    resources: Object;

    constructor(private localResService: LocalResService, private router: Router) {
        this.localResService.getLocalRess()
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
    deleteFile(index) {
        // deleteRes(id);
        var fileUplaod = this.resources[index].fileUplaod;

        this.localResService.deleteFile(fileUplaod)
            .subscribe(
                data => saveAs(data, fileUplaod),
                error => console.error(error)
            );
    }

    deleteRes(id, i) {
        this.deleteFile(i);
        this.localResService.deleteLocalRes(id).then((result) => {
            this.router.navigate(['/local-list']);
            $('#example').dataTable();
        }, (err) => {
            console.log(err);
        });
    }

    download(index) {
        var fileUplaod = this.resources[index].fileUplaod;

        this.localResService.downloadFile(fileUplaod)
            .subscribe(
                data => saveAs(data, fileUplaod),
                error => console.error(error)
            );
    }


}
