import { UUID } from "crypto";
import { courseAttendanceInfos, fullAttendanceInfos } from "../schema";
import { db } from "../db";
import { CourseAttendanceInfo } from "../db-types";

interface CourseAttendanceInfoProps {
  fullAttendanceId: string;
  courseCode: string;
  classesHeld: number;
  classesPresent: number;
}

const registerCourseAttendanceInfo = async ({
  fullAttendanceId,
  courseCode,
  classesHeld,
  classesPresent,
}: CourseAttendanceInfoProps): Promise<CourseAttendanceInfo> => {
  const courseAttendancePercentage =
    classesHeld == 0 ? 0 : (classesPresent / classesHeld) * 100;

  const courseAttendanceInfo = {
    fullAttendanceId,
    courseCode,
    classesHeld,
    classesPresent,
    courseAttendancePercentage,
  };

  const result = await db
    .insert(courseAttendanceInfos)
    .values(courseAttendanceInfo)
    .returning();

  return result[0];
};
