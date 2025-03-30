import { CourseAttendanceInfo } from "../../db-types";
import { getAttendancePercentage } from "../../../lib/utils/get-attendance-percentage";
import { db } from "../../db";
import { courseAttendanceInfos } from "../../schema";
import { sql } from "drizzle-orm";

interface CourseAttendanceInfoProps {
  fullAttendanceInfoId: string;
  courseInfos: {
    courseCode: string;
    classesHeld: number;
    classesPresent: number;
    presentDelta: number;
    absentDelta: number;
  }[];
}

const upsertCourseAttendanceInfos = async ({
  fullAttendanceInfoId,
  courseInfos,
}: CourseAttendanceInfoProps) => {
  const coursesData = courseInfos.map((courseInfo) => ({
    fullAttendanceInfoId,
    courseCode: courseInfo.courseCode,
    classesHeld: courseInfo.classesHeld,
    classesPresent: courseInfo.classesPresent,
    presentDelta: courseInfo.presentDelta,
    absentDelta: courseInfo.absentDelta,
    courseAttendancePercentage: getAttendancePercentage(
      courseInfo.classesPresent,
      courseInfo.classesHeld
    ),
  }));

  const response = await db
    .insert(courseAttendanceInfos)
    .values(coursesData)
    .onConflictDoUpdate({
      target: [
        courseAttendanceInfos.fullAttendanceInfoId,
        courseAttendanceInfos.courseCode,
      ],
      set: {
        classesHeld: sql`EXCLUDED.classes_held`,
        classesPresent: sql`EXCLUDED.classes_present`,
        presentDelta: sql`EXCLUDED.present_delta`,
        absentDelta: sql`EXCLUDED.absent_delta`,
        courseAttendancePercentage: sql`EXCLUDED.course_attendance_percentage`,
      },
    })
    .returning();
};

export { upsertCourseAttendanceInfos, CourseAttendanceInfoProps };
