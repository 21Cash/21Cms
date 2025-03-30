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
import { useState } from "react";

const placeHolderPropsData = {
  attendancePercentage: 83.33,
  totalClassesPresent: 322,
  attendancePercentageText: "-4.22% this week",
  totalClassesAbsent: 32,
  totalClassesHeld: 400,
};

export function AttendanceView() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [viewingDayInfo, setViewingDayInfo] = useState<boolean>(false);
  const [viewingDashboard, setViewingDashboard] = useState<boolean>(true);
  const [attendancePercentage, setAttendancePercentage] = useState<number>(
    placeHolderPropsData.attendancePercentage
  );
  const [totalClassesPresent, setTotalClassesPresent] = useState<number>(
    placeHolderPropsData.totalClassesPresent
  );
  const [totalClassesAbsent, setTotalClassesAbsent] = useState<number>(
    placeHolderPropsData.totalClassesAbsent
  );
  const [totalClassesHeld, setTotalClassesHeld] = useState<number>(
    placeHolderPropsData.totalClassesHeld
  );

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
            attendancePercentage={attendancePercentage}
            totalClassesPresent={totalClassesPresent}
            totalClassesAbsent={totalClassesAbsent}
            totalClassesHeld={totalClassesHeld}
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
