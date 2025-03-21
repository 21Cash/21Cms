import { db } from "../db";
import { courses } from "../schema";

interface Course {
  courseCode: string;
  courseName: string | null;
}

const registerCourses = async (coursesList: Course[], userId: string) => {
  await db.insert(courses).values(coursesList);
};
