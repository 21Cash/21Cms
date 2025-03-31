"use client";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart";

export interface ClassesBarChartProps {
  chartLabel: string;
  durationString?: string;
  classesData: {
    courseName: string;
    value: number;
  }[];
}

const classesChartConfig: ChartConfig = {
  value: {
    label: "value",
    color: "var(--color-primary)",
  },
};

interface ClassesTooltipProps {
  payload:
    | {
        payload: { courseName: string; value: number };
        value: number;
        name: string;
      }[]
    | null;
  active?: boolean;
}

const ClassesTooltip: React.FC<ClassesTooltipProps> = ({ payload, active }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-2 bg-background border rounded-md">
        <p className="font-semibold text-sm">{payload[0].payload.courseName}</p>
        <p className="text-muted-foreground text-xs">
          Value: {payload[0].value}
        </p>
      </div>
    );
  }

  return null;
};

export function ClassesBarChart({
  chartLabel,
  durationString,
  classesData,
}: ClassesBarChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{chartLabel}</CardTitle>
        {durationString && <CardDescription>{durationString}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ChartContainer config={classesChartConfig}>
          <BarChart data={classesData} margin={{ top: 20 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="courseName"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ClassesTooltip />} />
            <Bar
              dataKey="value"
              fill={classesChartConfig.value.color}
              radius={8}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        {/* Optional footer content */}
      </CardFooter>
    </Card>
  );
}

// Example usage of ClassesBarChart component with dummy data
export function ExampleUsage() {
  return (
    <ClassesBarChart
      chartLabel="Classes Attendance"
      durationString="January - June 2024"
      classesData={dummyClassesData}
    />
  );
}
