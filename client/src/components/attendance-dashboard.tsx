import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AttendanceChart, AttendanceChartProps } from "./attendance-chart";
import { Course, CoursesDetailsTable } from "./courses-details-table";
import { useEffect, useState } from "react";

interface InfoCardProps {
  title: string;
  value: number | string;
  description: string;
}

function InfoCard({ title, value, description }: InfoCardProps) {
  return (
    <Card className="@container/card">
      <CardHeader className="relative">
        <CardDescription>{title}</CardDescription>
        <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
          {value}
        </CardTitle>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1 text-sm">
        <div className="text-muted-foreground">{description}</div>
      </CardFooter>
    </Card>
  );
}

interface AttendanceDashboardProps {
  attendancePercentage: number;
  attendancePercentageText?: string;
  totalClassesPresent: number;
  totalClassesPresentText?: string;
  totalClassesAbsent: number;
  totalClassesAbsentText?: string;
  totalClassesHeld: number;
  totalClassesHeldText?: string;
  coursesData: Course[];
  attendanceHistoryData: {
    classesAbsent: number;
    date: string;
    classesHeld: number;
    classesPresent: number;
    attendancePercentage: number;
  }[];
}

const getTodaysInfos = (props: AttendanceDashboardProps) => {
  const {
    coursesData,
    attendancePercentage,
    totalClassesPresent,
    totalClassesHeld,
  } = props;

  const presentDeltaSum = coursesData.reduce(
    (sum, item) => sum + item.coursePresentDelta,
    0
  );
  const absentDeltaSum = coursesData.reduce(
    (sum, item) => sum + item.courseAbsentDelta,
    0
  );
  const totalClassesDeltaSum = presentDeltaSum + absentDeltaSum;

  const yesterdayTotalPresent = totalClassesPresent - presentDeltaSum;
  const yesterdayTotalHeld = totalClassesHeld - totalClassesDeltaSum;

  const yesterdayAttendancePercentage =
    yesterdayTotalHeld > 0
      ? (yesterdayTotalPresent / yesterdayTotalHeld) * 100
      : 0;

  const todayAttendanceDelta =
    attendancePercentage - yesterdayAttendancePercentage;

  return {
    presentDeltaSum,
    absentDeltaSum,
    totalClassesDeltaSum,
    todayAttendanceDelta,
  };
};

export function AttendanceDashboard(props: AttendanceDashboardProps) {
  const {
    attendancePercentage,
    totalClassesPresent,
    totalClassesAbsent,
    totalClassesHeld,
    coursesData,
    attendanceHistoryData,
  } = props;

  useEffect(() => {
    const {
      presentDeltaSum,
      absentDeltaSum,
      totalClassesDeltaSum,
      todayAttendanceDelta,
    } = getTodaysInfos(props);

    if (presentDeltaSum != 0) {
      setTotalClassesPresentText(`+${presentDeltaSum} classes present today`);
    }
    if (absentDeltaSum != 0) {
      setTotalClassesAbsentText(`${absentDeltaSum} classes absent today`);
    }
    if (totalClassesHeld != 0) {
      setTotalClassesHeldText(`${totalClassesDeltaSum} classes held today`);
    }

    if (todayAttendanceDelta != 0) {
      if (todayAttendanceDelta > 0) {
        setAttendancePercentageText(
          `Gained +${parseFloat(todayAttendanceDelta.toFixed(2))}% today`
        );
      } else {
        setAttendancePercentageText(
          `Lost ${parseFloat(todayAttendanceDelta.toFixed(2))}% today`
        );
      }
    }
  }, [totalClassesHeld, totalClassesAbsent, totalClassesPresent]);

  const [attendancePercentageText, setAttendancePercentageText] =
    useState<string>("No changes today");
  const [totalClassesPresentText, setTotalClassesPresentText] =
    useState<string>("No changes today");
  const [totalClassesAbsentText, setTotalClassesAbsentText] =
    useState<string>("No changes today");
  const [totalClassesHeldText, setTotalClassesHeldText] =
    useState<string>("No changes today");

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        {/* Info Cards */}
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="*:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card lg:px-6">
            <InfoCard
              title="Attendance Percentage"
              value={`${attendancePercentage} %`}
              description={attendancePercentageText}
            />
            <InfoCard
              title="Total Classes Present"
              value={totalClassesPresent}
              description={totalClassesPresentText}
            />
            <InfoCard
              title="Total Classes Absent"
              value={totalClassesAbsent}
              description={totalClassesAbsentText}
            />
            <InfoCard
              title="Total Classes Held"
              value={totalClassesHeld}
              description={totalClassesHeldText}
            />
          </div>
        </div>
        {/* Attendance Chart */}
        <div className="px-6">
          <AttendanceChart
            attendanceData={attendanceHistoryData.map((item) => ({
              date: new Date(item.date),
              attendance: item.attendancePercentage,
            }))}
          />
        </div>
        {/* Course Details table */}
        <div className="px-6 py-6">
          <CoursesDetailsTable courses={coursesData} />
        </div>
      </div>
    </div>
  );
}
