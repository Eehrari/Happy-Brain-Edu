import { Component, OnInit } from '@angular/core';
import {AdminService} from "../../../services/admin.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FlashMessagesService} from "angular2-flash-messages";

@Component({
  selector: 'app-admin-edit',
  templateUrl: './admin-edit.component.html',
  styleUrls: ['./admin-edit.component.css']
})
export class AdminEditComponent implements OnInit {
    admin={};

    constructor(private  adminService:AdminService,private route:Router,private activatedRoute:ActivatedRoute,private flashMessage:FlashMessagesService){
        // this.adminService.getAdmin()
        //     .subscribe(admin=>{
        //         this.admin=admin;
        //     });
    }

    ngOnInit() {
        this.getAdmin(this.activatedRoute.snapshot.params['id']);
        console.log(this.activatedRoute.snapshot.params['id']);
    }
    getAdmin(id) {
        this.adminService.getAdmin(id).then((res) => {
            this.admin = res;
        }, (err) => {
            console.log(err);
        });
    }
    updateAdmin(id) {
        this.adminService.editAdmin(id, this.admin).then((result) => {
            let id = result['_id'];
            this.route.navigate(['/admin-list']);
            this.flashMessage.show('Admin updated!', {cssClass: 'alert-success', timeout: 3000});

        }, (err) => {
            console.log(err);
        });
    }


}
