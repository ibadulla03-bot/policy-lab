"use client";

import { useState } from "react";
import { useGame } from "@/components/GameContext";
import StepBar from "@/components/StepBar";
import { roles, MIN_COOP_MEMBERS } from "@/lib/gameData";

const BENEFITS = [
  { icon: "💰", label: "Гос. субсидия", value: "500 000 ₸", color: "bg-green-light border-green-border text-green-dark" },
  { icon: "🏪", label: "Экономия на хранении", value: "−60%", color: "bg-blue-50 border-blue-100 text-blue-700" },
  { icon: "📑", label: "Налоговая нагрузка", value: "−30%", color: "bg-purple-50 border-purple-100 text-purple-700" },
  { icon: "🚛", label: "Премиум-покупатель", value: "+40 ₸/кг", color: "bg-amber-light border-amber-border text-amber-dark" },
];

export default function NegotiateScreen() {
  const { goTo, confirmSeason3 } = useGame();
  const [checked, setChecked] = useState<Set<number>>(new Set());

  function toggle(id: number) {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const memberCount = checked.size;
  const isValid = memberCount >= MIN_COOP_MEMBERS;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <StepBar current={3} />

      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-amber-light border border-amber-border flex items-center justify-center text-xl">
          🤝
        </div>
        <div>
          <h1 className="text-2xl font-bold text-amber-dark">
            Сезон 2 — Переговоры
          </h1>
          <p className="text-sm text-gray-500">15 минут на достижение договорённости</p>
        </div>
      </div>

      {/* Market event */}
      <div className="border-l-4 border-amber bg-amber-light rounded-r-2xl px-4 py-3 mb-5 mt-4">
        <div className="flex items-start gap-2">
          <span className="text-lg">📢</span>
          <div>
            <p className="text-sm font-semibold text-amber-dark mb-0.5">
              Событие рынка
            </p>
            <p className="text-sm text-amber-dark/80 leading-relaxed">
              Новый покупатель из Атырау ищет стабильные поставки смешанных
              овощей — минимум 5 тонн. Один фермер не может выполнить этот
              заказ.
            </p>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm mb-5">
        <h2 className="font-bold text-gray-800 text-sm mb-3">
          Что даёт кооператив
        </h2>
        <div className="grid grid-cols-2 gap-2.5">
          {BENEFITS.map((b) => (
            <div
              key={b.label}
              className={`rounded-xl border p-3 ${b.color}`}
            >
              <div className="text-xl mb-1">{b.icon}</div>
              <div className="text-xs font-medium opacity-75">{b.label}</div>
              <div className="text-base font-bold mt-0.5">{b.value}</div>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-3">
          Минимум {MIN_COOP_MEMBERS} члена · Взнос за регистрацию: 80 000 ₸
          (делится между участниками)
        </p>
      </div>

      {/* Hidden barrier reminder */}
      <div className="bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 mb-5">
        <div className="flex items-start gap-2">
          <span className="text-base">🔒</span>
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-1">
              Скрытые ограничения
            </p>
            <p className="text-sm text-gray-500 leading-relaxed">
              Каждый игрок имеет скрытое ограничение. Во время переговоров его
              можно раскрыть стратегически — или нет. Но действовать нужно в
              соответствии с ним.
            </p>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {["Долг перекупщику", "Нет денег на взнос", "Семья против", "Земельный спор", "Страх потерять самостоятельность"].map((b) => (
                <span key={b} className="text-xs bg-white border border-gray-200 text-gray-500 px-2 py-0.5 rounded-full">
                  {b}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Member selection */}
      <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm mb-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-gray-800 text-sm">
            Состав кооператива
          </h2>
          <span
            className={`text-xs font-bold px-2.5 py-1 rounded-full ${
              isValid
                ? "bg-green-light text-green-dark"
                : memberCount > 0
                ? "bg-amber-light text-amber-dark"
                : "bg-gray-100 text-gray-400"
            }`}
          >
            {memberCount} / 5
          </span>
        </div>
        <p className="text-xs text-gray-400 mb-3">
          Отметьте фермеров, которые вступают в кооператив
        </p>
        <div className="space-y-2">
          {roles.map((r) => {
            const on = checked.has(r.id);
            return (
              <label
                key={r.id}
                className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                  on
                    ? "border-green-mid bg-green-light"
                    : "border-gray-100 bg-gray-50 hover:border-gray-200"
                }`}
              >
                <input
                  type="checkbox"
                  checked={on}
                  onChange={() => toggle(r.id)}
                  className="w-4 h-4 accent-green-mid"
                />
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{ background: r.bg, color: r.tc }}
                >
                  {r.initials}
                </div>
                <div className="flex-1">
                  <span className="text-sm font-medium text-gray-800">
                    {r.name}
                  </span>
                  <div className="flex gap-1.5 mt-0.5">
                    <span className="text-xs text-gray-400">{r.crop}</span>
                    <span className="text-xs text-gray-300">·</span>
                    <span className="text-xs text-gray-400">{r.ha} га</span>
                  </div>
                </div>
                {on && (
                  <span className="text-green-mid text-lg">✓</span>
                )}
              </label>
            );
          })}
        </div>

        {/* Validation message */}
        {memberCount > 0 && !isValid && (
          <p className="text-xs text-amber-dark bg-amber-light rounded-xl px-3 py-2 mt-3">
            ⚠️ Нужно минимум {MIN_COOP_MEMBERS} фермера для регистрации
            кооператива. Добавьте ещё {MIN_COOP_MEMBERS - memberCount}.
          </p>
        )}
        {isValid && (
          <p className="text-xs text-green-dark bg-green-light rounded-xl px-3 py-2 mt-3">
            ✅ Достаточно участников для регистрации кооператива!
          </p>
        )}
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => goTo("season1")}
          className="px-5 py-2.5 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          ← Назад
        </button>
        <button
          onClick={() => confirmSeason3(Array.from(checked))}
          className="flex-1 px-5 py-2.5 bg-green-mid hover:bg-green-dark text-white font-semibold rounded-xl text-sm transition-colors"
        >
          Рассчитать итоги Сезона 3 →
        </button>
      </div>
    </div>
  );
}
