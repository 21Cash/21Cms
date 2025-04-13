import { and, desc, eq } from "drizzle-orm";
import { db } from "../../db";
import { fullAttendanceInfos } from "../../schema";
import { GetUserInfo } from "./get-user-info";
import { getPostgresqlDateStringIST } from "../../../lib/utils/get-posgresql-date-string";

export const getLatestFullInfoAttendanceInfo = async ({
  userId,
}: {
  userId: string;
}) => {
  const fullAttendanceInfo = await db
    .select()
    .from(fullAttendanceInfos)
    .where(and(eq(fullAttendanceInfos.userId, userId)))
    .orderBy(desc(fullAttendanceInfos.date))
    .limit(1);

  return fullAttendanceInfo[0];
};
