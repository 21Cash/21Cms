import { and, eq } from "drizzle-orm";
import { db } from "../../db";
import { fullAttendanceInfos } from "../../schema";
import { GetUserInfo } from "./get-user-info";
import { getPostgresqlDateStringIST } from "../../../lib/utils/get-posgresql-date-string";

interface GetFullAttendanceInfoProps {
  userId: string;
  date: Date;
}

const getFullAttendanceInfo = async ({
  userId,
  date, // In UTC
}: GetFullAttendanceInfoProps) => {
  const fullAttendanceInfo = await db
    .select()
    .from(fullAttendanceInfos)
    .where(
      and(
        eq(fullAttendanceInfos.userId, userId),
        eq(fullAttendanceInfos.date, getPostgresqlDateStringIST(date))
      )
    );
  return fullAttendanceInfo[0];
};

export { getFullAttendanceInfo };
