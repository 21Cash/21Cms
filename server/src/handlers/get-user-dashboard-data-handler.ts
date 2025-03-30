import { it } from "node:test";
import { GetUserInfo } from "../database/queries/select-queries/get-user-info";
import { getFullAttendanceInfo } from "../database/queries/select-queries/get-full-attendance-info";
import { getCoursesInfoByDate } from "../database/queries/select-queries/get-courses-infos-on-date";
import { getAttendanceHistoryData } from "../database/queries/select-queries/get-attendance-history-data";

// TODO:
// Return userId, username, TotalAttendancePercentage, lastRefresh
// Total Classes Attended, Total Classes Held, Total Classes Absent
// 3 months of Attendance Percentage Data
// Courses Data => (CourseClassesHeld, courseClassesAttended, courseClassesesAbsent, courseAttendancePercentage)
const getUserDashboardDataHandler = async (userId: string) => {
  const { username, lastRefreshed } = await GetUserInfo(userId);
  const currentDate = new Date();

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

  currentDate.setMonth(currentDate.getMonth() - 3);
  const attendanceHistoryData = await getAttendanceHistoryData({
    userId,
    startDateUTC: currentDate,
  });

  return {
    username,
    lastRefreshed,
    totalClassesAbsent,
    totalClassesHeld,
    totalClassesPresent,
    attendancePercentage,
    todaysCoursesData,
    attendanceHistoryData,
  };
};

export { getUserDashboardDataHandler };
