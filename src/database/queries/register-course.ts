import { db } from "../db";
import { Course } from "../db-types";
import { courses } from "../schema";

interface CourseProps {
  courseCode: string;
  courseName: string | null;
}

const registerCourse = async ({
  courseCode,
  courseName,
}: CourseProps): Promise<Course> => {
  const course = {
    courseCode,
    courseName,
  };

  const result = await db
    .insert(courses)
    .values(course)
    .onConflictDoNothing()
    .returning();

  return result[0];
};
