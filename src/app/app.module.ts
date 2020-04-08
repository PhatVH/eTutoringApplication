import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllocateComponent } from './allocate/allocate.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {LoginComponent} from './login/login.component';
import {StudentService} from './student.service';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {ClassService} from './class.service';
import {TutorService} from './tutor.service';
import { AllocateAddComponent } from './allocate-add/allocate-add.component';
import { AllocateRemoveComponent } from './allocate-remove/allocate-remove.component';
import { EventComponent } from './event/event.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ManageSectionComponent } from './manage-section/manage-section.component';
import { ReportComponent } from './report/report.component';
import { ContactComponent } from './contact/contact.component';
import { ForewordComponent } from './table/foreword.component';
import { OurServicesComponent } from './our-services/our-services.component';
import {ChartsModule} from 'ng2-charts';
import {CountdownModule} from 'ng2-date-countdown';
import {AuthGaurdService} from './auth-gaurd.service';

import { ListStudentComponent } from './list-student/list-student.component';
import { ListBlogComponent } from './list-blog/list-blog.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ClockComponent } from './clock/clock.component';

@NgModule({
  declarations: [
    AppComponent,
    AllocateComponent,
    ErrorPageComponent,
    DashboardComponent,
    LoginComponent,
    AllocateAddComponent,
    AllocateRemoveComponent,
    EventComponent,
    AboutUsComponent,
    ManageSectionComponent,
    ReportComponent,
    ContactComponent,
    ForewordComponent,
    OurServicesComponent,
    ListStudentComponent,
    ListBlogComponent,
    HeaderComponent,
    FooterComponent,
    ClockComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    ChartsModule,
    CountdownModule
  ],
  providers: [
    StudentService,
    ClassService,
    TutorService,
    AuthGaurdService,
    LoginComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
