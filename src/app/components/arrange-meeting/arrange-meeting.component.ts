import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef, OnInit,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import {Observable, Subject} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import {AllocateComponent} from '../allocate/allocate.component';
import {Student} from '../../models/Student';
import {StudentService} from '../../service/manage-student/student.service';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {ScheduleService} from '../../service/schedule/schedule.service';
import {LoginComponent} from '../login/login.component';
import {Tutor} from '../../models/Tutor';
import {TutorService} from '../../service/manage-tutor/tutor.service';
import {Constant} from '../../models/Constant';

@Component({
  selector: 'app-arrange-meeting',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './arrange-meeting.component.html',
  styleUrls: ['./arrange-meeting.component.css'],
  providers: [AllocateComponent, ScheduleService]
})
export class ArrangeMeetingComponent implements OnInit {
  students$: Observable<Student[]>;
  closeDiv;
  private eachStudent: Student;
  invite: string;
  studentInvitedID: any;
  private searchStudent = new Subject<string>();
  @ViewChild('modalContent', {static: true}) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-eye"></i>',
      a11yLabel: 'Edit',
      onClick: ({event}: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      a11yLabel: 'Delete',
      onClick: ({event}: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.scheduleService.deleteMeeting(event.id).subscribe(result => alert(result.message));

      },
    },
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[];

  activeDayIsOpen = false;
  divAlert: any = null;

  constructor(private modal: NgbModal,
              private studentService: StudentService,
              private tutorServide: TutorService,
              private scheduleService: ScheduleService,
              private loginComponent: LoginComponent) {
    this.getAllSchedule();

  }

  user = this.loginComponent.getUser();

  dayClicked({date, events}: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
                      event, newStart,
                      newEnd
                    }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = {event, action};
    this.modal.open(this.modalContent, {size: 'lg'});
  }

  addEvent(type): void {
    console.log(`add new`)
    if (type === 'student') {
      this.invite = this.user.tutor_name;
      console.log(this.user.tutor_name);
    }
    this.events = [
      ...this.events,
      {
        title: 'New event',
        host: this.user.name,
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        invite: this.invite,
        actions: this.actions,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  searchStudentSchedule(searchStudent: string): void {
    this.searchStudent.next(searchStudent);
    this.closeDiv = 'value';
  }

  ngOnInit(): void {
    this.students$ = this.searchStudent.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      // tslint:disable-next-line:max-line-length
      switchMap((searchStudent: string) => this.studentService.searchStudentInvite(searchStudent, `${Constant.getStudentsByTutorIdUrl}?tutor_ID=${this.user.id}`))
    );
  }

  clickStudent(eachStudent) {
    this.closeDiv = null;
    this.eachStudent = eachStudent;
    const indexEvent = this.events.length - 1;
    this.events[indexEvent].invite = eachStudent.name;
    this.studentInvitedID = eachStudent.id;
  }

  getAllSchedule(): void {
    this.scheduleService.getScheduleEvent(this.user.user_ID).subscribe(
      scheduleRecieve => {
        this.events = scheduleRecieve;
        this.events.forEach(obj => {
          obj.actions = this.actions;
          obj.start = new Date(obj.start);
          obj.end = new Date(obj.end);
        });
      }
    );
  }

  deleteEventBtn(eventDelete: CalendarEvent) {
    console.log(`eventDelete`);
    console.log(eventDelete);
    this.events = this.events.filter((event) => event !== eventDelete);
    this.scheduleService.deleteMeeting(eventDelete.id).subscribe(result => alert(result.message));
  }

  InviteEventBtn(event: CalendarEvent<any>) {
    if (event.invite == null || event.host == null || event.title == null) {
      alert('You need fill in all information');
      this.divAlert = 'value';
    } else {
      this.divAlert = null;
      if (this.user.type === 'student') {
        this.scheduleService.createMeeting(this.user.user_ID, this.user.tutor_ID, event.start, event.end, event.title).subscribe(
          result => alert(result.message)
        );
      } else {
        this.scheduleService.createMeeting(this.user.user_ID, this.studentInvitedID, event.start, event.end, event.title).subscribe(
          result => alert(result.message)
        );
      }
    }
  }
/*
  getAllSchedule(): void {
    this.scheduleService.getScheduleEvent().subscribe(
      scheduleRecieve => {
        this.events = scheduleRecieve;
        this.events.forEach(obj => {
          obj.actions = this.actions;
          obj.start = new Date(obj.start);
          obj.end = new Date(obj.end);
        });
      }

    );
  }*/
}
