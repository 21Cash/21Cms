import { date } from "drizzle-orm/mysql-core";
import { db } from "../database/db";
import { GetUserInfo } from "../database/queries/select-queries/get-user-info";
import { courseAttendanceInfos, fullAttendanceInfos } from "../database/schema";
import fetchAttendanceData from "../lib/scraping/fetch-attendance-data";
import { getPostgresqlDateStringIST } from "../lib/utils/get-posgresql-date-string";
import { get } from "http";
import { getCoursesInfoByDate } from "../database/queries/select-queries/get-courses-infos-on-date";
import {
  CourseDelta,
  getCoursesDelta,
} from "../lib/utils/get-courses-delta-info";
import { NewCourseAttendanceInfo } from "../database/db-types";
import { getAttendancePercentage } from "../lib/utils/get-attendance-percentage";
import { sql } from "drizzle-orm";
import {
  CourseAttendanceInfoProps,
  upsertCourseAttendanceInfos,
} from "../database/queries/non-select queries/upsert-course-attendance-infos";
import { register } from "module";
import { registerCourses } from "../database/queries/non-select queries/register-courses";
import { setUserLastRefresh } from "../database/queries/non-select queries/set-user-last-refresh";
import { getPrevCoursesDataForDate } from "../database/queries/select-queries/get-prev-courses-data-for-date";

interface FullInfoUpdateProps {
  userId: string;
  triggerDate: Date;
}

// TODO: Process PrevDayData and Upsert courseDeltaInfos
const triggerFullInfoUpdateOnUser = async ({
  userId,
  triggerDate, // In UTC
}: FullInfoUpdateProps) => {
  if (!userId) {
    console.log(`UserId not truthy to update Info`);
    return;
  }

  const userInfo = await GetUserInfo(userId);
  if (!userInfo) {
    console.log(`UserInfo with userId:${userId} Not Found`);
    return;
  }

  const password = userInfo.password;

  // Fetch Current day stats
  const currentDayAttendanceData = await fetchAttendanceData(userId, password);

  // Remove Duplicate courses data from current day attendance data
  // If multiple courses have same name, consider last one.
  currentDayAttendanceData.coursesData = Object.values(
    currentDayAttendanceData.coursesData.reduce((acc, course) => {
      acc[course.course] = course;
      return acc;
    }, {} as Record<string, (typeof currentDayAttendanceData.coursesData)[number]>)
  );

  // Getting Previous Day Courses Data
  const prevDayCoursesInfo = await getPrevCoursesDataForDate({
    userId,
    dateInUTC: triggerDate,
  });

  // Upserting Full Attendance Info
  const fullAttendanceInfoResult = await db
    .insert(fullAttendanceInfos)
    .values({
      userId,
      date: getPostgresqlDateStringIST(triggerDate),
      totalClassesHeld: currentDayAttendanceData.totalClassesHeld,
      totalClassesPresent: currentDayAttendanceData.totalClassesAttended,
      attendancePercentage: currentDayAttendanceData.attendancePercentage,
    })
    .onConflictDoUpdate({
      target: [fullAttendanceInfos.userId, fullAttendanceInfos.date],
      set: {
        totalClassesHeld: currentDayAttendanceData.totalClassesHeld,
        totalClassesPresent: currentDayAttendanceData.totalClassesAttended,
        attendancePercentage: currentDayAttendanceData.attendancePercentage,
      },
    })
    .returning({
      fullAttendanceId: fullAttendanceInfos.id,
    });

  const fullAttendanceInfoId = fullAttendanceInfoResult[0].fullAttendanceId;

  // Get Current Courses Attendance Data
  const currentDayCoursesData = currentDayAttendanceData.coursesData;

  const coursesDeltaInfos: CourseDelta[] = getCoursesDelta({
    currentCourseData: currentDayCoursesData,
    prevCourseData: prevDayCoursesInfo.map((courseData) => ({
      course: courseData.courseCode,
      classesHeld: courseData.classesHeld,
      classesPresent: courseData.classesPresent,
    })),
  });

  const currentDayAttendanceInfos: CourseAttendanceInfoProps = {
    fullAttendanceInfoId,
    courseInfos: coursesDeltaInfos.map((data) => ({
      courseCode: data.courseCode,
      classesHeld: data.classesHeld,
      classesPresent: data.classesPresent,
      presentDelta: data.presentCount,
      absentDelta: data.absentCount,
    })),
  };

  // Try adding all courses to Courses table
  const coursesData = currentDayCoursesData.map((courseItem) => ({
    courseCode: courseItem.course,
    courseName: courseItem.course,
  }));

  await registerCourses(coursesData);

  await upsertCourseAttendanceInfos(currentDayAttendanceInfos);

  const currentDate = new Date();
  await setUserLastRefresh({ userId, refreshedDate: currentDate });
};

export { triggerFullInfoUpdateOnUser };
