import { db } from "../db";
import { courseDeltaInfos } from "../schema";

interface CourseDeltaInfoProps {
  userId: string;
  date: Date;
  courseCode: string;
  delta: number;
}

const regiserCourseDeltaInfo = async ({
  userId,
  date,
  courseCode,
  delta,
}: CourseDeltaInfoProps) => {
  const courseDeltaInfo = {
    userId,
    date: date.toISOString(),
    courseCode,
    delta,
  };

  const result = await db
    .insert(courseDeltaInfos)
    .values(courseDeltaInfo)
    .returning();

  return result[0];
};
