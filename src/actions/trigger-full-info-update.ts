import { date } from "drizzle-orm/mysql-core";
import { db } from "../database/db";
import { getFullAttendanceInfo } from "../database/queries/select-queries/get-full-attendance-info";
import { GetUserInfo } from "../database/queries/select-queries/get-user-info";
import { fullAttendanceInfos } from "../database/schema";
import fetchAttendanceData from "../lib/scraping/fetch-attendance-data";
import { GetPostgresqlDateString } from "../lib/utils/get-posgresql-date-string";

interface FullInfoUpdateProps {
  userId: string;
  triggerDate: Date;
}

// TODO: Process PrevDayData and Upsert courseDeltaInfos
const triggerFullInfoUpdate = async ({
  userId,
  triggerDate,
}: FullInfoUpdateProps) => {
  if (!userId) {
    throw new Error("userId is required");
  }
  const password = (await GetUserInfo(userId)).password;
  const prevDayDate = new Date().setDate(triggerDate.getDate() - 1);
  const prevDayAttendanceInfo = await getFullAttendanceInfo({
    userId,
    date: triggerDate,
  });

  const currentDayAttendanceData = await fetchAttendanceData(userId, password);

  // Upserting Full Attendance Info
  const result = await db
    .insert(fullAttendanceInfos)
    .values({
      userId,
      date: GetPostgresqlDateString(triggerDate),
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
    .returning();

  return result[0];
};

export { triggerFullInfoUpdate };
