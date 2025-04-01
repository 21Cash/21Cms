import { useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronDown, ChevronUp } from "lucide-react";

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
  showCourseCodeColumn: boolean;
}

type HeaderItem = {
  key: keyof Course;
  label: string;
};

export function CoursesDetailsTable({
  courses,
  showCourseCodeColumn = true,
}: CoursesDetailsTableProps) {
  const [sortBy, setSortBy] = useState<keyof Course | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const headers = useMemo<HeaderItem[]>(() => {
    const baseHeaders: HeaderItem[] = [
      { key: "courseName", label: "Course Name" },
      { key: "courseAttendancePercent", label: "Attendance %" },
      { key: "courseClassesHeld", label: "Classes Held" },
      { key: "courseClassesPresent", label: "Classes Present" },
      { key: "courseClassesAbsent", label: "Classes Absent" },
    ];
    if (showCourseCodeColumn) {
      // Insert Course Code column after Course Name
      baseHeaders.splice(1, 0, { key: "courseCode", label: "Course Code" });
    }
    return baseHeaders;
  }, [showCourseCodeColumn]);

  const sortedCourses = useMemo(() => {
    if (!sortBy) return courses;
    return [...courses].sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      if (sortBy === "courseCode") {
        aValue = a.courseCode || a.courseName;
        bValue = b.courseCode || b.courseName;
      } else {
        aValue = a[sortBy];
        bValue = b[sortBy];
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      } else if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
      }
      return 0;
    });
  }, [courses, sortBy, sortDirection]);

  const handleSort = (key: keyof Course) => {
    if (sortBy === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(key);
      setSortDirection("asc");
    }
  };

  return (
    <div className="w-full overflow-auto border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            {headers.map((header) => (
              <TableHead
                key={header.key}
                onClick={() => handleSort(header.key)}
                className="cursor-pointer select-none hover:bg-muted/50"
              >
                <div className="flex items-center gap-2">
                  {header.label}
                  {sortBy === header.key &&
                    (sortDirection === "asc" ? (
                      <ChevronUp className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    ))}
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedCourses.map((course, index) => (
            <TableRow key={index}>
              <TableCell>{course.courseName}</TableCell>
              {showCourseCodeColumn && (
                <TableCell>{course.courseCode || course.courseName}</TableCell>
              )}
              <TableCell>{course.courseAttendancePercent}%</TableCell>
              <TableCell>
                {course.courseClassesHeld}
                {course.coursePresentDelta + course.courseAbsentDelta > 0 && (
                  <span className="text-gray-500">
                    {" "}
                    (+{course.coursePresentDelta + course.courseAbsentDelta})
                  </span>
                )}
              </TableCell>
              <TableCell>
                {course.courseClassesPresent}
                {course.coursePresentDelta > 0 && (
                  <span className="text-green-400">
                    {" "}
                    (+{course.coursePresentDelta})
                  </span>
                )}
              </TableCell>
              <TableCell>
                {course.courseClassesAbsent}
                {course.courseAbsentDelta > 0 && (
                  <span className="text-red-400">
                    {" "}
                    (+{course.courseAbsentDelta})
                  </span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
