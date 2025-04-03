import { and, desc, lt } from "drizzle-orm";
import { getPostgresqlDateStringIST } from "../../../lib/utils/get-posgresql-date-string";
import { db } from "../../db";
import { fullAttendanceInfos } from "../../schema";
import { getCoursesInfoByDate } from "./get-courses-infos-on-date";
import { hasUncaughtExceptionCaptureCallback } from "process";

interface GetPrevCoursesDataForDateProps {
  userId: string;
  dateInUTC: Date;
}

const getPrevCoursesDataForDate = async ({ userId, dateInUTC }) => {
  const currentISTString = getPostgresqlDateStringIST(dateInUTC);
  const result = await db
    .select({
      fullAttendanceId: fullAttendanceInfos.id,
      date: fullAttendanceInfos.date,
    })
    .from(fullAttendanceInfos)
    .where(
      (and(fullAttendanceInfos.userId, userId),
      lt(fullAttendanceInfos.date, currentISTString))
    )
    .orderBy(desc(fullAttendanceInfos.date))
    .limit(1);

  if (result.length === 0) {
    return [];
  }
  const prevDateString = result[0].date;

  return getCoursesInfoByDate({ userId, dateString: prevDateString });
};

export { getPrevCoursesDataForDate };
