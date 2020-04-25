import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllocateComponent } from './components/allocate/allocate.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {LoginComponent} from './components/login/login.component';
import {StudentService} from './service/manage-student/student.service';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {ClassService} from './service/login/class.service';
import {TutorService} from './service/manage-tutor/tutor.service';
import { AllocateRemoveComponent } from './components/allocate-remove/allocate-remove.component';
import { EventComponent } from './components/event/event.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ReportComponent } from './components/report/report.component';
import { ContactComponent } from './components/contact/contact.component';
import { OurServicesComponent } from './components/our-services/our-services.component';
import {ChartsModule} from 'ng2-charts';
import {CountdownModule} from 'ng2-date-countdown';
import {AuthGaurdService} from './service/auth-gaurd/auth-gaurd.service';
import { ArrangeMeetingComponent } from './components/arrange-meeting/arrange-meeting.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import {FlatpickrModule} from 'angularx-flatpickr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgbModalModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ClockComponent } from './components/clock/clock.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { BlogComponent } from './components/blog/blog.component';
import { ManageStudentComponent } from './components/manage-student/manage-student.component';
import { ManageTutorComponent } from './components/manage-tutor/manage-tutor.component';
import { SortableDirective } from './service/sortable/sortable.directive';
import {CommonModule} from '@angular/common';
import { DashboardStudentComponent } from './components/dashboard-student/dashboard-student.component';
import { DashboardTutorComponent } from './components/dashboard-tutor/dashboard-tutor.component';
import { ChatTutorComponent } from './components/dashboard-tutor/chat-tutor/chat-tutor.component';
import { MeetingTutorComponent } from './components/dashboard-tutor/meeting-tutor/meeting-tutor.component';
import { DocumentTutorComponent } from './components/dashboard-tutor/document-tutor/document-tutor.component';
import { DocumentStudentComponent } from './components/dashboard-student/document-student/document-student.component';
import { MeetingStudentComponent } from './components/dashboard-student/meeting-student/meeting-student.component';
import { ChatStudentComponent } from './components/dashboard-student/chat-student/chat-student.component';
import { EmailComponent } from './components/email/email.component';

@NgModule({
  declarations: [
    AppComponent,
    AllocateComponent,
    ErrorPageComponent,
    DashboardComponent,
    LoginComponent,
    AllocateRemoveComponent,
    EventComponent,
    AboutUsComponent,
    ReportComponent,
    ContactComponent,
    OurServicesComponent,
    HeaderComponent,
    FooterComponent,
    ClockComponent,
    OurServicesComponent,
    ArrangeMeetingComponent,
    CarouselComponent,
    HomepageComponent,
    BlogComponent,
    ManageStudentComponent,
    ManageTutorComponent,
    SortableDirective,
    DashboardStudentComponent,
    DashboardTutorComponent,
    ChatTutorComponent,
    MeetingTutorComponent,
    DocumentTutorComponent,
    DocumentStudentComponent,
    MeetingStudentComponent,
    ChatStudentComponent,
    EmailComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    ChartsModule,
    CountdownModule,
    NgbModalModule,
    FlatpickrModule.forRoot(),
    BrowserAnimationsModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory })
  ],
  providers: [
    StudentService,
    ClassService,
    TutorService,
    AuthGaurdService,
    LoginComponent,
    SortableDirective
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
