"use client";

import { useGame } from "@/components/GameContext";
import StepBar from "@/components/StepBar";

export default function ContextScreen() {
  const { goTo } = useGame();

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <StepBar current={1} />
      <h1 className="text-2xl font-bold text-green-dark mb-1">Контекст игры</h1>
      <p className="text-xs text-gray-400 italic mb-6">
        Ведущий читает вслух для всех участников перед Сезоном 1.
      </p>

      <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm mb-4">
        <h2 className="font-bold text-gray-800 mb-3">
          Ситуация в Бурлинском районе
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed mb-3">
          Вы — пять фермеров-тепличников из Аксая, Бурлинский район,
          Западно-Казахстанская область. Каждый выращивает овощи — томаты,
          огурцы или перец — на участках от 2 до 4 гектаров.
        </p>
        <p className="text-sm text-gray-600 leading-relaxed mb-3">
          АгроБизнесЦентр «Батыс АгроХаб» был создан EFCA для поддержки
          фермеров. Есть общее здание, оборудование, возможность обучения. Но
          финансирование EFCA заканчивается в 2027 году. После этого центр
          должен выжить самостоятельно — или закрыться.
        </p>
        <p className="text-sm text-gray-600 leading-relaxed">
          Сейчас каждый продаёт урожай самостоятельно — на местном рынке или
          перекупщикам. Цены непредсказуемы. Хранение дорого обходится, если
          платить в одиночку. Государственные субсидии и налоговые льготы
          доступны только зарегистрированным юридическим лицам — например,
          кооперативам.
        </p>
      </div>

      {/* Market alert */}
      <div className="border-l-4 border-amber rounded-r-2xl bg-amber-light px-4 py-3 mb-4">
        <div className="flex items-start gap-2">
          <span className="text-lg mt-0.5">⚠️</span>
          <div>
            <p className="text-sm font-semibold text-amber-dark mb-1">
              Рыночная ситуация этого сезона
            </p>
            <p className="text-sm text-amber-dark/80 leading-relaxed">
              Цены на томаты низкие — сразу трое фермеров продают одну культуру
              в одно время. Цены на огурцы и перец стабильные.
            </p>
          </div>
        </div>
      </div>

      {/* Season 1 rule */}
      <div className="bg-green-light border border-green-border rounded-2xl px-4 py-3 mb-6">
        <div className="flex items-start gap-2">
          <span className="text-lg mt-0.5">📋</span>
          <div>
            <p className="text-sm font-semibold text-green-dark mb-1">
              Правило Сезона 1
            </p>
            <p className="text-sm text-green-dark/80 leading-relaxed">
              Кооперация запрещена. Каждый фермер действует самостоятельно.
              Смотрим, что происходит с доходами, когда все конкурируют в
              одиночку.
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => goTo("roles")}
          className="px-5 py-2.5 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          ← Назад
        </button>
        <button
          onClick={() => goTo("season1")}
          className="flex-1 px-5 py-2.5 bg-green-mid hover:bg-green-dark text-white font-semibold rounded-xl text-sm transition-colors"
        >
          Начать Сезон 1 →
        </button>
      </div>
    </div>
  );
}
