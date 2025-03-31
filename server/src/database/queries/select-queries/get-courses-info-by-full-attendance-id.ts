import { eq } from "drizzle-orm";
import { db } from "../../db";
import { courseAttendanceInfos, courses } from "../../schema";

export const getCoursesInfoByFullAttendanceId = async ({
  fullAttendanceId,
}: {
  fullAttendanceId: string;
}) => {
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
