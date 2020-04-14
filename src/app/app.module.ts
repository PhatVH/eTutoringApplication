import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllocateComponent } from './components/allocate/allocate.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {LoginComponent} from './components/login/login.component';
import {StudentService} from './service/student.service';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {ClassService} from './service/class.service';
import {TutorService} from './service/tutor.service';
import { AllocateAddComponent } from './components/allocate-add/allocate-add.component';
import { AllocateRemoveComponent } from './components/allocate-remove/allocate-remove.component';
import { EventComponent } from './components/event/event.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ManageSectionComponent } from './components/manage-section/manage-section.component';
import { ReportComponent } from './components/report/report.component';
import { ContactComponent } from './components/contact/contact.component';
import { OurServicesComponent } from './components/our-services/our-services.component';
import {ChartsModule} from 'ng2-charts';
import {CountdownModule} from 'ng2-date-countdown';
import {AuthGaurdService} from './service/auth-gaurd.service';
import { ChatComponent } from './components/chat/chat.component';
import { ArrangeMeetingComponent } from './components/arrange-meeting/arrange-meeting.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import {FlatpickrModule} from 'angularx-flatpickr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgbModalModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ListStudentComponent } from './components/list-student/list-student.component';
import { ListBlogComponent } from './components/list-blog/list-blog.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ClockComponent } from './components/clock/clock.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { BlogComponent } from './components/blog/blog.component';
import { ManageStudentComponent } from './components/manage-student/manage-student.component';
import { ManageTutorComponent } from './components/manage-tutor/manage-tutor.component';
import { SortableDirective } from './sortable.directive';
import {CommonModule} from '@angular/common';

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
    OurServicesComponent,
    ListStudentComponent,
    ListBlogComponent,
    HeaderComponent,
    FooterComponent,
    ClockComponent,
    OurServicesComponent,
    ListStudentComponent,
    ListBlogComponent,
    ChatComponent,
    ArrangeMeetingComponent,
    CarouselComponent,
    HomepageComponent,
    BlogComponent,
    ManageStudentComponent,
    ManageTutorComponent,
    SortableDirective
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
