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
  static getNumberOfChatStudentURL = 'https://agile-reaches-44577.herokuapp.com/api/getNumberOfChatStudent';
  static getNumberOfChatTutorURL = 'https://agile-reaches-44577.herokuapp.com/api/getNumberOfChatTutor';
  static getNumberOfChatURL = 'https://agile-reaches-44577.herokuapp.com/api/getNumberOfChat';

  /* meeting-schedule*/
  static getAllMeetingsByUserIdURL = 'https://agile-reaches-44577.herokuapp.com/api/getAllMeetingsByUserId';
  static deleteMeetingURL = 'https://agile-reaches-44577.herokuapp.com/api/deleteMeeting';
  static createMeetingUrl = 'https://agile-reaches-44577.herokuapp.com/api/createMeeting';
  static studentCreateMeetingUrl = 'https://agile-reaches-44577.herokuapp.com/api/studentCreateMeeting';

  /*chat*/
  static sendMessageURL = 'https://agile-reaches-44577.herokuapp.com/api/sendMessage';
  static getAllMessageURL = 'https://agile-reaches-44577.herokuapp.com/api/getAllMessage';

  /*notifycation*/
  static getNotificationURL = 'https://agile-reaches-44577.herokuapp.com/api/getNotification';


}

