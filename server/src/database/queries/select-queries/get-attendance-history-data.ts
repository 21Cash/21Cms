import { and, eq, gt, gte, lte } from "drizzle-orm";
import { db } from "../../db";
import { fullAttendanceInfos } from "../../schema";
import { getPostgresqlDateStringIST } from "../../../lib/utils/get-posgresql-date-string";
import { date } from "drizzle-orm/mysql-core";

interface GetAttendanceHistoryData {
  userId: string;
  startDateUTC: Date;
  endDateUTC?: Date;
}

export const getAttendanceHistoryData = async ({
  userId,
  startDateUTC,
  endDateUTC = new Date(),
}: GetAttendanceHistoryData) => {
  const data = await db
    .select({
      date: fullAttendanceInfos.date,
      classesHeld: fullAttendanceInfos.totalClassesHeld,
      classesPresent: fullAttendanceInfos.totalClassesPresent,
      attendancePercentage: fullAttendanceInfos.attendancePercentage,
    })
    .from(fullAttendanceInfos)
    .where(
      and(
        gte(fullAttendanceInfos.date, getPostgresqlDateStringIST(startDateUTC)),
        lte(fullAttendanceInfos.date, getPostgresqlDateStringIST(endDateUTC)),
        eq(fullAttendanceInfos.userId, userId)
      )
    );

  const processedData = data.map((item) => {
    return { ...item, classesAbsent: item.classesHeld - item.classesPresent };
  });

  return processedData;
};
