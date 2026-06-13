import type { Language, TarotCardData } from '../../shared/tarotData';

export type IzuReflectionGroup =
  | 'Shadow Care'
  | 'Transition & Release'
  | 'Inner Listening'
  | 'Healing & Hope'
  | 'Choice & Alignment'
  | 'Grounding & Support'
  | 'Generic';

export interface IzuThreeCardReflection {
  group: IzuReflectionGroup;
  title: string;
  message: string;
}

type ReflectionGroup = {
  name: Exclude<IzuReflectionGroup, 'Generic'>;
  cardIds: ReadonlySet<number>;
  messages: Record<Language, string>;
};

const MIN_STRONG_MATCH_COUNT = 2;

// Array order defines the tie-break priority.
const REFLECTION_GROUPS: readonly ReflectionGroup[] = [
  {
    name: 'Shadow Care',
    cardIds: new Set([15, 18, 16, 13]),
    messages: {
      en: `Some things may not need an answer right away.
They may simply be asking to be seen with more gentleness.
If it still feels heavy, untangle it slowly.
For today, not judging yourself is already enough.`,
      th: `บางเรื่องอาจไม่ได้ต้องการคำตอบทันที
มันอาจแค่อยากให้เรามองมันอย่างอ่อนโยนขึ้น
ถ้ายังหนักอยู่ ค่อย ๆ แกะมันทีละนิดก็ได้
วันนี้แค่ไม่ตัดสินตัวเอง ก็พอแล้วนะ`,
    },
  },
  {
    name: 'Transition & Release',
    cardIds: new Set([13, 16, 10, 12, 20]),
    messages: {
      en: `Something may be quietly changing shape.
If something needs to be released, it does not have to happen all at once.
Breathe, soften, and take the next small step.
Let yourself move through this gently.`,
      th: `เหมือนมีบางอย่างกำลังค่อย ๆ เปลี่ยนรูปไป
ถ้าต้องปล่อยอะไรสักอย่าง ก็ไม่ต้องรีบปล่อยมันทั้งหมดในทีเดียว
ค่อย ๆ วาง ค่อย ๆ หายใจ
ให้ตัวเองผ่านช่วงนี้อย่างอ่อนโยนก็พอ`,
    },
  },
  {
    name: 'Inner Listening',
    cardIds: new Set([2, 9, 18, 12]),
    messages: {
      en: `These cards may be asking you to slow down.
Some answers do not become clear when they are rushed.
Give your heart a little quiet before choosing.
Truth can arrive softly too.`,
      th: `ไพ่ชุดนี้เหมือนชวนให้เราช้าลง
บางคำตอบอาจยังไม่อยากถูกเร่งให้ชัด
ลองให้ใจได้เงียบพอก่อนค่อยเลือกก็ได้
บางทีความจริงก็มาเบา ๆ แบบนั้นแหละ`,
    },
  },
  {
    name: 'Healing & Hope',
    cardIds: new Set([14, 17, 19, 21]),
    messages: {
      en: `There is a small light in this reading.
It may not be loud, but it is still real.
Let warmth return slowly.
You do not have to heal perfectly for anyone.`,
      th: `ไพ่ชุดนี้มีแสงเล็ก ๆ อยู่ในนั้น
อาจไม่ใช่ความหวังที่ดังมาก แต่ยังเป็นความหวังจริง ๆ
ค่อย ๆ ให้ใจได้กลับมาอุ่นขึ้นทีละนิด
ไม่ต้องรีบหายดีเพื่อใครเลย`,
    },
  },
  {
    name: 'Choice & Alignment',
    cardIds: new Set([6, 11, 7, 1]),
    messages: {
      en: `The answer may not be about the perfect path.
It may be about the path that keeps you close to yourself.
Choose from honesty, not pressure.
A small sincere step can still be powerful.`,
      th: `บางทีคำตอบอาจไม่ได้อยู่ที่ทางไหนดีที่สุด
แต่อยู่ที่ทางไหนทำให้เราไม่หลุดจากตัวเอง
ลองเลือกจากความจริงข้างใน ไม่ใช่จากแรงกดดัน
ก้าวเล็ก ๆ ที่ซื่อสัตย์ ก็มีพลังมากพอแล้ว`,
    },
  },
  {
    name: 'Grounding & Support',
    cardIds: new Set([4, 5, 8, 3]),
    messages: {
      en: `You do not have to fix everything at once.
Start by giving your heart one small place to rest.
A boundary, a pause, or someone safe may help.
You were not meant to carry everything alone.`,
      th: `ช่วงนี้อาจไม่ต้องแก้ทุกอย่างพร้อมกันก็ได้
ลองกลับมาจัดพื้นที่เล็ก ๆ ให้ใจได้พักก่อน
ขอบเขต การพัก หรือคนที่ไว้ใจ อาจช่วยประคองเราได้
เราไม่จำเป็นต้องแบกทุกอย่างคนเดียว`,
    },
  },
];

const GENERIC_MESSAGES: Record<Language, string> = {
  en: `These three cards feel like a small mirror for this moment.
You do not have to understand everything right away.
Notice what wants care, what wants space, and what feels true.
Let the reading stay with you gently.`,
  th: `ไพ่สามใบนี้เหมือนกระจกเล็ก ๆ ของตอนนี้
ไม่ต้องรีบแปลทุกอย่างให้ได้ทันที
ลองดูว่าอะไรอยากให้เราดูแล อะไรอยากได้พื้นที่
แล้วค่อย ๆ อยู่กับคำตอบนั้นก็พอ`,
};

const REFLECTION_TITLES: Record<Language, string> = {
  en: 'Izu whispers...',
  th: 'อีซึกระซิบว่า...',
};

export function getIzuThreeCardReflection(
  cards: readonly TarotCardData[],
  language: Language,
): IzuThreeCardReflection {
  let strongestGroup: ReflectionGroup | undefined;
  let strongestCount = 0;

  for (const group of REFLECTION_GROUPS) {
    const matchCount = cards.reduce(
      (count, card) => count + Number(group.cardIds.has(card.id)),
      0,
    );

    if (matchCount > strongestCount) {
      strongestGroup = group;
      strongestCount = matchCount;
    }
  }

  if (!strongestGroup || strongestCount < MIN_STRONG_MATCH_COUNT) {
    return {
      group: 'Generic',
      title: REFLECTION_TITLES[language],
      message: GENERIC_MESSAGES[language],
    };
  }

  return {
    group: strongestGroup.name,
    title: REFLECTION_TITLES[language],
    message: strongestGroup.messages[language],
  };
}
