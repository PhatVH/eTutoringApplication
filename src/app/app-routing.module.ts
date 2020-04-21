import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ErrorPageComponent} from './components/error-page/error-page.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {LoginComponent} from './components/login/login.component';
import {AllocateRemoveComponent} from './components/allocate-remove/allocate-remove.component';
import {EventComponent} from './components/event/event.component';
import {AboutUsComponent} from './components/about-us/about-us.component';
import {ContactComponent} from './components/contact/contact.component';
import {ReportComponent} from './components/report/report.component';
import {AuthGaurdService} from './service/auth-gaurd.service';
import {ChatComponent} from './components/chat/chat.component';
import {ArrangeMeetingComponent} from './components/arrange-meeting/arrange-meeting.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { BlogComponent } from './components/blog/blog.component';
import {ManageStudentComponent} from './components/manage-student/manage-student.component';
import {ManageTutorComponent} from './components/manage-tutor/manage-tutor.component';
import { DashboardStudentComponent } from './components/dashboard-student/dashboard-student.component';
import {AllocateComponent} from './components/allocate/allocate.component';
const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'dashboardStudent', component: DashboardStudentComponent},
  {path: 'login', component: LoginComponent},
  {path: 'allocate', component: AllocateComponent},
  {path: 'Reallocate', component: AllocateRemoveComponent},
  {path: 'errorPage', component: ErrorPageComponent},
  {path: 'event', component: EventComponent},
  {path: 'aboutUs', component: AboutUsComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'report', component: ReportComponent},
  {path: 'chat', component: ChatComponent},
  {path: 'schedule', component: ArrangeMeetingComponent},
  {path: 'blog', component: BlogComponent, canActivate: [AuthGaurdService]},
  {path: 'home', component: HomepageComponent},
  {path: 'manageStudent', component: ManageStudentComponent},
  {path: 'manageTutor', component: ManageTutorComponent}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
