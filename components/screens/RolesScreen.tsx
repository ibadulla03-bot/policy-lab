"use client";

import { useState } from "react";
import { useGame } from "@/components/GameContext";
import StepBar from "@/components/StepBar";
import { roles } from "@/lib/gameData";

export default function RolesScreen() {
  const { goTo, revealRole, revealedRoles } = useGame();
  const [flipped, setFlipped] = useState<Set<number>>(new Set());

  function handleReveal(id: number) {
    if (flipped.has(id)) return;
    setFlipped((prev) => new Set([...prev, id]));
    revealRole(id);
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <StepBar current={0} />
      <h1 className="text-2xl font-bold text-green-dark mb-1">Карточки ролей</h1>
      <p className="text-sm text-gray-500 mb-6">
        Каждый игрок получает одну карточку. Нажмите на свою карточку, чтобы
        увидеть скрытое ограничение — не показывайте его другим.
      </p>

      <div className="space-y-3">
        {roles.map((r) => {
          const revealed = flipped.has(r.id);
          return (
            <div
              key={r.id}
              onClick={() => handleReveal(r.id)}
              className={`rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
                revealed
                  ? "border-green-mid bg-green-light cursor-default"
                  : "border-dashed border-gray-300 bg-white cursor-pointer hover:border-green-mid hover:shadow-md hover:-translate-y-0.5"
              }`}
            >
              {/* Header row — always visible */}
              <div className="flex items-center gap-3 p-4">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                  style={{ background: r.bg, color: r.tc }}
                >
                  {r.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm text-gray-800">
                    {r.name}
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    <span
                      className="inline-flex items-center text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{
                        background: r.bg + "80",
                        color: r.tc,
                      }}
                    >
                      {r.archetype}
                    </span>
                    <span className="inline-flex items-center text-xs px-2 py-0.5 rounded-full bg-green-light text-green-dark font-medium">
                      {r.crop}
                    </span>
                    <span className="inline-flex items-center text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-medium">
                      {r.ha} га
                    </span>
                  </div>
                </div>
                {!revealed && (
                  <div className="text-xs text-gray-400 italic text-right leading-tight">
                    👆 Нажмите,<br />чтобы открыть
                  </div>
                )}
              </div>

              {/* Revealed constraint */}
              {revealed && (
                <div className="border-t border-green-border bg-white/70 px-4 py-3">
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="text-base">🔒</span>
                    <span className="text-xs font-bold uppercase tracking-wide text-green-dark">
                      Ваше скрытое ограничение
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed mb-2">
                    {r.constraint}
                  </p>
                  <div className="bg-green-light rounded-xl p-2.5">
                    <p className="text-xs text-green-dark leading-relaxed">
                      <span className="font-bold">Влияние на игру: </span>
                      {r.impact}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {flipped.size > 0 && flipped.size < roles.length && (
        <p className="text-center text-xs text-gray-400 mt-4">
          Открыто {flipped.size} из {roles.length} карточек
        </p>
      )}

      <div className="flex gap-3 mt-8">
        <button
          onClick={() => goTo("intro")}
          className="px-5 py-2.5 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          ← Назад
        </button>
        <button
          onClick={() => goTo("context")}
          className="flex-1 px-5 py-2.5 bg-green-mid hover:bg-green-dark text-white font-semibold rounded-xl text-sm transition-colors"
        >
          Сезон 1 →
        </button>
      </div>
    </div>
  );
}
