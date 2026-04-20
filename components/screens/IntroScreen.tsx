"use client";

import { useGame } from "@/components/GameContext";

export default function IntroScreen() {
  const { goTo } = useGame();

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-dark to-[#0a4a2e] flex flex-col">
      {/* Hero */}
      <div className="flex flex-col items-center justify-center flex-1 px-6 py-16 text-center">
        <div className="text-6xl mb-4">🌱</div>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2 tracking-tight">
          Батыс Базар
        </h1>
        <p className="text-green-mid text-lg sm:text-xl font-medium mb-1">
          Симуляционная игра по кооперации фермеров
        </p>
        <p className="text-white/60 text-sm mb-10">
          Бурлинский район · Западный Казахстан · EFCA AgriHub
        </p>

        {/* Stats */}
        <div className="flex gap-6 mb-12">
          {[
            { label: "Игроков", value: "5" },
            { label: "Сезонов", value: "3" },
            { label: "Времени", value: "~45 мин" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-bold text-white">{s.value}</div>
              <div className="text-white/50 text-xs uppercase tracking-wider mt-1">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => goTo("roles")}
            className="px-8 py-3.5 bg-green-mid hover:bg-[#17b882] text-white font-semibold rounded-xl transition-colors text-base shadow-lg shadow-green-mid/30"
          >
            Начать игру →
          </button>
          <button
            onClick={() => goTo("facilitator")}
            className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition-colors text-base border border-white/20"
          >
            Инструкция ведущего
          </button>
        </div>
      </div>

      {/* About card */}
      <div className="bg-white rounded-t-3xl px-6 pt-8 pb-10 max-w-2xl mx-auto w-full">
        <h2 className="text-lg font-bold text-green-dark mb-3">
          О чём эта игра?
        </h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          Пять фермеров-тепличников из Аксая выращивают томаты, огурцы и перец.
          Каждый может работать в одиночку — или попробовать объединиться в
          кооператив. Рынок, погода и государственные правила устроены так, что
          совместная работа выгоднее. Но договориться непросто.
        </p>
        <div className="grid grid-cols-3 gap-3">
          {[
            {
              icon: "🌾",
              title: "Сезон 1",
              desc: "Работа в одиночку — рынок наказывает",
              color: "bg-red-50 border-red-100",
              titleColor: "text-red-crisis",
            },
            {
              icon: "🤝",
              title: "Сезон 2",
              desc: "Переговоры и скрытые барьеры",
              color: "bg-amber-light border-amber-border",
              titleColor: "text-amber-dark",
            },
            {
              icon: "🏆",
              title: "Сезон 3",
              desc: "Кооператив vs. одиночки",
              color: "bg-green-light border-green-border",
              titleColor: "text-green-dark",
            },
          ].map((s) => (
            <div
              key={s.title}
              className={`rounded-xl border p-3 ${s.color}`}
            >
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className={`text-xs font-bold ${s.titleColor}`}>
                {s.title}
              </div>
              <div className="text-xs text-gray-500 mt-0.5 leading-snug">
                {s.desc}
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-5 text-center">
          Разработано для Policy Lab · GSPP, Назарбаев Университет
        </p>
      </div>
    </div>
  );
}
