import { AppSidebar } from "@/components/app-sidebar";
import { AttendanceDashboard } from "@/components/attendance-dashboard";
import {
  AttendanceDayView,
  AttendanceDayViewWrapper,
} from "@/components/attendance-day-view";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { backendUrl } from "@/constants";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { UserDashboardData } from "@shared/types/api-types";

const placeHolderPropsData = {
  attendancePercentage: 83.33,
  totalClassesPresent: 322,
  attendancePercentageText: "-4.22% this week",
  totalClassesAbsent: 32,
  totalClassesHeld: 400,
};

const fetchAttendanceDashboardData = async (userId: string) => {
  const response = await axios.get(`${backendUrl}/get-user-dashboard-data`, {
    params: { userId },
  });
  const data: UserDashboardData = response.data;
  console.log(data);
  return data;
};

export function AttendanceView() {
  const { userId } = useParams<{ userId: string }>();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [viewingDayInfo, setViewingDayInfo] = useState<boolean>(false);
  const [viewingDashboard, setViewingDashboard] = useState<boolean>(true);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["attendance", userId],
    queryFn: () => fetchAttendanceDashboardData(userId!),
    enabled: !!userId,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  return (
    <SidebarProvider>
      <AppSidebar
        setViewingDayInfo={setViewingDayInfo}
        setViewingDashboard={setViewingDashboard}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <SidebarInset>
        <header className="sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>
                  {viewingDashboard ? "Dashboard" : "Day Attendance View"}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        {viewingDashboard && (
          <AttendanceDashboard
            attendancePercentage={data?.attendancePercentage ?? 0}
            totalClassesPresent={data?.totalClassesPresent ?? 0}
            totalClassesAbsent={data?.totalClassesAbsent ?? 0}
            totalClassesHeld={data?.totalClassesHeld ?? 0}
            coursesData={
              data?.todaysCoursesData.map((course) => ({
                courseName: course.courseName,
                courseCode: course.courseCode,
                courseAttendancePercent: parseFloat(
                  course.courseAttendancePercentage.toFixed(2)
                ),
                courseClassesHeld: course.classesHeld,
                courseClassesPresent: course.classesPresent,
                courseClassesAbsent: course.classesHeld - course.classesPresent,
                coursePresentDelta: course.presentDelta,
                courseAbsentDelta: course.absentDelta,
              })) ?? []
            }
          />
        )}

        {viewingDayInfo && (
          <div className="p-6">
            <AttendanceDayViewWrapper />
          </div>
        )}
      </SidebarInset>
    </SidebarProvider>
  );
}
