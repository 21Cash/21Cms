"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";
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

export interface ClassesHorizontalBarChartProps {
  chartLabel: string;
  durationString?: string;
  classesData: {
    courseName: string;
    value: number;
  }[];
}

// Dummy data for the chart
const dummyClassesData = [
  { courseName: "Mathematics", value: 45 },
  { courseName: "History", value: 30 },
  { courseName: "Biology", value: 55 },
  { courseName: "Chemistry", value: 40 },
  { courseName: "Physics", value: 35 },
];

const classesChartConfig: ChartConfig = {
  value: {
    label: "value",
    color: "var(--color-primary)",
  },
};

export function ClassesHorizontalBarChart({
  chartLabel,
  durationString,
  classesData,
}: ClassesHorizontalBarChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{chartLabel}</CardTitle>
        {durationString && <CardDescription>{durationString}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ChartContainer config={classesChartConfig}>
          <BarChart data={classesData} layout="vertical" margin={{ top: 20 }}>
            <CartesianGrid horizontal={false} />
            {/* Hide YAxis since we display course names on the bars */}
            <YAxis dataKey="courseName" type="category" hide />
            <XAxis type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="value"
              fill={classesChartConfig.value.color}
              radius={8}
            >
              {/* Course name always in black */}
              <LabelList
                dataKey="courseName"
                position="insideLeft"
                offset={8}
                className="fill-black"
                fontSize={15}
              />
              {/* Value label: black in light mode, white in dark mode */}
              <LabelList
                dataKey="value"
                position="right"
                offset={8}
                className="fill-black dark:fill-white"
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

// Example usage with dummy data
export function ExampleUsage() {
  return (
    <ClassesHorizontalBarChart
      chartLabel="Classes Count"
      durationString="Sample Duration"
      classesData={dummyClassesData}
    />
  );
}
