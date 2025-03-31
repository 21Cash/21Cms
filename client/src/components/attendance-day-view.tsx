import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { backendUrl } from "@/constants";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "./loading-spinner";

export type CoursesData = {
  fullAttendanceInfoId: string;
  courseCode: string;
  classesHeld: number;
  classesPresent: number;
  presentDelta: number;
  absentDelta: number;
  courseAttendancePercentage: number;
  courseName: string;
}[];

type AttendanceDayViewProps = {
  date: string;
  userId: string;
};

export function AttendanceDayView({ date, userId }: AttendanceDayViewProps) {
  const { data, error, isLoading } = useQuery<CoursesData>({
    queryKey: ["coursesData", { userId, dateString: date }],
    queryFn: async () => {
      const response = await axios.get<CoursesData>(
        `${backendUrl}/get-user-courses-data-on-date`,
        {
          params: { userId, dateString: date },
        }
      );
      return response.data;
    },
    enabled: !!userId,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="text-center py-4 text-red-500">Error fetching data</div>
    );
  }

  const totalClassesHeld =
    data?.reduce((acc, course) => acc + course.classesHeld, 0) || 0;
  const totalClassesPresent =
    data?.reduce((acc, course) => acc + course.classesPresent, 0) || 0;
  const totalClassesAbsent = totalClassesHeld - totalClassesPresent;

  return (
    <Card className="w-full max-w-4xl mx-auto p-6">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Day Attendance Info
        </CardTitle>
        <CardDescription className="text-lg">
          {new Date(date).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-8">
        {/* Totals Summary */}
        <div className="flex justify-around items-center p-6 bg-muted rounded-lg shadow-sm">
          <div className="text-center">
            <span className="block text-sm text-muted-foreground">
              Classes Held
            </span>
            <span className="font-bold text-2xl">{totalClassesHeld}</span>
          </div>
          <div className="text-center">
            <span className="block text-sm text-muted-foreground">
              Classes Present
            </span>
            <span className="font-bold text-2xl">{totalClassesPresent}</span>
          </div>
          <div className="text-center">
            <span className="block text-sm text-muted-foreground">
              Classes Absent
            </span>
            <span className="font-bold text-2xl">{totalClassesAbsent}</span>
          </div>
        </div>

        {/* Courses List */}
        <div className="space-y-6">
          {!data || data.length === 0 ? (
            <div className="text-muted-foreground text-center">
              No data found
            </div>
          ) : (
            data.map((course, index) => (
              <div
                key={index}
                className="flex flex-col border rounded-lg p-4 shadow-sm space-y-2"
              >
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-lg">
                    {course.courseName}{" "}
                    <span className="text-sm text-muted-foreground">
                      ({course.courseCode})
                    </span>
                  </span>
                  <span className="flex space-x-4">
                    {course.presentDelta !== 0 && (
                      <span className="text-green-600 font-medium">
                        +{course.presentDelta}
                      </span>
                    )}
                    {course.absentDelta !== 0 && (
                      <span className="text-red-600 font-medium">
                        -{course.absentDelta}
                      </span>
                    )}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground flex justify-between">
                  <span>Classes Held: {course.classesHeld}</span>
                  <span>Present: {course.classesPresent}</span>
                  <span>
                    Absent: {course.classesHeld - course.classesPresent}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
