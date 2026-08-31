"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer
} from "recharts";
import { Clock, TrendingUp } from "lucide-react";

type TimelineData = {
  role: { id: string; title: string };
  prediction: {
    expected: number;
    low: number;
    high: number;
    remainingHours: number;
    gapCount: number;
    dataPoints: Array<{
      week: number;
      readiness: number;
      lower: number;
      upper: number;
    }>;
  };
  currentReadiness: number;
};

export function ReadinessTimeline({ data }: { data: TimelineData }) {
  const { prediction, currentReadiness } = data;
  const chartData = prediction.dataPoints;

  return (
    <article className="rounded-lg border border-border bg-white p-5">
      <div className="flex items-center gap-2">
        <TrendingUp aria-hidden="true" className="text-teal" size={20} />
        <h2 className="text-lg font-semibold">Predicted Readiness Timeline</h2>
      </div>

      {/* Summary Stats */}
      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="rounded-md bg-canvas p-3 text-center">
          <div className="text-2xl font-bold text-ink">
            {prediction.expected}
          </div>
          <div className="text-xs text-muted">weeks (expected)</div>
        </div>
        <div className="rounded-md bg-canvas p-3 text-center">
          <div className="text-2xl font-bold text-ink">
            {prediction.low}–{prediction.high}
          </div>
          <div className="text-xs text-muted">weeks (range)</div>
        </div>
        <div className="rounded-md bg-canvas p-3 text-center">
          <div className="text-2xl font-bold text-ink">
            {prediction.remainingHours}h
          </div>
          <div className="text-xs text-muted">remaining</div>
        </div>
      </div>

      {/* Assumption */}
      <p className="mt-3 text-xs text-muted">
        Based on current pace ({prediction.gapCount} skills remaining, {Math.round(currentReadiness * 100)}% readiness now).
        Updates as you complete resources.
      </p>

      {/* Chart */}
      <div className="mt-5 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="confidenceBand" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#14b8a6" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#14b8a6" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="week"
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: "#e5e7eb" }}
              label={{ value: "Weeks", position: "insideBottomRight", offset: -5, fontSize: 12 }}
            />
            <YAxis
              domain={[0, 100]}
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `${v}%`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                fontSize: "12px"
              }}
              formatter={(value: number, name: string) => {
                if (name === "readiness") return [`${Math.round(value)}%`, "Expected"];
                if (name === "upper") return [`${Math.round(value)}%`, "Upper bound"];
                return [`${Math.round(value)}%`, "Lower bound"];
              }}
              labelFormatter={(label) => `Week ${label}`}
            />
            {/* Confidence band */}
            <Area
              type="monotone"
              dataKey="upper"
              stroke="none"
              fill="url(#confidenceBand)"
              stackId="1"
            />
            <Area
              type="monotone"
              dataKey="lower"
              stroke="none"
              fill="white"
              stackId="1"
            />
            {/* Main line */}
            <Area
              type="monotone"
              dataKey="readiness"
              stroke="#14b8a6"
              strokeWidth={2}
              fill="none"
              dot={false}
            />
            {/* Job-ready threshold */}
            <ReferenceLine
              y={80}
              stroke="#6366f1"
              strokeDasharray="5 5"
              label={{
                value: "Job-ready (80%)",
                position: "insideTopRight",
                fontSize: 11,
                fill: "#6366f1"
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Time to job-ready */}
      <div className="mt-4 flex items-center gap-2 rounded-md bg-teal/10 p-3 text-sm text-teal">
        <Clock size={16} />
        <span>
          At your current pace, you&apos;ll reach job-ready for{" "}
          <strong>{data.role.title}</strong> in approximately{" "}
          <strong>{prediction.expected} weeks</strong> (range: {prediction.low}–{prediction.high} weeks).
        </span>
      </div>
    </article>
  );
}
