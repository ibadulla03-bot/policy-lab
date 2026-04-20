"use client";

import dynamic from "next/dynamic";
import { useGame } from "@/components/GameContext";
import { roles, fmt, MIN_COOP_MEMBERS } from "@/lib/gameData";
import { calcSeason1 } from "@/lib/gameData";

const ResultsChart = dynamic(() => import("@/components/ResultsChart"), {
  ssr: false,
  loading: () => (
    <div className="h-64 flex items-center justify-center text-gray-400 text-sm">
      Загрузка диаграммы…
    </div>
  ),
});

function incomeColor(net: number) {
  if (net > 900_000) return { text: "text-green-dark" };
  if (net > 500_000) return { text: "text-amber-dark" };
  return { text: "text-red-crisis" };
}

export default function Season3Screen() {
  const { goTo, crisis, season3Results, memberIds } = useGame();

  if (!season3Results || !crisis) return null;

  const s1results = calcSeason1();
  const isValidCoop = memberIds.length >= MIN_COOP_MEMBERS;
  const coopMembers = season3Results.filter((r) => r.isCoop);
  const soloMembers = season3Results.filter((r) => !r.isCoop);
  const s1avg = s1results.reduce((a, r) => a + r.net, 0) / s1results.length;
  const coopAvg = coopMembers.length > 0
    ? coopMembers.reduce((a, r) => a + r.net, 0) / coopMembers.length
    : 0;
  const soloAvg = soloMembers.length > 0
    ? soloMembers.reduce((a, r) => a + r.net, 0) / soloMembers.length
    : 0;

  const maxNet = Math.max(...season3Results.map((r) => r.net));

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-green-light border border-green-border flex items-center justify-center text-xl">
          🏆
        </div>
        <div>
          <h1 className="text-2xl font-bold text-green-dark">
            Сезон 3 — Итоговые результаты
          </h1>
          <p className="text-sm text-gray-500">Кооператив против одиночной работы</p>
        </div>
      </div>

      {/* Crisis card */}
      <div className="border-l-4 border-amber bg-amber-light rounded-r-2xl px-4 py-3 mb-5">
        <div className="flex items-start gap-2">
          <span className="text-xl">⚡</span>
          <div>
            <p className="text-sm font-bold text-amber-dark mb-1">
              Карта кризиса: {crisis.title}
            </p>
            <p className="text-sm text-amber-dark/80 leading-relaxed">
              {crisis.text}
            </p>
          </div>
        </div>
      </div>

      {/* Coop/Solo insight banner */}
      {isValidCoop ? (
        <div className="bg-green-light border border-green-border rounded-2xl px-4 py-3 mb-5">
          <div className="flex items-start gap-2">
            <span className="text-xl">✅</span>
            <div>
              <p className="text-sm font-bold text-green-dark mb-1">
                Кооператив создан ({memberIds.length}{" "}
                {memberIds.length === 1 ? "фермер" : memberIds.length < 5 ? "фермера" : "фермеров"})
              </p>
              <p className="text-sm text-green-dark/80 leading-relaxed">
                Кооператив получил государственную субсидию, объединил хранение
                и выполнил заказ из Атырау. Даже с кризисом члены кооператива
                заработали значительно больше, чем в Сезоне 1.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-red-light border border-red-border rounded-2xl px-4 py-3 mb-5">
          <div className="flex items-start gap-2">
            <span className="text-xl">❌</span>
            <div>
              <p className="text-sm font-bold text-red-crisis mb-1">
                Кооператив не создан
              </p>
              <p className="text-sm text-red-crisis/80 leading-relaxed">
                Менее {MIN_COOP_MEMBERS} членов — регистрация невозможна. Группа
                упустила субсидию и заказ из Атырау. Именно это происходит,
                когда скрытые барьеры не решаются.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Chart */}
      <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm mb-5">
        <h2 className="font-bold text-gray-800 text-sm mb-4">
          Сравнение доходов: Сезон 1 vs Сезон 3
        </h2>
        <ResultsChart season3={season3Results} />
      </div>

      {/* Summary metrics */}
      <div className="grid grid-cols-3 gap-2.5 mb-5">
        {[
          { label: "Сезон 1 (средний)", value: fmt(s1avg), color: "text-red-crisis" },
          { label: isValidCoop ? "Кооператив (С3)" : "Кооп (С3)", value: isValidCoop ? fmt(coopAvg) : "—", color: "text-green-dark" },
          { label: "Одиночки (С3)", value: soloMembers.length > 0 ? fmt(soloAvg) : "—", color: soloAvg >= s1avg ? "text-amber-dark" : "text-red-crisis" },
        ].map((m) => (
          <div key={m.label} className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm text-center">
            <div className="text-[10px] text-gray-400 uppercase tracking-wide mb-1">
              {m.label}
            </div>
            <div className={`text-sm font-bold ${m.color}`}>{m.value}</div>
          </div>
        ))}
      </div>

      {/* Individual results */}
      <h2 className="font-bold text-gray-800 text-sm mb-3">
        Результаты фермеров
      </h2>
      <div className="space-y-2.5 mb-5">
        {season3Results.map((r) => {
          const s1r = s1results.find((x) => x.id === r.id)!;
          const diff = r.net - s1r.net;
          const colors = incomeColor(r.net);
          const pct = Math.round((r.net / maxNet) * 100);

          return (
            <div
              key={r.id}
              className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{ background: r.bg, color: r.tc }}
                  >
                    {r.initials}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-sm text-gray-800">
                        {r.shortName}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                          r.isCoop
                            ? "bg-green-light text-green-dark"
                            : "bg-red-light text-red-crisis"
                        }`}
                      >
                        {r.isCoop ? "Кооператив" : "Одиночка"}
                      </span>
                    </div>
                    <div className="text-xs text-gray-400">
                      {r.crop} · {r.ha} га
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-base font-bold ${colors.text}`}>
                    {fmt(r.net)}
                  </div>
                  <div
                    className={`text-xs font-medium ${
                      diff >= 0 ? "text-green-dark" : "text-red-crisis"
                    }`}
                  >
                    {diff >= 0 ? "+" : ""}
                    {fmt(diff)} vs С1
                  </div>
                </div>
              </div>
              {/* Bar */}
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-2">
                <div
                  className={`h-full rounded-full bar-animate ${
                    r.isCoop ? "bg-green-mid" : "bg-amber"
                  }`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <div className="flex flex-wrap gap-x-3 text-xs text-gray-400">
                <span>Выручка: {fmt(r.gross)}</span>
                <span>Хранение: −{fmt(r.storage)}</span>
                {r.subsidy > 0 && (
                  <span className="text-green-dark">Субсидия: +{fmt(r.subsidy)}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* All constraints reveal */}
      <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm mb-6">
        <h2 className="font-bold text-gray-800 text-sm mb-1">
          Раскрытие скрытых ограничений
        </h2>
        <p className="text-xs text-gray-400 mb-4">
          Теперь каждый раскрывает своё ограничение. Обсудите: как они повлияли
          на переговоры?
        </p>
        <div className="space-y-3">
          {roles.map((r) => (
            <div
              key={r.id}
              className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl"
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
                style={{ background: r.bg, color: r.tc }}
              >
                {r.initials}
              </div>
              <div>
                <div className="font-semibold text-sm text-gray-800 mb-1">
                  {r.name}
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {r.constraint}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => goTo("negotiate")}
          className="px-5 py-2.5 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          ← Назад
        </button>
        <button
          onClick={() => goTo("debrief")}
          className="flex-1 px-5 py-2.5 bg-green-mid hover:bg-green-dark text-white font-semibold rounded-xl text-sm transition-colors"
        >
          К разбору →
        </button>
      </div>
    </div>
  );
}
