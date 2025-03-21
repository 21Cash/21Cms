import { db } from "../db";
import { courseDeltaInfos } from "../schema";

interface CourseDeltaInfosProps {
  userId: string;
  date: Date;
  courseCode: string;
  presentDelta: number;
  absentDelta: number;
}
[];

const regiserCourseDeltaInfo = async ({
  userId,
  date,
  courseCode,
  presentDelta,
  absentDelta,
}: CourseDeltaInfosProps) => {
  const courseDeltaInfo = {
    userId,
    date: date.toISOString(),
    courseCode,
    presentDelta,
    absentDelta,
  };

  const result = await db
    .insert(courseDeltaInfos)
    .values(courseDeltaInfo)
    .returning();

  return result[0];
};
