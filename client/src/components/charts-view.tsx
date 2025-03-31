import { useQuery } from "@tanstack/react-query";
import { ClassesBarChart } from "./charts/classes-bar-chart";
import { StackClassesBarChart } from "./charts/stacked-classes-bar-chart";
import axios from "axios";
import { backendUrl } from "@/constants";
import { CoursesData } from "@shared/types/api-types";
import LoadingSpinner from "./loading-spinner";

const fetchCoursesData = async (userId: string) => {
  const response = await axios.get<CoursesData>(
    `${backendUrl}/get-user-courses-data-on-date`,
    {
      params: { userId, dateString: new Date().toDateString() },
    }
  );
  return response.data;
};

export function ChartsView({ userId }: { userId: string }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["coursesInfo", userId],
    queryFn: () => fetchCoursesData(userId),
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <div className="p-6 text-center text-red-500">
        Error loading charts data!
      </div>
    );
  }
  if (!data)
    return <div className="p-6 text-center">Loading charts data...</div>;

  const attendancePercentageData = data.map((course) => ({
    courseName: course.courseName,
    value: parseFloat(course.courseAttendancePercentage.toFixed(2)),
  }));

  const totalClassesHeldData = data.map((course) => ({
    courseName: course.courseName,
    value: course.classesHeld,
  }));

  const classesAttendedData = data.map((course) => ({
    courseName: course.courseName,
    value: course.classesPresent,
  }));

  const classesAbsentData = data.map((course) => ({
    courseName: course.courseName,
    value: course.classesHeld - course.classesPresent,
  }));

  const stackChartData = data.map((course) => ({
    courseName: course.courseName,
    classesHeld: course.classesHeld,
    classesPresent: course.classesPresent,
  }));

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-center">Charts Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        <ClassesBarChart
          chartLabel="Classes Attendance Percentage"
          durationString="All time"
          classesData={attendancePercentageData}
        />
        <ClassesBarChart
          chartLabel="Total Classes Held"
          durationString="All time"
          classesData={totalClassesHeldData}
        />
        <ClassesBarChart
          chartLabel="Classes Attended"
          durationString="All time"
          classesData={classesAttendedData}
        />
        <ClassesBarChart
          chartLabel="Classes Absent"
          durationString="All time"
          classesData={classesAbsentData}
        />
      </div>

      <div>
        <StackClassesBarChart
          label="Class Attendance Overview"
          durationText="All time"
          data={stackChartData}
        />
      </div>
    </div>
  );
}
