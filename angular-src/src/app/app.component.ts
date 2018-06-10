import {Component, ElementRef, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "./services/auth.service";
// var $ = require('@types/jquery');
// var dt = require('data-table');
var $ = require('jquery');
var dt= require('datatables.net');



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  constructor(private router:Router,
              private authService:AuthService){

  }
    ngOnInit(){
        // var el = $(this.rootNode.nativeElement).find('#example1')[0];
        // $('#example1').dataTable();


        $(document).ready(function() {
            $('#example').dataTable();
        } );
    }
}
