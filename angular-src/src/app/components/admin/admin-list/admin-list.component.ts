import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {AdminService} from "../../../services/admin.service";
import {Router} from "@angular/router";
var $ = require('jquery');
var dt= require('datatables.net');


@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css']
})
export class AdminListComponent implements OnInit {
    admins:Object;
  constructor(private adminService:AdminService,private router:Router) {
      this.adminService.getAdmins()
          .subscribe(admins=>{
              this.admins=admins;
               console.log(admins);

          });
  }

    ngOnInit(){
        $(document).ready(function() {
            $('#example').dataTable();
        } );
    }

    deleteAdmin(id) {
        this.adminService.deleteAdmin(id).then((result) => {
            this.router.navigate(['/admin-list']);
            console.log("Deleted")
        }, (err) => {
            console.log(err);
        });
        $('#example').dataTable();

    }

}