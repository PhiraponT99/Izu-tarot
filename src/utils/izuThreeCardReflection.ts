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
      en: `Something in this reading may be asking for gentleness, not judgement.
If a feeling or pattern feels heavy, you do not have to fight it all at once.
Just noticing it with honesty is already a quiet kind of healing.
Stay close to yourself while you untangle what has been holding you.`,
      th: `ไพ่ชุดนี้เหมือนกำลังบอกว่า บางอย่างต้องการความอ่อนโยนมากกว่าการตัดสิน
ถ้าความรู้สึกหรือรูปแบบบางอย่างมันหนัก ไม่จำเป็นต้องสู้กับมันทั้งหมดในทีเดียว
แค่เริ่มมองเห็นมันอย่างซื่อสัตย์ ก็เป็นการเยียวยาแบบเงียบ ๆ แล้ว
ค่อย ๆ อยู่ข้างตัวเอง ระหว่างแกะสิ่งที่เคยรั้งเราไว้`,
    },
  },
  {
    name: 'Transition & Release',
    cardIds: new Set([13, 16, 10, 12, 20]),
    messages: {
      en: `This reading feels like a soft threshold.
Something may be changing, ending, or asking to be released with care.
You do not need to understand the whole transformation today.
Let one honest breath, one small step, be enough for now.`,
      th: `ไพ่ชุดนี้ให้ความรู้สึกเหมือนเรายืนอยู่ตรงขอบของการเปลี่ยนผ่าน
บางอย่างอาจกำลังเปลี่ยน จบลง หรือขอให้เราค่อย ๆ ปล่อยมันด้วยความอ่อนโยน
ไม่จำเป็นต้องเข้าใจการเปลี่ยนแปลงทั้งหมดในวันนี้
แค่หายใจอย่างจริงใจหนึ่งครั้ง แล้วค่อยก้าวเล็ก ๆ ก็พอ`,
    },
  },
  {
    name: 'Inner Listening',
    cardIds: new Set([2, 9, 18, 12]),
    messages: {
      en: `These cards invite you to slow down and listen inwardly.
There may be a quiet answer beneath the noise, but it may not arrive by force.
Give yourself permission to pause before deciding.
Some truths become clearer when the heart feels safe.`,
      th: `ไพ่ชุดนี้ชวนให้เราช้าลง แล้วฟังเสียงข้างในมากขึ้น
อาจมีคำตอบเงียบ ๆ อยู่ใต้ความวุ่นวาย แต่มันอาจไม่มาเมื่อเราฝืนเร่ง
ให้เวลาตัวเองได้หยุดก่อนตัดสินใจ
บางความจริงจะชัดขึ้น เมื่อหัวใจรู้สึกปลอดภัยพอ`,
    },
  },
  {
    name: 'Healing & Hope',
    cardIds: new Set([14, 17, 19, 21]),
    messages: {
      en: `This reading carries a small restoring light.
Something in you may be learning how to trust warmth again.
Let healing be gradual, not perfect.
Even a tiny sign of hope is still real.`,
      th: `ไพ่ชุดนี้มีแสงเล็ก ๆ ของการเยียวยาอยู่ในนั้น
บางส่วนในตัวเราอาจกำลังค่อย ๆ เรียนรู้ที่จะไว้วางใจความอบอุ่นอีกครั้ง
ให้การรักษาเป็นเรื่องค่อยเป็นค่อยไป ไม่ต้องสมบูรณ์แบบ
แม้ความหวังเล็กมาก มันก็ยังเป็นความหวังจริง ๆ`,
    },
  },
  {
    name: 'Choice & Alignment',
    cardIds: new Set([6, 11, 7, 1]),
    messages: {
      en: `These cards bring attention to what feels honest inside you.
The next step may not need to be loud or dramatic.
Choose what feels steady, kind, and aligned with who you are becoming.
A gentle choice can still be a powerful one.`,
      th: `ไพ่ชุดนี้พาเรากลับมามองว่า อะไรคือสิ่งที่จริงกับใจเรา
ก้าวถัดไปไม่จำเป็นต้องดังหรือยิ่งใหญ่
ลองเลือกสิ่งที่มั่นคง อ่อนโยน และไม่พาเราออกห่างจากตัวเอง
การเลือกอย่างเบา ๆ ก็มีพลังได้เหมือนกัน`,
    },
  },
  {
    name: 'Grounding & Support',
    cardIds: new Set([4, 5, 8, 3]),
    messages: {
      en: `This reading asks you to care for your foundation.
A little structure, rest, or support may help your heart feel safer.
You do not have to hold everything alone.
Start with one small thing that brings you back to yourself.`,
      th: `ไพ่ชุดนี้ชวนให้เรากลับมาดูแลฐานของตัวเอง
โครงสร้างเล็ก ๆ การพัก หรือการขอแรงสนับสนุน อาจช่วยให้ใจรู้สึกปลอดภัยขึ้น
เราไม่จำเป็นต้องแบกทุกอย่างไว้คนเดียว
เริ่มจากสิ่งเล็ก ๆ ที่พาเรากลับมาอยู่กับตัวเองก็พอ`,
    },
  },
];

const GENERIC_MESSAGES: Record<Language, string> = {
  en: `These three cards feel like a small mirror for this moment.
You do not need to solve everything right away.
Notice what wants care, what wants space, and what feels quietly true.
Let this reading stay with you gently.`,
  th: `ไพ่สามใบนี้เหมือนกระจกเล็ก ๆ ของช่วงเวลานี้
เราไม่จำเป็นต้องแก้ทุกอย่างให้ได้ทันที
ลองสังเกตว่าอะไรต้องการการดูแล อะไรต้องการพื้นที่ และอะไรที่รู้สึกจริงอย่างเงียบ ๆ
ให้ reading นี้อยู่กับเราอย่างอ่อนโยนก็พอ`,
};

const REFLECTION_TITLES: Record<Language, string> = {
  en: 'Izu Reflection',
  th: 'ข้อความจากอีซึ',
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
