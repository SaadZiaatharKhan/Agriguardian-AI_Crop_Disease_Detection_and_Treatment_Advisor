"use client"
import { useState, useEffect } from "react"
import { TrendingUp } from "lucide-react"
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
  Tooltip,
} from "recharts"

import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"

export default function SeverityChart({ data }) {
  const severityPercentage = data["Severity Percentage"] || 0;
  const severityLevel = data["Severity"] || "Unknown";

  // Map severity level to colors using HSL values
  const severityColors = {
    Mild: "hsl(50, 100%, 50%)", // Yellow
    Moderate: "hsl(220, 90%, 55%)", // Blue
    Critical: "hsl(0, 80%, 50%)", // Red
    Healthy: "hsl(0, 0%, 100%)", // White
  };

  const fillColor = severityColors[severityLevel] || "gray";

  const chartData = [
    {
      browser: "safari",
      Severity: severityPercentage,
      fill: fillColor,
    },
  ];

  const chartConfig = {
    Severity: {
      label: "Severity",
    },
    safari: {
      label: "Safari",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  return (
    <Card className="flex flex-col">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart
            data={chartData}
            endAngle={360 * (severityPercentage / 100)}
            startAngle={0}
            innerRadius={80}
            outerRadius={140}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[86, 74]}
            />
            <RadialBar dataKey="Severity" background isAnimationActive animationDuration={1500} />
            <Tooltip cursor={false} formatter={(value) => `${value}%`} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-4xl font-bold"
                        >
                          {parseFloat(severityPercentage).toFixed(2)}%
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          {severityLevel}
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex justify-center gap-4 p-4 border-t">
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded-full" style={{ backgroundColor: "hsl(50, 100%, 50%)" }}></span>
          <span className="text-sm">Mild</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded-full" style={{ backgroundColor: "hsl(220, 90%, 55%)" }}></span>
          <span className="text-sm">Moderate</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded-full" style={{ backgroundColor: "hsl(0, 80%, 50%)" }}></span>
          <span className="text-sm">Critical</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded-full border" style={{ backgroundColor: "hsl(0, 0%, 100%)" }}></span>
          <span className="text-sm">Healthy</span>
        </div>
      </CardFooter>
    </Card>
  );
}
