"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export interface StackClassesBarChartProps {
  label: string;
  durationText?: string;
  data: {
    courseName: string;
    classesHeld: number;
    classesPresent: number;
  }[];
}

const chartConfig: ChartConfig = {
  classesHeld: {
    label: "Classes Held",
    color: "hsl(var(--chart-1))",
  },
  classesPresent: {
    label: "Classes Present",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function DoubleBarChart({
  label,
  durationText,
  data,
}: StackClassesBarChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{label}</CardTitle>
        {durationText && <CardDescription>{durationText}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            data={data}
            barSize={24}
            style={{ fontSize: 12 }}
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          >
            <CartesianGrid vertical={false} strokeOpacity={0.3} />
            <XAxis
              dataKey="courseName"
              axisLine={false}
              tickLine={false}
              tickMargin={10}
              tickFormatter={(value) => value.slice(0, 3).toUpperCase()}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    const course = data.find(
                      (item) => item.courseName.slice(0, 3) === value
                    );
                    return course?.courseName || value;
                  }}
                />
              }
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="classesHeld"
              fill="var(--color-classesHeld)"
              radius={[4, 4, 4, 4]}
            />
            <Bar
              dataKey="classesPresent"
              fill="var(--color-classesPresent)"
              radius={[4, 4, 4, 4]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
