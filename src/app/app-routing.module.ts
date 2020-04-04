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
  {path: 'report', component: ReportComponent, canActivate: [AuthGaurdService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
