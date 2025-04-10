import { db } from "../../db";
import { courses } from "../../schema";

interface Course {
  courseCode: string;
  courseName: string | null;
}

const registerCourses = async (coursesList: Course[]) => {
  await db.insert(courses).values(coursesList).onConflictDoNothing();
};

export { registerCourses };
