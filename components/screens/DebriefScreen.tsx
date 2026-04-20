"use client";

import { useGame } from "@/components/GameContext";

const QUESTIONS = [
  {
    n: "1",
    title: "Барьеры",
    text: "Что едва не помешало создать кооператив? Какое скрытое ограничение было сложнее всего преодолеть — и почему?",
  },
  {
    n: "2",
    title: "Рынок",
    text: "Ощутили ли вы проблему перепроизводства в Сезоне 1? Что изменилось, когда фермеры перестали конкурировать одной и той же культурой?",
  },
  {
    n: "3",
    title: "Доверие",
    text: "Зная о выгодах, почему реальный фермер из Бурлинского района всё равно может не вступать в кооператив? Что могло бы его убедить?",
  },
  {
    n: "4",
    title: "Политика",
    text: "Что EFCA или государство могут сделать иначе, чтобы фермеры переходили от «знаю, что это лучше» к «вступаю прямо сейчас»?",
  },
];

export default function DebriefScreen() {
  const { goTo, reset } = useGame();

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-xl">
          💬
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Разбор игры</h1>
          <p className="text-sm text-gray-500">
            Ведущий задаёт вопросы — все участники отвечают
          </p>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        {QUESTIONS.map((q) => (
          <div
            key={q.n}
            className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm"
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-green-light flex items-center justify-center text-green-dark font-bold text-sm flex-shrink-0">
                {q.n}
              </div>
              <div>
                <div className="font-bold text-gray-800 text-sm mb-1">
                  {q.title}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{q.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Policy research note */}
      <div className="bg-blue-50 border border-blue-100 rounded-2xl px-4 py-4 mb-8">
        <div className="flex items-start gap-2">
          <span className="text-lg">🎓</span>
          <div>
            <p className="text-sm font-semibold text-blue-800 mb-1">
              Для вашего проекта
            </p>
            <p className="text-sm text-blue-700 leading-relaxed">
              Барьеры, с которыми столкнулись игроки в этой игре, взяты из
              реальных исследований по кооперации в Казахстане и Центральной
              Азии. В политическом докладе свяжите механику игры с
              академическими источниками — это и есть исследовательский слой,
              который делает симуляцию научно обоснованной.
            </p>
          </div>
        </div>
      </div>

      {/* Credits */}
      <div className="text-center text-xs text-gray-400 mb-6 space-y-1">
        <div className="font-semibold text-gray-500">Батыс Базар</div>
        <div>Симуляционная игра по кооперации фермеров</div>
        <div>
          Policy Lab · GSPP, Назарбаев Университет ·{" "}
          <span className="text-green-mid font-medium">EFCA</span> AgriHub
        </div>
        <div>Бурлинский район, Западный Казахстан</div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => goTo("season3")}
          className="px-5 py-2.5 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          ← К результатам
        </button>
        <button
          onClick={reset}
          className="flex-1 px-5 py-2.5 bg-green-mid hover:bg-green-dark text-white font-semibold rounded-xl text-sm transition-colors"
        >
          🔄 Начать заново
        </button>
      </div>
    </div>
  );
}
