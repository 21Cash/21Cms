import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Course {
  courseName: string;
  courseCode?: string;
  courseAttendancePercent: number;
  courseClassesHeld: number;
  courseClassesPresent: number;
  courseClassesAbsent: number;
}

interface CoursesDetailsTableProps {
  courses: Course[];
}

export function CoursesDetailsTable({ courses }: CoursesDetailsTableProps) {
  return (
    <div className="w-full overflow-auto border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Course Name</TableHead>
            <TableHead>Course Code</TableHead>
            <TableHead>Attendance %</TableHead>
            <TableHead>Classes Held</TableHead>
            <TableHead>Classes Present</TableHead>
            <TableHead>Classes Absent</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course, index) => (
            <TableRow key={index}>
              <TableCell>{course.courseName}</TableCell>
              <TableCell>{course.courseCode || course.courseName}</TableCell>
              <TableCell>{course.courseAttendancePercent}%</TableCell>
              <TableCell>{course.courseClassesHeld}</TableCell>
              <TableCell>{course.courseClassesPresent}</TableCell>
              <TableCell>{course.courseClassesAbsent}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

const dummyCourses: Course[] = [
  {
    courseName: "Mathematics",
    courseCode: "MATH101",
    courseAttendancePercent: 85,
    courseClassesHeld: 40,
    courseClassesPresent: 34,
    courseClassesAbsent: 6,
  },
  {
    courseName: "Physics",
    courseAttendancePercent: 78,
    courseClassesHeld: 45,
    courseClassesPresent: 35,
    courseClassesAbsent: 10,
  },
  {
    courseName: "Computer Science",
    courseCode: "CS102",
    courseAttendancePercent: 92,
    courseClassesHeld: 50,
    courseClassesPresent: 46,
    courseClassesAbsent: 4,
  },
];

export function CoursesDetailsTableWithDummyData() {
  return <CoursesDetailsTable courses={dummyCourses} />;
}
