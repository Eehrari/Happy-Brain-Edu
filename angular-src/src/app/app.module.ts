import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {MatTableModule, MatPaginatorModule, MatSortModule, MatButtonModule, MatCheckboxModule} from "@angular/material";
import {AppComponent} from './app.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {LoginComponent} from './components/login/login.component';
import {HomeComponent} from './components/home/home.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {ProfileComponent} from './components/profile/profile.component';

import {ValidateService} from './services/validate.service';
import {AuthService} from './services/auth.service';
import {FlashMessagesModule} from 'angular2-flash-messages';
import {AuthGuard} from './guards/auth.guard';
import {HttpClientModule} from "@angular/common/http";
import { StudentRegisterComponent } from './components/student/register/student-register/student-register.component';
import { MentorRegisterComponent } from './components/mentor/register/mentor-register/mentor-register.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

import { DataTableComponent } from './data-table/data-table.component';
import {AdminRegisterComponent} from "./components/admin/admin-register/admin-register.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { AdminListComponent } from './components/admin/admin-list/admin-list.component';
import { AdminEditComponent } from './components/admin/admin-edit/admin-edit.component';
import { StudentListComponent } from './components/student/student-list/student-list.component';
import { StudentEditComponent } from './components/student/student-edit/student-edit.component';
import { MentorListComponent } from './components/mentor/mentor-list/mentor-list.component';
import { MentorEditComponent } from './components/mentor/mentor-edit/mentor-edit.component';
import { SubjectRegisterComponent } from './components/subjects/subject-register/subject-register.component';
import { SubjectListComponent } from './components/subjects/subject-list/subject-list.component';
import { SubjectEditComponent } from './components/subjects/subject-edit/subject-edit.component';
import { OnlineRegisterComponent } from './components/resources/online/online-register/online-register.component';
import { OnlineEditComponent } from './components/resources/online/online-edit/online-edit.component';
import { OnlineListComponent } from './components/resources/online/online-list/online-list.component';
import { LocalRegisterComponent } from './components/resources/local/local-register/local-register.component';
import { LocalEditComponent } from './components/resources/local/local-edit/local-edit.component';
import { LocalListComponent } from './components/resources/local/local-list/local-list.component';

const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'student-register', component: StudentRegisterComponent},
    {path: 'mentor-register', component: MentorRegisterComponent},
    {path: 'login', component: LoginComponent},
    {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
    {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
    {path: 'admin-register', component: AdminRegisterComponent, canActivate: [AuthGuard]},
    {path: 'admin-list', component: AdminListComponent, canActivate: [AuthGuard]},
    {path: 'admin-list/:id', component: AdminListComponent, canActivate: [AuthGuard]},
    {path: 'admin-edit/:id', component: AdminEditComponent, canActivate: [AuthGuard]},
    {path: 'student-list', component: StudentListComponent, canActivate: [AuthGuard]},
    {path: 'student-list/:id', component: StudentListComponent, canActivate: [AuthGuard]},
    {path: 'student-edit/:id', component: StudentEditComponent, canActivate: [AuthGuard]},
    {path: 'mentor-list', component: MentorListComponent, canActivate: [AuthGuard]},
    {path: 'mentor-list/:id', component: MentorListComponent, canActivate: [AuthGuard]},
    {path: 'mentor-edit/:id', component: MentorEditComponent, canActivate: [AuthGuard]},
    {path: 'subject-edit/:id', component: SubjectEditComponent, canActivate: [AuthGuard]},
    {path: 'subject-list/:id', component: SubjectListComponent, canActivate: [AuthGuard]},
    {path: 'subject-list', component: SubjectListComponent, canActivate: [AuthGuard]},
    {path: 'subject-register', component: SubjectRegisterComponent, canActivate: [AuthGuard]},
    {path: 'online-register', component: OnlineRegisterComponent, canActivate: [AuthGuard]},
    {path: 'online-edit/:id', component: OnlineEditComponent, canActivate: [AuthGuard]},
    {path: 'online-list/:id', component: OnlineListComponent, canActivate: [AuthGuard]},
    {path: 'online-list', component: OnlineListComponent, canActivate: [AuthGuard]},
    {path: 'local-register', component: LocalRegisterComponent, canActivate: [AuthGuard]},
    {path: 'local-edit/:id', component: LocalEditComponent, canActivate: [AuthGuard]},
    {path: 'local-list/:id', component: LocalListComponent, canActivate: [AuthGuard]},
    {path: 'local-list', component: LocalListComponent, canActivate: [AuthGuard]},
]

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        LoginComponent,
        HomeComponent,
        DashboardComponent,
        ProfileComponent,
        StudentRegisterComponent,
        MentorRegisterComponent,
        SidebarComponent,
        AdminRegisterComponent,
        DataTableComponent,
        AdminListComponent,
        AdminEditComponent,
        StudentListComponent,
        StudentEditComponent,
        MentorListComponent,
        MentorEditComponent,
        SubjectRegisterComponent,
        SubjectListComponent,
        SubjectEditComponent,
        OnlineRegisterComponent,
        OnlineEditComponent,
        OnlineListComponent,
        LocalRegisterComponent,
        LocalEditComponent,
        LocalListComponent,

    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),
        FlashMessagesModule.forRoot(),
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatButtonModule,
        MatCheckboxModule,
        BrowserAnimationsModule,


    ],
    providers: [ValidateService, AuthService, AuthGuard],
    bootstrap: [AppComponent]
})
export class AppModule {
}
