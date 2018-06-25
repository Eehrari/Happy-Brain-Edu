import {Component, OnInit} from '@angular/core';
import {FlashMessagesService} from 'angular2-flash-messages';
import {SubjectService} from '../../../../services/subject.service';
import {LocalResService} from '../../../../services/local_res/local-res.service';
import {FileSelectDirective, FileUploader} from 'ng2-file-upload';
import {saveAs} from 'file-saver';

const uri = 'http://localhost:3000/local-res/upload';

@Component({
    selector: 'app-local-register',
    templateUrl: './local-register.component.html',
    styleUrls: ['./local-register.component.css']
})
export class LocalRegisterComponent implements OnInit {

    uploader: FileUploader = new FileUploader({url: uri});
    attachmentList: any = [];
    title: String;
    description: String;
    subject: String;
    fileUplaod: String;
    subjects: Object;

    constructor(private flashMessage: FlashMessagesService,
                private localResService: LocalResService,
                private subjectService: SubjectService) {

        subjectService.getSubjects().subscribe(subjects => {
            this.subjects = subjects;
        });
        this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
            this.attachmentList.push(JSON.parse(response));
        };
    }

    ngOnInit() {
        this.uploader.onBeforeUploadItem = (item) => {
            item.withCredentials = false;
        };
    }

    onRegisterSubmit(formList: any) {
        const localRes = {
            title: this.title,
            description: this.description,
            subject: this.subject,
            fileUplaod: this.fileUplaod
        }

        this.localResService.registerLocalRes(localRes).subscribe(data => {
            if (data['success']) {
                this.flashMessage.show('New resource added', {cssClass: 'alert-success', timeout: 3000});
                formList.form.reset();
            } else {
                this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
            }
        });
    }

}
