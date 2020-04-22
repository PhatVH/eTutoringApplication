import {HttpHeaders} from '@angular/common/http';

export class Constant {
  public static headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
  public static studentsURL = 'https://agile-reaches-44577.herokuapp.com/api/getAllStudents';
  public static loginURL = 'https://agile-reaches-44577.herokuapp.com/api/login';
  public static setTutorToStudentUrl = 'https://agile-reaches-44577.herokuapp.com/api/setTutorToStudent';
  public static reallocateTutorToStudentUrl = 'https://agile-reaches-44577.herokuapp.com/api/reallocateTutorToStudent';
  public static tutorsURL = 'https://agile-reaches-44577.herokuapp.com/api/getAllTutor';
  public static scheduleURL = 'http://localhost:3000/schedule';
  public static chatURL = 'http://localhost:3000/chat';
  static studentWithoutTutorURL = 'https://agile-reaches-44577.herokuapp.com/api/studentsWithoutTutor';
  static studentWithNoInteractionURL = 'https://agile-reaches-44577.herokuapp.com/api/studentsWithNoInteraction';
  static deleteMeetingURL = 'https://agile-reaches-44577.herokuapp.com/api/studentsWithNoInteraction';
  static getTutorByStudentIdUrl = 'https://agile-reaches-44577.herokuapp.com/api/getTutorByStudentId';
}
