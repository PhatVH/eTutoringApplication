import {HttpHeaders} from '@angular/common/http';

export class Constant {
  /*header*/
  public static headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
  public static loginURL = 'https://agile-reaches-44577.herokuapp.com/api/login';

  /* tutor*/
  public static tutorsURL = 'https://agile-reaches-44577.herokuapp.com/api/getAllTutor';
  public static setTutorToStudentUrl = 'https://agile-reaches-44577.herokuapp.com/api/setTutorToStudent';
  public static reallocateTutorToStudentUrl = 'https://agile-reaches-44577.herokuapp.com/api/reallocateTutorToStudent';

  /*student*/
  public static studentsURL = 'https://agile-reaches-44577.herokuapp.com/api/getAllStudents';
  static getTutorByStudentIdUrl = 'https://agile-reaches-44577.herokuapp.com/api/getTutorByStudentId';
  static getStudentsByTutorIdUrl = 'https://agile-reaches-44577.herokuapp.com/api/getStudentsByTutorId';

  /*  report*/
  static studentWithoutTutorURL = 'https://agile-reaches-44577.herokuapp.com/api/studentsWithoutTutor';
  static studentWithNoInteractionURL = 'https://agile-reaches-44577.herokuapp.com/api/studentsWithNoInteraction';

  /* meeting-schedule*/
  static getMeetingByHostURL = 'https://agile-reaches-44577.herokuapp.com/api/getMeetingByHost';
  static deleteMeetingURL = 'https://agile-reaches-44577.herokuapp.com/api/deleteMeeting';
  static createMeetingUrl = 'https://agile-reaches-44577.herokuapp.com/api/createMeeting';

  /*chat*/
  public static chatURL = 'http://localhost:3000/chat';
  public static scheduleURL = 'http://localhost:3000/schedule';

}

