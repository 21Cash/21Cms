import { AppSidebar } from "@/components/app-sidebar";
import { AttendanceDashboard } from "@/components/attendance-dashboard";
import { AttendanceDayView } from "@/components/attendance-day-view";
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
import { UserDashboardData, UserData } from "@shared/types/api-types";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { ChartsView } from "@/components/charts-view";

const fetchAttendanceDashboardData = async (userId: string) => {
  const response = await axios.get(`${backendUrl}/get-user-dashboard-data`, {
    params: { userId },
  });
  const data: UserDashboardData = response.data;
  return data;
};

const fetchUserData = async (userId: string) => {
  const response = await axios.get(`${backendUrl}/get-user-data`, {
    params: { userId },
  });
  const data: UserData = response.data;
  console.log(data);
  return data;
};

export function AttendanceView() {
  const { userId } = useParams<{ userId: string }>();
  const [selectedDate, setSelectedDate] = useState<Date>(
    new Date("2025-01-01")
  );
  const [viewingDayInfo, setViewingDayInfo] = useState<boolean>(false);
  const [viewingDashboard, setViewingDashboard] = useState<boolean>(true);
  const [viewingCharts, setViewingCharts] = useState<boolean>(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["attendance", userId],
    queryFn: () => fetchAttendanceDashboardData(userId!),
    enabled: !!userId,
  });

  const {
    data: userData,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchUserData(userId!),
    enabled: !!userId,
  });

  if (isLoading || isUserLoading) return <div>Loading...</div>;
  if (isError || isUserError) return <div>Error fetching data</div>;

  return (
    <SidebarProvider>
      <AppSidebar
        setViewingDayInfo={setViewingDayInfo}
        setViewingDashboard={setViewingDashboard}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        username={userData?.username ?? ""}
        lastRefreshed={userData?.lastRefreshed ?? ""}
        setViewingCharts={setViewingCharts}
      />

      <SidebarInset>
        <header className="sticky top-0  z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage className="text-2xl">
                  {viewingDashboard && "Dashboard"}
                  {viewingCharts && "Charts"}
                  {viewingDayInfo && "Day Attendance Info"}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="ml-auto">
            <ModeToggle />
          </div>
        </header>
        {viewingCharts && userId && <ChartsView userId={userId} />}
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
            attendancePercentageDeltaToday={
              data?.attendancePercentageDelta ?? 0
            }
            presentDeltaToday={data?.classesPresentDelta ?? 0}
            absentDeltaToday={data?.classesAbsentDelta ?? 0}
            classesHeldDeltaToday={data?.classesHeldDelta ?? 0}
            attendanceHistoryData={data?.attendanceHistoryData ?? []}
          />
        )}

        {viewingDayInfo && (
          <div className="px-8 py-6">
            <AttendanceDayView
              date={selectedDate.toDateString()}
              userId={userId || ""}
            />
          </div>
        )}
      </SidebarInset>
    </SidebarProvider>
  );
}
