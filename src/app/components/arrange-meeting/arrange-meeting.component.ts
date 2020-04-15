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
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import {AllocateComponent} from '../allocate/allocate.component';
import {CountryService} from '../../service/country.service';
import {DecimalPipe} from '@angular/common';
import {Student} from '../../../models/Student';
import {StudentService} from '../../service/student.service';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {int} from 'flatpickr/dist/utils';
import {ScheduleService} from '../../schedule.service';

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
  schedule$: Observable<CalendarEvent[]>;
  closeDiv = 'value';
  private eachStudent: Student;
  invite: string;
  private searchStudent = new Subject<string>();
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[];

  activeDayIsOpen = true;

  constructor(private modal: NgbModal, private studentService: StudentService, private scheduleService: ScheduleService) {
    this.getAllSchedule();
  }
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
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

  eventTimesChanged({event, newStart,
                      newEnd}: CalendarEventTimesChangedEvent): void {
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
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        invite: '',
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
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  acceptEvent(event: CalendarEvent<any>) {
  }
  searchStudentAllocate(searchStudent: string): void {
    console.log(`search nhập từ bàn phím student = ${searchStudent}`);
    this.searchStudent.next(searchStudent);
  }

  ngOnInit(): void {
    this.students$ = this.searchStudent.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((searchStudent: string) => this.studentService.searchStudent(searchStudent))
    );
  }

  clickStudent(eachStudent: Student) {
    this.eachStudent = eachStudent;
    this.invite = eachStudent.name;
    this.closeDiv = null;
    console.log(this.events);
  }
  getAllSchedule(): void {
    this.scheduleService.getScheduleEvent().subscribe(
      scheduleRecieve => {
        this.events = scheduleRecieve;
        this.events.forEach(obj => obj.actions = this.actions);
      }
    );
  }
}
