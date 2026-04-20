"use client";

import { useGame } from "@/components/GameContext";
import StepBar from "@/components/StepBar";
import { calcSeason1, fmt, STORAGE_SOLO, SUBSIDY_TOTAL } from "@/lib/gameData";

const results = calcSeason1();

function incomeColor(net: number) {
  if (net > 900_000) return { bar: "bg-green-mid", text: "text-green-dark", badge: "bg-green-light text-green-dark" };
  if (net > 500_000) return { bar: "bg-amber", text: "text-amber-dark", badge: "bg-amber-light text-amber-dark" };
  return { bar: "bg-red-500", text: "text-red-crisis", badge: "bg-red-light text-red-crisis" };
}

export default function Season1Screen() {
  const { goTo } = useGame();
  const totalNet = results.reduce((s, r) => s + r.net, 0);
  const avgNet = totalNet / results.length;
  const maxNet = Math.max(...results.map((r) => r.net));

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <StepBar current={2} />

      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-red-light border border-red-border flex items-center justify-center text-xl">
          🌾
        </div>
        <div>
          <h1 className="text-2xl font-bold text-red-crisis">
            Сезон 1 — Работа в одиночку
          </h1>
          <p className="text-sm text-gray-500">Без кооперации, без субсидий</p>
        </div>
      </div>
      <p className="text-sm text-gray-500 mb-6">
        Каждый фермер продаёт самостоятельно. Смотрим, что происходит с
        доходами.
      </p>

      {/* Market conditions table */}
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm mb-5">
        <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
          <h2 className="font-semibold text-sm text-gray-700">
            Рыночные условия
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-500 bg-gray-50/50">
                <th className="text-left px-4 py-2.5 font-medium">Культура</th>
                <th className="text-right px-4 py-2.5 font-medium">Цена</th>
                <th className="text-right px-4 py-2.5 font-medium">Причина</th>
                <th className="text-right px-4 py-2.5 font-medium">Хранение</th>
              </tr>
            </thead>
            <tbody>
              {[
                { crop: "Томаты", price: "140 ₸/кг", note: "Перепроизводство", storage: "15 000 ₸", red: true },
                { crop: "Огурцы", price: "200 ₸/кг", note: "Умеренная конкуренция", storage: "15 000 ₸", red: false },
                { crop: "Перец", price: "260 ₸/кг", note: "Стабильный рынок", storage: "15 000 ₸", red: false },
              ].map((row) => (
                <tr key={row.crop} className="border-t border-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {row.crop}
                  </td>
                  <td className={`px-4 py-3 text-right font-bold ${row.red ? "text-red-crisis" : "text-gray-700"}`}>
                    {row.price}
                  </td>
                  <td className="px-4 py-3 text-right text-xs text-gray-400">
                    {row.note}
                  </td>
                  <td className="px-4 py-3 text-right text-gray-500">
                    {row.storage}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-2.5 border-t border-gray-100 bg-gray-50/50">
          <p className="text-xs text-gray-400">
            Урожайность: 8 000 кг/га · Без субсидий
          </p>
        </div>
      </div>

      {/* Results */}
      <h2 className="font-bold text-gray-800 text-sm mb-3">
        Результаты фермеров
      </h2>
      <div className="space-y-2.5 mb-5">
        {results.map((r) => {
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
                    <div className="font-semibold text-sm text-gray-800">
                      {r.shortName}
                    </div>
                    <div className="text-xs text-gray-400">
                      {r.crop} · {r.ha} га
                    </div>
                  </div>
                </div>
                <div className={`text-base font-bold ${colors.text}`}>
                  {fmt(r.net)}
                </div>
              </div>
              {/* Bar */}
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-2">
                <div
                  className={`h-full rounded-full bar-animate ${colors.bar}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              {/* Detail */}
              <div className="flex flex-wrap gap-x-4 text-xs text-gray-400">
                <span>Выручка: {fmt(r.gross)}</span>
                <span>Хранение: −{fmt(STORAGE_SOLO)}</span>
                <span className="text-red-400">Субсидия: ✗</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm mb-5">
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="bg-gray-50 rounded-xl p-3 text-center">
            <div className="text-xs text-gray-500 mb-1">Всего (5 фермеров)</div>
            <div className="text-lg font-bold text-gray-800">{fmt(totalNet)}</div>
          </div>
          <div className="bg-gray-50 rounded-xl p-3 text-center">
            <div className="text-xs text-gray-500 mb-1">В среднем</div>
            <div className="text-lg font-bold text-amber-dark">{fmt(avgNet)}</div>
          </div>
        </div>
        <div className="bg-amber-light border border-amber-border rounded-xl px-3 py-2.5">
          <p className="text-xs text-amber-dark leading-relaxed">
            <strong>Что упущено:</strong> Субсидия {fmt(SUBSIDY_TOTAL)} недоступна без кооператива. Каждый платит {fmt(STORAGE_SOLO)} за хранение вместо {fmt(6000)}.
          </p>
        </div>
      </div>

      {/* Takeaway */}
      <div className="border-l-4 border-red-crisis bg-red-light rounded-r-2xl px-4 py-3 mb-6">
        <h3 className="font-bold text-red-crisis text-sm mb-1">
          Главный вывод Сезона 1
        </h3>
        <p className="text-sm text-red-crisis/80 leading-relaxed">
          Оба фермера с томатами зарабатывают меньше ожидаемого из-за
          перепроизводства. Все платят за хранение по отдельности. Никто не
          получает государственную субсидию — она требует регистрации
          кооператива.
        </p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => goTo("context")}
          className="px-5 py-2.5 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          ← Назад
        </button>
        <button
          onClick={() => goTo("negotiate")}
          className="flex-1 px-5 py-2.5 bg-green-mid hover:bg-green-dark text-white font-semibold rounded-xl text-sm transition-colors"
        >
          Сезон 2: Переговоры →
        </button>
      </div>
    </div>
  );
}
