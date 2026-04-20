"use client";

import { useGame } from "@/components/GameContext";
import { roles } from "@/lib/gameData";

export default function FacilitatorScreen() {
  const { goTo } = useGame();

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl">📋</span>
        <div>
          <h1 className="text-2xl font-bold text-green-dark">
            Инструкция ведущего
          </h1>
          <p className="text-sm text-gray-500">
            Все скрытые ограничения видны только вам
          </p>
        </div>
      </div>

      {/* Hidden barriers — facilitator-only view */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-amber-600 text-lg">🔐</span>
          <h2 className="font-bold text-amber-800 text-sm uppercase tracking-wide">
            Скрытые ограничения всех игроков
          </h2>
        </div>
        <div className="space-y-3">
          {roles.map((r) => (
            <div
              key={r.id}
              className="bg-white rounded-xl p-3 border border-amber-100"
            >
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                  style={{ background: r.bg, color: r.tc }}
                >
                  {r.initials}
                </div>
                <div>
                  <span className="font-semibold text-sm">{r.name}</span>
                  <span className="text-gray-400 text-xs ml-2">
                    {r.crop} · {r.ha} га
                  </span>
                </div>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed mb-1.5">
                {r.constraint}
              </p>
              <p className="text-xs text-amber-700 leading-relaxed font-medium">
                <span className="font-bold">Влияние:</span> {r.impact}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Structure */}
      <div className="space-y-4 mb-6">
        <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
          <h2 className="font-bold text-green-dark mb-2">
            Подготовка (5 мин)
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Раздайте каждому игроку одну карточку роли. Скрытое ограничение —
            личная информация, её нельзя показывать другим. Карточки можно
            показать каждому игроку индивидуально на экране.
          </p>
        </div>

        {[
          {
            season: "Сезон 1 — Работа в одиночку",
            time: "10 мин",
            color: "border-l-red-crisis",
            desc: "Кооперация запрещена. Каждый фермер продаёт урожай самостоятельно. Применяются рыночные правила. Подсчитайте доход, огласите результаты.",
          },
          {
            season: "Сезон 2 — Переговоры",
            time: "15 мин",
            color: "border-l-amber",
            desc: "Свободные переговоры. Игроки могут создать кооператив (от 3 до 5 человек). Скрытые ограничения действуют, но их можно стратегически раскрывать.",
          },
          {
            season: "Сезон 3 — Итоги",
            time: "10 мин",
            color: "border-l-green-mid",
            desc: "Применяются условия кооперации или одиночной работы. Тянется карта кризиса. Сравниваются итоговые доходы. Все раскрывают скрытые ограничения.",
          },
        ].map((s) => (
          <div
            key={s.season}
            className={`bg-white border border-gray-100 rounded-2xl p-4 shadow-sm border-l-4 ${s.color}`}
          >
            <div className="flex justify-between items-start mb-1">
              <h2 className="font-bold text-gray-800 text-sm">{s.season}</h2>
              <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                {s.time}
              </span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">{s.desc}</p>
          </div>
        ))}

        <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
          <h2 className="font-bold text-green-dark mb-3">
            Вопросы для разбора (10 мин)
          </h2>
          <div className="space-y-2">
            {[
              "Что едва не помешало создать кооператив?",
              "Какое скрытое ограничение было сложнее всего преодолеть — и почему?",
              "Что нужно реальному фермеру из Бурлинского района, чтобы вступить в кооператив?",
              "Что EFCA или государство могут сделать иначе, чтобы фермеры действительно вступали в кооперативы?",
            ].map((q, i) => (
              <div
                key={i}
                className="flex gap-2 bg-green-light rounded-xl p-3"
              >
                <span className="text-green-mid font-bold text-sm min-w-[20px]">
                  {i + 1}.
                </span>
                <p className="text-sm text-gray-700">{q}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => goTo("intro")}
          className="px-5 py-2.5 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          ← Назад
        </button>
        <button
          onClick={() => goTo("roles")}
          className="flex-1 px-5 py-2.5 bg-green-mid hover:bg-green-dark text-white font-semibold rounded-xl text-sm transition-colors"
        >
          К ролям →
        </button>
      </div>
    </div>
  );
}
