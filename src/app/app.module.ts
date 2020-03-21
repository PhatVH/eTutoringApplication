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


@NgModule({
  declarations: [
    AppComponent,
    AllocateComponent,
    ErrorPageComponent,
    DashboardComponent,
    LoginComponent,
    AllocateAddComponent,
    AllocateRemoveComponent,
    EventComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    ReactiveFormsModule
  ],
  providers: [
    StudentService,
    ClassService,
    TutorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
