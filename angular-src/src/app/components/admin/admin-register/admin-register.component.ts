import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FlashMessagesService} from "angular2-flash-messages";
import {AuthService} from "../../../services/auth.service";
import {ValidateService} from "../../../services/validate.service";
import {AdminService} from "../../../services/admin.service";

@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.css']
})
export class AdminRegisterComponent implements OnInit {
    name: String;
    email: String;
    password: String;
    confirmPassword: String;

  constructor(private router:Router,
              private flashMessage:FlashMessagesService,
              private adminService:AdminService,
              private validateService:ValidateService
  ) { }

  ngOnInit() {
  }
    onRegisterSubmit(formList:any){
        const admin = {
            name:this.name,
            email:this.email,
            password:this.password
        }



        if(!this.validateService.validateRegister(admin)) {
            this.flashMessage.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
            return false;
        }

        // Validate Email
        if(!this.validateService.validateEmail(admin.email)) {
            this.flashMessage.show('Please use a valid email', {cssClass: 'alert-danger', timeout: 3000});
            return false;
        }
        //Match password
        if(this.password!=this.confirmPassword){
            this.flashMessage.show('Passwords do not match', {cssClass: 'alert-danger', timeout: 3000});
            return false;

        }
        this.adminService.registerAdmin(admin).subscribe(data => {
            if(data['success']) {
                this.flashMessage.show('New admin registered', {cssClass: 'alert-success', timeout: 3000});
                formList.form.reset();
                //this.router.navigate(['/admin-register']);
            } else {
                this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
              //  this.router.navigate(['/register']);
            }
        });
  }
}
