import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import {OnlineResService} from '../../../../services/online_res/online-res.service';
import {SubjectService} from '../../../../services/subject.service';

@Component({
    selector: 'app-online-register',
    templateUrl: './online-register.component.html',
    styleUrls: ['./online-register.component.css']
})
export class OnlineRegisterComponent implements OnInit {
    title: String;
    description: String;
    subject: String;
    link: String;
    subjects: Object;

    constructor(private router: Router,
                private flashMessage: FlashMessagesService,
                private onlineResService: OnlineResService,
                private subjectService: SubjectService) {

        subjectService.getSubjects().subscribe(subjects => {
            this.subjects = subjects;
        });
    }

    ngOnInit() {
    }

    onRegisterSubmit(formList: any) {
        const onlineRes = {
            title: this.title,
            description: this.description,
            subject: this.subject,
            link: this.link
        }

        this.onlineResService.registerOnlineRes(onlineRes).subscribe(data => {
            if (data['success']) {
                this.flashMessage.show('New resource added', {cssClass: 'alert-success', timeout: 3000});
                formList.form.reset();
            } else {
                this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
                //  this.router.navigate(['/register']);
            }
        });
    }

}
