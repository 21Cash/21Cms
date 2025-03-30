import { it } from "node:test";
import { GetUserInfo } from "../database/queries/select-queries/get-user-info";
import { getFullAttendanceInfo } from "../database/queries/select-queries/get-full-attendance-info";
import { getCoursesInfoByDate } from "../database/queries/select-queries/get-courses-infos-on-date";

// TODO:
// Return userId, username, TotalAttendancePercentage, lastRefresh
// Total Classes Attended, Total Classes Held, Total Classes Absent
// 3 months of Attendance Percentage Data
// Courses Data => (CourseClassesHeld, courseClassesAttended, courseClassesesAbsent, courseAttendancePercentage)
const getUserDashboardDataHandler = async (userId: string) => {
  const { username, lastRefreshed } = await GetUserInfo(userId);
  const currentDate = new Date();
  console.log(`Getting Dashboard Data for ${username}`);

  const {
    totalClassesHeld,
    totalClassesPresent,
    attendancePercentage,
    id,
    date,
  } = await getFullAttendanceInfo({
    userId,
    date: currentDate,
  });

  const fullAttendanceId = id;
  const fullAttendanceDate = date;
  const totalClassesAbsent = totalClassesHeld - totalClassesPresent;

  const todaysCoursesData = await getCoursesInfoByDate({
    userId,
    dateString: fullAttendanceDate,
  });
  console.log(`fullAttendanceId: ${fullAttendanceId}`);
  return {
    username,
    lastRefreshed,
    totalClassesAbsent,
    totalClassesHeld,
    totalClassesPresent,
    attendancePercentage,
    todaysCoursesData,
  };
};

export { getUserDashboardDataHandler };
