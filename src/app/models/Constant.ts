import {HttpHeaders} from '@angular/common/http';

export class Constant {
  public static headerURL = 'https://agile-reaches-44577.herokuapp.com/api/';
  /*header*/
  public static headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
  public static loginURL = Constant.headerURL + 'login';

  /* tutor*/
  public static tutorsURL = Constant.headerURL + 'getAllTutor';
  public static setTutorToStudentUrl = Constant.headerURL + 'setTutorToStudent';

  /*student*/
  public static studentsURL = Constant.headerURL + 'getAllStudents';
  static getTutorByStudentIdUrl = Constant.headerURL + 'getTutorByStudentId';
  static getStudentsByTutorIdUrl = Constant.headerURL + 'getStudentsByTutorId';

  /*  report*/
  static studentWithoutTutorURL = Constant.headerURL + 'studentsWithoutTutor';
  static studentWithNoInteractionURL = Constant.headerURL + 'studentsWithNoInteraction';
  static getNumberOfChatStudentURL = Constant.headerURL + 'getNumberOfChatStudent';
  static getNumberOfChatTutorURL = Constant.headerURL + 'getNumberOfChatTutor';
  static getNumberOfChatURL = Constant.headerURL + 'getNumberOfChat';
  static getTotalNumberOfChatsUrl = Constant.headerURL + 'getTotalNumberOfChats';

  /* meeting-schedule*/
  static getAllMeetingsByUserIdURL = Constant.headerURL + 'getAllMeetingsByUserId';
  static deleteMeetingURL = Constant.headerURL + 'deleteMeeting';
  static createMeetingUrl = Constant.headerURL + 'createMeeting';
  static studentCreateMeetingUrl = Constant.headerURL + 'studentCreateMeeting';

  /*chat*/
  static sendMessageURL = Constant.headerURL + 'sendMessage';
  static getAllMessageURL = Constant.headerURL + 'getAllMessage';

  /*notifycation*/
  static getNotificationURL = Constant.headerURL + 'getNotification';

  /*note*/
  static addNoteURL = Constant.headerURL + 'addNote';
  static showNotesURL = Constant.headerURL + 'showNotes';
  static deleteNoteURL = Constant.headerURL + 'deleteNote';


}

