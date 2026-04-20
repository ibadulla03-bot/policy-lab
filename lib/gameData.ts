export type Crop = "Томаты" | "Огурцы" | "Перец";

export interface Role {
  id: number;
  name: string;
  shortName: string;
  initials: string;
  archetype: string;
  crop: Crop;
  ha: number;
  bg: string;
  tc: string;
  constraint: string;
  impact: string;
}

export interface CrisisCard {
  id: number;
  title: string;
  text: string;
  coopYieldMult: number;
  soloYieldMult: number;
}

export const roles: Role[] = [
  {
    id: 0,
    name: "Асель Сейткали",
    shortName: "Асель",
    initials: "АС",
    archetype: "Предприниматель",
    crop: "Томаты",
    ha: 3,
    bg: "#c8eed8",
    tc: "#0d5c3a",
    constraint:
      "У вас есть неформальный долг перед местным перекупщиком (Ерланом), который покупает ваши томаты эксклюзивно. Если вы вступите в кооператив и будете продавать через него, Ерлан перестанет давать вам удобрения в кредит. Вы зависите от этого кредита в начале каждого сезона.",
    impact:
      "Вы хотите кооперироваться, но не можете взять на себя обязательство по совместным продажам, если группа не согласится позволить вам в первый год соблюдать существующие договорённости с Ерланом.",
  },
  {
    id: 1,
    name: "Нуржан Мамытов",
    shortName: "Нуржан",
    initials: "НМ",
    archetype: "Осторожный",
    crop: "Огурцы",
    ha: 2,
    bg: "#faecc8",
    tc: "#8a5a00",
    constraint:
      "Вы не можете позволить себе взнос за регистрацию кооператива (ваша доля составит 16 000 ₸). Вам стыдно это признать. В прошлом сезоне вы понесли убытки из-за нашествия вредителей.",
    impact:
      "Вы хотите вступить, но будете тянуть время или придумывать отговорки, пока кто-то не предложит оплатить взнос из первой субсидии кооператива — не заранее.",
  },
  {
    id: 2,
    name: "Гульнар Джаксыбекова",
    shortName: "Гульнар",
    initials: "ГД",
    archetype: "Семьянин",
    crop: "Перец",
    ha: 2,
    bg: "#fcddd8",
    tc: "#8a2000",
    constraint:
      "Ваш муж категорически против вступления в любой кооператив. Он считает, что другие фермеры воспользуются вами. Он пригрозил продать землю, если вы подпишете какое-либо коллективное соглашение.",
    impact:
      "Вы можете участвовать в переговорах, но не можете официально взять на себя обязательство без разговора с мужем. Возможно, вы согласитесь в принципе, но будете затягивать подписание — если только кто-то не предложит встретиться с вашей семьёй и объяснить условия.",
  },
  {
    id: 3,
    name: "Канат Бекжанов",
    shortName: "Канат",
    initials: "КБ",
    archetype: "Амбициозный",
    crop: "Томаты",
    ha: 4,
    bg: "#d0e4fa",
    tc: "#1a4a8a",
    constraint:
      "Два года назад у вас был серьёзный конфликт с Аселью (Фермер 1) из-за границы земельного участка. Вопрос так и не был полностью урегулирован. С другими фермерами вы готовы сотрудничать — но не с Аселью в одной группе.",
    impact:
      "Вы попытаетесь создать кооператив без Аселы — или настоите на официальном посредничестве перед тем, как включить её. Игра решится, только если группа прямо обсудит этот конфликт.",
  },
  {
    id: 4,
    name: "Зарина Ахметова",
    shortName: "Зарина",
    initials: "ЗА",
    archetype: "Новатор",
    crop: "Огурцы",
    ha: 3,
    bg: "#e8e0fa",
    tc: "#3a2080",
    constraint:
      "Вам интересна кооперация, но вы хотите в будущем перейти с огурцов на клубнику — более доходную, но рискованную культуру. Вы опасаетесь, что кооператив навсегда привяжет вас к огурцам.",
    impact:
      "Вы вступите только если устав кооператива предусматривает возможность менять культуру с уведомлением за 1 сезон. Это разумное условие — но кто-то должен о нём подумать.",
  },
];

