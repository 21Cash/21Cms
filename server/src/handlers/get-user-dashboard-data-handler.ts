import { it } from "node:test";
import { GetUserInfo } from "../database/queries/select-queries/get-user-info";
import { getFullAttendanceInfo } from "../database/queries/select-queries/get-full-attendance-info";
import { getCoursesInfoByDate } from "../database/queries/select-queries/get-courses-infos-on-date";
import { getAttendanceHistoryData } from "../database/queries/select-queries/get-attendance-history-data";
import { db } from "../database/db";
import { getCoursesInfoByFullAttendanceId } from "../database/queries/select-queries/get-courses-info-by-full-attendance-id";
import { getLatestFullInfoAttendanceInfo } from "../database/queries/select-queries/get-latest-full-attendance-info";

const getUserDashboardDataHandler = async (userId: string) => {
  const { username, lastRefreshed } = await GetUserInfo(userId);

  // Get current full attendance info
  const {
    id,
    date,
    totalClassesHeld,
    totalClassesPresent,
    attendancePercentage,
  } = await getLatestFullInfoAttendanceInfo({
    userId,
  });

  const currentDate = new Date(date);
  const totalClassesAbsent = totalClassesHeld - totalClassesPresent;

  // Get today's courses data
  const todaysCoursesData = await getCoursesInfoByFullAttendanceId({
    fullAttendanceId: id,
  });

  // Get attendance history for the past 3 months
  const historyStartDate = new Date(currentDate);
  historyStartDate.setMonth(historyStartDate.getMonth() - 3);
  const attendanceHistoryData = await getAttendanceHistoryData({
    userId,
    startDateUTC: historyStartDate,
  });

  // Get yesterday's full attendance data
  const yesterdayDate = new Date();
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  const yesterdayFullAttendanceData = await getFullAttendanceInfo({
    userId,
    date: yesterdayDate,
  });

  const yesterdayAttendancePercentage =
    yesterdayFullAttendanceData?.attendancePercentage ?? 0;
  const yesterdayTotalClassesPresent =
    yesterdayFullAttendanceData?.totalClassesPresent ?? 0;
  const yesterdayTotalClassesHeld =
    yesterdayFullAttendanceData?.totalClassesHeld ?? 0;
  const yesterdayTotalClassesAbsent =
    yesterdayTotalClassesHeld - yesterdayTotalClassesPresent;

  // Calculating deltas
  const attendancePercentageDelta =
    attendancePercentage - yesterdayAttendancePercentage;
  const classesPresentDelta =
    totalClassesPresent - yesterdayTotalClassesPresent;
  const classesHeldDelta = totalClassesHeld - yesterdayTotalClassesHeld;
  const classesAbsentDelta = totalClassesAbsent - yesterdayTotalClassesAbsent;

  return {
    username,
    lastRefreshed,
    totalClassesAbsent,
    totalClassesHeld,
    totalClassesPresent,
    attendancePercentage,
    classesPresentDelta,
    classesAbsentDelta,
    classesHeldDelta,
    attendancePercentageDelta,
    todaysCoursesData,
    attendanceHistoryData,
  };
};

export { getUserDashboardDataHandler };
