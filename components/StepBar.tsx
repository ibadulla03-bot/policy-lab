"use client";

const STEPS = [
  "Роли",
  "Контекст",
  "Сезон 1",
  "Переговоры",
  "Сезон 3",
];

interface StepBarProps {
  current: number; // 0-based index of active step
}

export default function StepBar({ current }: StepBarProps) {
  return (
    <div className="flex items-center gap-1 mb-6">
      {STEPS.map((label, i) => (
        <div key={i} className="flex-1 flex flex-col gap-1">
          <div
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i < current
                ? "bg-green-mid"
                : i === current
                ? "bg-[#a0d8c0]"
                : "bg-gray-200"
            }`}
          />
          <span
            className={`text-[10px] font-medium hidden sm:block ${
              i === current ? "text-green-dark" : "text-gray-400"
            }`}
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