export const crisisCards: CrisisCard[] = [
  {
    id: 0,
    title: "Угроза ранних заморозков",
    text: "Синоптики предупреждают о ранних заморозках. Члены кооператива с общим отапливаемым хранилищем теряют 10% урожая. Одиночные фермеры без хранения теряют 35%.",
    coopYieldMult: 0.9,
    soloYieldMult: 0.65,
  },
  {
    id: 1,
    title: "Проверка субсидий акиматом",
    text: "Акимат проводит аудит субсидий. Только зарегистрированные кооперативы получают 500 000 ₸ в этом сезоне. Незарегистрированным группам предложено подать заявку заново в следующем году.",
    coopYieldMult: 1.0,
    soloYieldMult: 1.0,
  },
  {
    id: 2,
    title: "Нехватка воды",
    text: "Ирригационный канал работает на 60% от мощности в течение 3 недель. Члены кооператива с севооборотом теряют меньше (−15% урожая). Одиночные фермеры: −30%.",
    coopYieldMult: 0.85,
    soloYieldMult: 0.7,
  },
  {
    id: 3,
    title: "Покупатель из Атырау отменяет заказ",
    text: "Крупный покупатель из Атырау сокращает заказ вдвое из-за логистических проблем. Члены кооператива делят потери поровну. Одиночные фермеры, зависевшие от этого покупателя, теряют весь заказ.",
    coopYieldMult: 1.0,
    soloYieldMult: 1.0,
  },
];

export const S1_PRICES: Record<Crop, number> = {
  Томаты: 140,
  Огурцы: 200,
  Перец: 260,
};

export const S3_COOP_PRICES: Record<Crop, number> = {
  Томаты: 200,
  Огурцы: 240,
  Перец: 280,
};

export const YIELD_PER_HA = 8000;
export const STORAGE_SOLO = 15000;
export const STORAGE_COOP = 6000;
export const SUBSIDY_TOTAL = 500000;
export const MIN_COOP_MEMBERS = 3;

export function fmt(n: number): string {
  return Math.round(n).toLocaleString("ru-RU") + " ₸";
}

export function calcSeason1() {
  return roles.map((r) => {
    const gross = S1_PRICES[r.crop] * YIELD_PER_HA * r.ha;
    const net = gross - STORAGE_SOLO;
    return { ...r, gross, net, storage: STORAGE_SOLO, subsidy: 0 };
  });
}

export interface Season3Result {
  id: number;
  name: string;
  shortName: string;
  initials: string;
  bg: string;
  tc: string;
  crop: Crop;
  ha: number;
  isCoop: boolean;
  gross: number;
  storage: number;
  subsidy: number;
  net: number;
}

export function calcSeason3(
  memberIds: number[],
  crisis: CrisisCard
): Season3Result[] {
  const memberSet = new Set(memberIds);
  const isValidCoop = memberIds.length >= MIN_COOP_MEMBERS;

  return roles.map((r) => {
    const isCoop = memberSet.has(r.id) && isValidCoop;
    const price = isCoop ? S3_COOP_PRICES[r.crop] : S1_PRICES[r.crop];
    const yieldMult = isCoop ? crisis.coopYieldMult : crisis.soloYieldMult;
    const kg = Math.round(YIELD_PER_HA * yieldMult) * r.ha;
    const gross = price * kg;
    const storage = isCoop ? STORAGE_COOP : STORAGE_SOLO;
    const subsidy =
      isCoop && isValidCoop ? Math.round(SUBSIDY_TOTAL / memberIds.length) : 0;
    const net = gross - storage + subsidy;
    return {
      id: r.id,
      name: r.name,
      shortName: r.shortName,
      initials: r.initials,
      bg: r.bg,
      tc: r.tc,
      crop: r.crop,
      ha: r.ha,
      isCoop,
      gross,
      storage,
      subsidy,
      net,
    };
  });
}
