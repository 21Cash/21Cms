import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AttendanceChart } from "./attendance-chart";
import { CoursesDetailsTableWithDummyData } from "./courses-details-table";

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
}

export function AttendanceDashboard({
  attendancePercentage,
  attendancePercentageText = "Current Attendance Percentage",
  totalClassesPresent,
  totalClassesPresentText = "Total Classes Present",
  totalClassesAbsent,
  totalClassesAbsentText = "No of Classes Absent",
  totalClassesHeld,
  totalClassesHeldText = "Total No of Classes held",
}: AttendanceDashboardProps) {
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
          <AttendanceChart />
        </div>
        {/* Course Details table */}
        <div className="px-6 py-5">
          <CoursesDetailsTableWithDummyData />
        </div>
      </div>
    </div>
  );
}
