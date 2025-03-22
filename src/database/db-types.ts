import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import {
  users,
  courses,
  fullAttendanceInfos,
  courseAttendanceInfos,
} from "./schema";

// USERS table
type User = InferSelectModel<typeof users>;
type NewUser = InferInsertModel<typeof users>;

// COURSES table
type Course = InferSelectModel<typeof courses>;
type NewCourse = InferInsertModel<typeof courses>;

// FULL ATTENDANCE INFOS table
type FullAttendanceInfo = InferSelectModel<typeof fullAttendanceInfos>;
type NewFullAttendanceInfo = InferInsertModel<typeof fullAttendanceInfos>;

// COURSE ATTENDANCE INFOS table
type CourseAttendanceInfo = InferSelectModel<typeof courseAttendanceInfos>;
type NewCourseAttendanceInfo = InferInsertModel<typeof courseAttendanceInfos>;

export {
  User,
  NewUser,
  Course,
  NewCourse,
  FullAttendanceInfo,
  NewFullAttendanceInfo,
  CourseAttendanceInfo,
  NewCourseAttendanceInfo,
};
