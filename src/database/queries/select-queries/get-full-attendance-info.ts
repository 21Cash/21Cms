import { and, eq } from "drizzle-orm";
import { db } from "../../db";
import { fullAttendanceInfos } from "../../schema";
import { GetUserInfo } from "./get-user-info";

interface GetFullAttendanceInfoProps {
  userId: string;
  date: Date;
}

// TODO: Add Condition for checking for Date Too
const getFullAttendanceInfo = async ({
  userId,
  date,
}: GetFullAttendanceInfoProps) => {
  const fullAttendanceInfo = await db
    .select()
    .from(fullAttendanceInfos)
    .where(and(eq(fullAttendanceInfos.userId, userId)));
  return fullAttendanceInfo;
};

export { getFullAttendanceInfo };
