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
      console.log(response.data);
      return response.data;
    },
    enabled: !!userId,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data</div>;
  }

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
          {!data || data.length === 0 ? (
            <div className="text-gray-500">No data found</div>
          ) : (
            data.map((course: CoursesData[number], index: number) => (
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
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
