"use client";

import { TrendingUp } from "lucide-react";
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

const stackChartConfig: ChartConfig = {
  classesHeld: {
    label: "Classes Held",
    color: "hsl(var(--chart-1))",
  },
  classesPresent: {
    label: "Classes Present",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;
export function StackClassesBarChart({
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
        <ChartContainer config={stackChartConfig}>
          <BarChart data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="courseName"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
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
              stackId="a"
              fill="var(--color-classesHeld)"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="classesPresent"
              stackId="a"
              fill="var(--color-classesPresent)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing classes data for all time
        </div>
      </CardFooter>
    </Card>
  );
}
