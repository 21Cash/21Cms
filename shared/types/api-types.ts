export type UserDashboardData = {
  username: string;
  lastRefreshed: Date;
  totalClassesAbsent: number;
  totalClassesHeld: number;
  totalClassesPresent: number;
  attendancePercentage: number;
  todaysCoursesData: {
    fullAttendanceInfoId: string;
    courseCode: string;
    classesHeld: number;
    classesPresent: number;
    presentDelta: number;
    absentDelta: number;
    courseAttendancePercentage: number;
    courseName: string;
  }[];
  attendanceHistoryData: {
    classesAbsent: number;
    date: string;
    classesHeld: number;
    classesPresent: number;
    attendancePercentage: number;
  }[];
};

export type CoursesData = {
  fullAttendanceInfoId: string;
  courseCode: string;
  classesHeld: number;
  classesPresent: number;
  presentDelta: number;
  absentDelta: number;
  courseAttendancePercentage: number;
  courseName: string;
}[];
