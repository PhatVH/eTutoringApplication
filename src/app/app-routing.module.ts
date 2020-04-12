import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ErrorPageComponent} from './error-page/error-page.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {LoginComponent} from './login/login.component';
import {AllocateAddComponent} from './allocate-add/allocate-add.component';
import {AllocateRemoveComponent} from './allocate-remove/allocate-remove.component';
import {EventComponent} from './event/event.component';
import {AboutUsComponent} from './about-us/about-us.component';
import {ContactComponent} from './contact/contact.component';
import {ReportComponent} from './report/report.component';
import {AuthGaurdService} from './auth-gaurd.service';
import {ChatComponent} from './chat/chat.component';
import {ArrangeMeetingComponent} from './arrange-meeting/arrange-meeting.component';
import {ListBlogComponent } from './list-blog/list-blog.component';
import { ManageSectionComponent } from './manage-section/manage-section.component';
import { HomepageComponent } from './homepage/homepage.component';
import { BlogComponent } from './blog/blog.component';


const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGaurdService]},
  {path: 'login', component: LoginComponent},
  {path: 'allocateAdd', component: AllocateAddComponent, canActivate: [AuthGaurdService]},
  {path: 'allocateRemove', component: AllocateRemoveComponent, canActivate: [AuthGaurdService]},
  {path: 'errorPage', component: ErrorPageComponent, canActivate: [AuthGaurdService]},
  {path: 'event', component: EventComponent, canActivate: [AuthGaurdService]},
  {path: 'aboutUs', component: AboutUsComponent, canActivate: [AuthGaurdService]},
  {path: 'contact', component: ContactComponent, canActivate: [AuthGaurdService]},
  {path: 'report', component: ReportComponent, canActivate: [AuthGaurdService]},
  {path: 'chat', component: ChatComponent, canActivate: [AuthGaurdService]},
  {path: 'arrageMeeting', component: ArrangeMeetingComponent, canActivate: [AuthGaurdService]},
  {path: 'blog', component: BlogComponent, canActivate: [AuthGaurdService]},
  {path: 'manage-section', component: ManageSectionComponent, canActivate: [AuthGaurdService]},
  {path: 'home', component: HomepageComponent, canActivate: [AuthGaurdService]}

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
