import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface Course {
  courseName: string;
  courseCode?: string;
  courseAttendancePercent: number;
  courseClassesHeld: number;
  courseClassesPresent: number;
  courseClassesAbsent: number;
  coursePresentDelta: number;
  courseAbsentDelta: number;
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
