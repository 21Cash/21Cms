import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type CourseAttendance = {
  courseName: string;
  presentDelta: number;
  absentDelta: number;
};

type AttendanceDayViewProps = {
  date: string;
  courseData: CourseAttendance[];
};

export function AttendanceDayView({
  date,
  courseData,
}: AttendanceDayViewProps) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Day Attendance Info</CardTitle>
        <CardDescription>
          {new Date(date).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {courseData.map((course, index) => (
            <div
              key={index}
              className="flex justify-between border-b pb-2 last:border-b-0"
            >
              <span>{course.courseName}</span>
              <span className="flex space-x-4">
                <span className="text-green-600">+{course.presentDelta}</span>
                <span className="text-red-600">-{course.absentDelta}</span>
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Dummy data example
const dummyAttendanceData: AttendanceDayViewProps = {
  date: "2024-06-15",
  courseData: [
    { courseName: "Math 101", presentDelta: 1, absentDelta: 0 },
    { courseName: "History 201", presentDelta: 0, absentDelta: 1 },
    { courseName: "Science 301", presentDelta: 1, absentDelta: 0 },
  ],
};

// Wrapper component to demonstrate the AttendanceDayView with dummy data.
export function AttendanceDayViewWrapper() {
  return (
    <div className="p-4">
      <AttendanceDayView
        date={dummyAttendanceData.date}
        courseData={dummyAttendanceData.courseData}
      />
    </div>
  );
}
