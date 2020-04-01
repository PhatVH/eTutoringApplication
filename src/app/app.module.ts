import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ListStudentComponent } from './list-student/list-student.component';
import { ListBlogComponent } from './list-blog/list-blog.component';

@NgModule({
  declarations: [
    AppComponent,
    ListStudentComponent,
    ListBlogComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
