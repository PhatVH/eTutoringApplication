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


const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'login', component: LoginComponent},
  {path: 'allocateAdd', component: AllocateAddComponent},
  {path: 'allocateRemove', component: AllocateRemoveComponent},
  {path: 'errorPage', component: ErrorPageComponent},
  {path: 'event', component: EventComponent},
  {path: 'aboutUs', component: AboutUsComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'report', component: ReportComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
