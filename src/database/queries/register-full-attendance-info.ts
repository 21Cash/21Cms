import { db } from "../db";
import { FullAttendanceInfo } from "../db-types";
import { fullAttendanceInfos } from "../schema";

interface FullAttendanceInfoProps {
  userId: string;
  date: Date;
  totalClassesHeld: number;
  totalClassesPresent: number;
}

const registerFullAttendanceInfo = async ({
  userId,
  date,
  totalClassesHeld,
  totalClassesPresent,
}: FullAttendanceInfoProps): Promise<FullAttendanceInfo> => {
  const attendancePercent =
    totalClassesHeld == 0 ? 0 : (totalClassesPresent / totalClassesHeld) * 100;

  const attendanceInfo = {
    userId,
    date: date.toISOString(),
    totalClassesHeld,
    totalClassesPresent,
    attendancePercent,
  };

  const result = await db
    .insert(fullAttendanceInfos)
    .values(attendanceInfo)
    .returning();

  return result[0];
};
