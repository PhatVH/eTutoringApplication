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
import {StudentService} from '../../service/student.service';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {ScheduleService} from '../../service/schedule.service';
import {LoginComponent} from '../login/login.component';
import {Tutor} from '../../models/Tutor';
import {TutorService} from '../../service/tutor.service';
import {Constant} from '../../models/Constant';

const colors: any = {
  red: {
    primary: '#ad2121',
  }
};

@Component({
  selector: 'app-arrange-meeting',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './arrange-meeting.component.html',
  styleUrls: ['./arrange-meeting.component.css'],
  providers: [AllocateComponent, ScheduleService]
})
export class ArrangeMeetingComponent implements OnInit {
  students$: Observable<Student[]>;
  tutors$: Observable<Tutor[]>;
  closeDiv;
  private eachStudent: Student;
  invite: string;
  private searchStudent = new Subject<string>();
  private searchTutor = new Subject<string>();
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
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[];

  activeDayIsOpen = true;

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

  addEvent(): void {
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

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
    this.scheduleService.deleteMeeting(eventToDelete).subscribe(result => console.log(result));
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  acceptEvent(event: CalendarEvent<any>) {
  }

  searchStudentSchedule(searchStudent: string): void {
    this.searchStudent.next(searchStudent);
    this.closeDiv = 'value';
  }

  searchTutorSchedule(searchTutor: string) {
    this.searchTutor.next(searchTutor);
    this.closeDiv = 'value';
  }

  ngOnInit(): void {
    this.students$ = this.searchStudent.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((searchStudent: string) => this.studentService.searchStudent(searchStudent, Constant.studentsURL))
    );

    this.tutors$ = this.searchTutor.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((searchTutor: string) => this.tutorServide.searchTutor(searchTutor))
    );
  }

  clickStudent(eachStudent) {
    console.log(`click student`);
    this.closeDiv = null;
    this.eachStudent = eachStudent;
    this.invite = eachStudent.name;
    console.log(this.events);
  }

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
}
}
