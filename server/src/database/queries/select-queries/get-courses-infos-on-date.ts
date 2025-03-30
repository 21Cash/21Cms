import { and, eq } from "drizzle-orm";
import { db } from "../../db";
import {
  courseAttendanceInfos,
  courses,
  fullAttendanceInfos,
} from "../../schema";

interface GetCoursesInfoProps {
  userId: string;
  dateString: string;
}

const getCoursesInfoByDate = async ({
  userId,
  dateString,
}: GetCoursesInfoProps) => {
  const fullAttendaceResult = await db
    .select({
      fullAttendanceId: fullAttendanceInfos.id,
    })
    .from(fullAttendanceInfos)
    .where(
      and(
        eq(fullAttendanceInfos.userId, userId),
        eq(fullAttendanceInfos.date, dateString)
      )
    );

  const fullAttendanceId =
    fullAttendaceResult.length === 0
      ? null
      : fullAttendaceResult[0].fullAttendanceId;

  if (fullAttendanceId === null) {
    return [];
  }

  const coursesInfos = await db
    .select({
      fullAttendanceInfoId: courseAttendanceInfos.fullAttendanceInfoId,
      courseCode: courseAttendanceInfos.courseCode,
      classesHeld: courseAttendanceInfos.classesHeld,
      classesPresent: courseAttendanceInfos.classesPresent,
      presentDelta: courseAttendanceInfos.presentDelta,
      absentDelta: courseAttendanceInfos.absentDelta,
      courseAttendancePercentage:
        courseAttendanceInfos.courseAttendancePercentage,
      courseName: courses.courseName,
    })
    .from(courseAttendanceInfos)
    .innerJoin(
      courses,
      eq(courseAttendanceInfos.courseCode, courses.courseCode)
    )
    .where(eq(courseAttendanceInfos.fullAttendanceInfoId, fullAttendanceId));

  return coursesInfos;
};

export { getCoursesInfoByDate };
