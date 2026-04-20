"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Season3Result, calcSeason1, fmt } from "@/lib/gameData";

interface ResultsChartProps {
  season3: Season3Result[];
}

const formatTick = (value: number) => {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}М`;
  if (value >= 1_000) return `${Math.round(value / 1_000)}К`;
  return String(value);
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-lg text-xs">
        <p className="font-bold text-gray-700 mb-2">{label}</p>
        {payload.map((p: any) => (
          <div key={p.name} className="flex items-center gap-2 mb-1">
            <div
              className="w-2.5 h-2.5 rounded-sm flex-shrink-0"
              style={{ background: p.fill }}
            />
            <span className="text-gray-500">{p.name}:</span>
            <span className="font-semibold text-gray-800">{fmt(p.value)}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function ResultsChart({ season3 }: ResultsChartProps) {
  const s1results = calcSeason1();

  const data = season3.map((r3) => {
    const r1 = s1results.find((r) => r.id === r3.id)!;
    return {
      name: r3.shortName,
      "Сезон 1": r1.net,
      "Сезон 3": r3.net,
      isCoop: r3.isCoop,
    };
  });

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={280}>
        <BarChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 5 }}
          barGap={4}
          barCategoryGap="25%"
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 11, fill: "#666" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tickFormatter={formatTick}
            tick={{ fontSize: 10, fill: "#999" }}
            axisLine={false}
            tickLine={false}
            width={40}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }}
          />
          <Bar dataKey="Сезон 1" fill="#d84020" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Сезон 3" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.isCoop ? "#1D9E75" : "#e8a000"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="flex items-center justify-center gap-4 text-xs text-gray-500 mt-1">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-[#d84020] inline-block" />
          Сезон 1 (одиночка)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-green-mid inline-block" />
          Сезон 3 (кооператив)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-amber inline-block" />
          Сезон 3 (одиночка)
        </span>
      </div>
    </div>
  );
}
