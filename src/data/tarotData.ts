/**
 * tarotData.ts
 * Defines the 22 Major Arcana cards with their names, bilingual keywords, and interpretations.
 */

export type Language = 'en' | 'th';

export interface TarotCardData {
  id: number;
  name: string; // Stays in English at all times
  keywords: {
    en: string[];
    th: string[];
  };
  izuReflection: {
    en: string;
    th: string;
  };
  description: {
    en: string;
    th: string;
  };
}

export const MAJOR_ARCANA: TarotCardData[] = [
  {
    id: 0,
    name: "The Fool",
    keywords: {
      en: ["Beginnings", "Innocence", "Spontaneity"],
      th: ["การเริ่มต้นใหม่", "ความไร้เดียงสา", "ความเป็นธรรมชาติ"]
    },
    izuReflection: {
      en: "Every step into the unknown is an act of trust in yourself.",
      th: "ทุกก้าวเดินไปสู่สิ่งที่ไม่รู้ คือโอกาสที่คุณจะได้เชื่อมั่นในตัวเอง"
    },
    description: {
      en: "A new journey begins. Embrace the unknown with an open heart.",
      th: "การเดินทางครั้งใหม่กำลังเริ่มต้น เปิดใจรับสิ่งใหม่ ๆ ด้วยความพร้อมเรียนรู้"
    }
  },
  {
    id: 1,
    name: "The Magician",
    keywords: {
      en: ["Willpower", "Manifestation", "Skill"],
      th: ["พลังเจตจำนง", "การสรรสร้าง", "ทักษะความสามารถ"]
    },
    izuReflection: {
      en: "You already hold all the tools you need within you.",
      th: "คุณมีทรัพยากรและสิ่งสำคัญที่จำเป็นอยู่ภายในตัวเองเรียบร้อยแล้ว"
    },
    description: {
      en: "Your intentions have power. Focus your will and create.",
      th: "พลังแห่งความตั้งใจของคุณนั้นมีอยู่จริง ลองจดจ่อและลงมือสร้างสรรค์สิ่งดี ๆ"
    }
  },
  {
    id: 2,
    name: "The High Priestess",
    keywords: {
      en: ["Intuition", "Mystery", "Inner knowing"],
      th: ["สัญชาตญาณ", "ความลึกลับ", "ความรู้แจ้งภายใน"]
    },
    izuReflection: {
      en: "The answers you seek are already whispering inside you.",
      th: "คำตอบที่คุณกำลังมองหา อาจกำลังส่งเสียงกระซิบเบา ๆ อยู่ในใจคุณแล้ว"
    },
    description: {
      en: "Trust your inner wisdom. Something hidden will be revealed.",
      th: "ลองรับฟังเสียงเตือนและสัญชาตญาณข้างใน มีสิ่งสำคัญกำลังเผยให้คุณเห็น"
    }
  },
  {
    id: 3,
    name: "The Empress",
    keywords: {
      en: ["Abundance", "Nurturing", "Nature"],
      th: ["ความอุดมสมบูรณ์", "การฟูมฟัก", "ธรรมชาติ"]
    },
    izuReflection: {
      en: "You deserve to receive as generously as you give.",
      th: "คุณสมควรได้รับความรักและความดูแลเอาใจใส่ เช่นเดียวกับที่คุณมอบให้ผู้อื่น"
    },
    description: {
      en: "Creativity and growth flourish. Abundance surrounds you.",
      th: "ช่วงเวลาแห่งการเติบโตและการสร้างสรรค์ ความสมบูรณ์พร้อมอยู่รอบตัวคุณ"
    }
  },
  {
    id: 4,
    name: "The Emperor",
    keywords: {
      en: ["Authority", "Structure", "Stability"],
      th: ["ความเป็นผู้นำ", "โครงสร้าง", "ความมั่นคง"]
    },
    izuReflection: {
      en: "Boundaries set with love are an act of self-respect.",
      th: "การสร้างขอบเขตที่พอดีด้วยความรัก คือการให้เกียรติและเคารพตัวเอง"
    },
    description: {
      en: "Establish order. Lead with confidence and compassion.",
      th: "จัดระเบียบและวางรากฐานชีวิต นำพาด้วยความมั่นใจและเปี่ยมด้วยความเข้าใจ"
    }
  },
  {
    id: 5,
    name: "The Hierophant",
    keywords: {
      en: ["Tradition", "Guidance", "Wisdom"],
      th: ["ขนบธรรมเนียม", "การชี้แนะ", "ปัญญาญาณ"]
    },
    izuReflection: {
      en: "Sometimes the path walked by many holds a wisdom meant for you.",
      th: "ในบางครั้ง แนวทางที่สืบทอดกันมาก็อาจมีบทเรียนที่เหมาะกับคุณในเวลานี้"
    },
    description: {
      en: "Seek guidance from those who've walked this path before.",
      th: "มองหาคำแนะนำหรือเรียนรู้จากผู้มีประสบการณ์ เพื่อช่วยขยายมุมมองของคุณ"
    }
  },
  {
    id: 6,
    name: "The Lovers",
    keywords: {
      en: ["Union", "Choice", "Alignment"],
      th: ["การผสมผสาน", "การเลือก", "ความสอดคล้อง"]
    },
    izuReflection: {
      en: "The most important relationship is the one you have with yourself.",
      th: "ความสัมพันธ์ที่สำคัญที่สุด คือความเข้าใจและยอมรับในตัวตนของคุณเอง"
    },
    description: {
      en: "A meaningful choice awaits. Choose what aligns with your truth.",
      th: "มีทางเลือกสำคัญรออยู่ข้างหน้า ลองเลือกสิ่งที่สอดคล้องกับหัวใจและตัวตนของคุณ"
    }
  },
  {
    id: 7,
    name: "The Chariot",
    keywords: {
      en: ["Victory", "Determination", "Control"],
      th: ["ชัยชนะ", "ความมุ่งมั่น", "การควบคุม"]
    },
    izuReflection: {
      en: "Your focused heart can carry you through any storm.",
      th: "พลังใจที่จดจ่อของคุณ จะช่วยพาให้คุณผ่านพ้นพายุและอุปสรรคไปได้"
    },
    description: {
      en: "Move forward with determination. Victory comes to the resolute.",
      th: "ขับเคลื่อนไปข้างหน้าด้วยความมุ่งมั่น ชัยชนะและทางออกรอคอยผู้ไม่ยอมแพ้"
    }
  },
  {
    id: 8,
    name: "Strength",
    keywords: {
      en: ["Courage", "Patience", "Compassion"],
      th: ["ความกล้าหาญ", "ความอดทน", "ความเมตตา"]
    },
    izuReflection: {
      en: "Gentleness is not weakness — it is the deepest form of strength.",
      th: "ความอ่อนโยนไม่ได้แปลว่าอ่อนแอ แต่เป็นพลังที่นุ่มนวลและเข้มแข็งที่สุด"
    },
    description: {
      en: "Inner strength and quiet courage will see you through.",
      th: "ความเข้มแข็งภายในและความอดทนอย่างเข้าใจ จะช่วยประคับประคองคุณไปได้"
    }
  },
  {
    id: 9,
    name: "The Hermit",
    keywords: {
      en: ["Solitude", "Reflection", "Guidance"],
      th: ["การปลีกวิเวก", "การทบทวนตัวเอง", "ดวงประทีปนำทาง"]
    },
    izuReflection: {
      en: "In stillness, you find the light that guides you home.",
      th: "ภายใต้ความสงบนิ่ง คุณจะพบแสงสว่างที่ช่วยนำทางใจของคุณกลับบ้าน"
    },
    description: {
      en: "A period of introspection will illuminate your path.",
      th: "การใช้เวลาอยู่กับตัวเองเงียบ ๆ จะช่วยตอบคำถามที่ค้างคาใจให้ชัดเจนขึ้น"
    }
  },
  {
    id: 10,
    name: "Wheel of Fortune",
    keywords: {
      en: ["Cycles", "Fate", "Change"],
      th: ["วัฏจักร", "โชคชะตา", "ความเปลี่ยนแปลง"]
    },
    izuReflection: {
      en: "Even when the wheel turns hard, you are still at the center.",
      th: "แม้ในวันที่ชีวิตหมุนเปลี่ยนอย่างรวดเร็ว คุณก็ยังมั่นคงอยู่ที่ศูนย์กลางของใจตัวเองได้"
    },
    description: {
      en: "Change is coming. Trust in the natural cycles of life.",
      th: "ทุกสิ่งมีจังหวะเวลาของมัน ลองลื่นไหลไปกับกระแสแห่งความเปลี่ยนแปลงรอบตัว"
    }
  },
  {
    id: 11,
    name: "Justice",
    keywords: {
      en: ["Truth", "Fairness", "Law"],
      th: ["ความจริง", "ความยุติธรรม", "ความสมดุล"]
    },
    izuReflection: {
      en: "Honesty with yourself is the foundation of all healing.",
      th: "การยอมรับความจริงอย่างตรงไปตรงมากับตัวเอง คือจุดเริ่มต้นของการเยียวยาที่ดี"
    },
    description: {
      en: "Cause and effect are in balance. Act with integrity.",
      th: "สิ่งต่าง ๆ กำลังปรับสมดุล ทำสิ่งที่คุณเชื่อว่าถูกต้องและซื่อสัตย์ต่อใจ"
    }
  },
  {
    id: 12,
    name: "The Hanged One",
    keywords: {
      en: ["Surrender", "Pause", "New Perspective"],
      th: ["การปล่อยวาง", "การหยุดพัก", "มุมมองใหม่"]
    },
    izuReflection: {
      en: "Letting go is not losing — it's making space for something truer.",
      th: "การปล่อยวางไม่ใช่ความพ่ายแพ้ แต่เป็นการเปิดพื้นที่ให้สิ่งที่ดีกว่าได้เข้ามา"
    },
    description: {
      en: "Pause and gain a new perspective. Surrender leads to insight.",
      th: "ลองหยุดนิ่งและมองจากมุมกลับ บางครั้งคำตอบอาจซ่อนอยู่ในมุมมองที่คุณคาดไม่ถึง"
    }
  },
  {
    id: 13,
    name: "Death",
    keywords: {
      en: ["Transformation", "Endings", "Renewal"],
      th: ["การเปลี่ยนผ่าน", "การสิ้นสุด", "การเกิดใหม่"]
    },
    izuReflection: {
      en: "What ends makes room for who you are becoming.",
      th: "สิ่งที่สิ้นสุดลงกำลังช่วยเคลียร์ทางให้ตัวตนใหม่ของคุณได้เติบโต"
    },
    description: {
      en: "Transformation is underway. An ending brings beautiful renewal.",
      th: "การยอมรับความเปลี่ยนแปลงและการจากลา จะนำพาการเริ่มต้นที่งดงามกลับมา"
    }
  },
  {
    id: 14,
    name: "Temperance",
    keywords: {
      en: ["Balance", "Moderation", "Harmony"],
      th: ["ความพอดี", "ความพอประมาณ", "ความกลมเกลียว"]
    },
    izuReflection: {
      en: "Peace is found when you walk gently between your extremes.",
      th: "ความสงบใจมักจะเกิดขึ้นเมื่อคุณเรียนรู้ที่จะเดินบนทางสายกลางอย่างพอเหมาะ"
    },
    description: {
      en: "Find balance and harmony. Patience blends everything beautifully.",
      th: "ลองปรับสมดุลและผสานความขัดแย้ง ความอดทนจะค่อย ๆ นำพาทุกสิ่งลงตัว"
    }
  },
  {
    id: 15,
    name: "The Devil",
    keywords: {
      en: ["Shadow", "Attachment", "Freedom"],
      th: ["ด้านมืดในใจ", "ความผูกมัด", "เสรีภาพ"]
    },
    izuReflection: {
      en: "Naming what binds you is the first breath of freedom.",
      th: "การตระหนักรู้และยอมรับสิ่งทีพันธนาการคุณอยู่ คือก้าวแรกสู่การเป็นอิสระ"
    },
    description: {
      en: "Examine what holds you back. Liberation begins with awareness.",
      th: "สำรวจนิสัยหรือกรอบความคิดที่จำกัดตัวคุณไว้ การรับรู้นำพาไปสู่หนทางแก้ไข"
    }
  },
  {
    id: 16,
    name: "The Tower",
    keywords: {
      en: ["Upheaval", "Revelation", "Breakthrough"],
      th: ["การเปลี่ยนแปลงกะทันหัน", "การค้นพบความจริง", "การทลายกำแพง"]
    },
    izuReflection: {
      en: "Sometimes things must fall apart so you can finally see what was real.",
      th: "ในบางครั้ง โครงสร้างเก่า ๆ ก็ต้องทลายลงเพื่อให้คุณได้เห็นความจริงที่มั่นคงกว่า"
    },
    description: {
      en: "Sudden change clears what no longer serves. Truth emerges.",
      th: "ความเปลี่ยนแปลงที่คาดไม่ถึงช่วยชะล้างสิ่งล้าสมัย เพื่อต้อนรับสัจธรรมที่แท้จริง"
    }
  },
  {
    id: 17,
    name: "The Star",
    keywords: {
      en: ["Hope", "Healing", "Serenity"],
      th: ["ความหวัง", "การเยียวยา", "ความสงบสุข"]
    },
    izuReflection: {
      en: "Even in your darkest hour, you are a light returning to itself.",
      th: "แม้ในคืนที่มืดมิดที่สุด ตัวตนของคุณก็ยังคงเป็นดั่งดวงดาวที่ส่องประกายในตัวเอง"
    },
    description: {
      en: "Hope and healing shine upon you. Trust in the universe.",
      th: "ขอให้มีความหวังและการเยียวยาใจ ค่ำคืนนี้กำลังจะผ่านพ้นไปสู่เช้าวันใหม่"
    }
  },
  {
    id: 18,
    name: "The Moon",
    keywords: {
      en: ["Illusion", "Fear", "Subconscious"],
      th: ["ภาพลวงตา", "ความกังวล", "จิตใต้สำนึก"]
    },
    izuReflection: {
      en: "Your fears are asking to be met with curiosity, not judgment.",
      th: "ความกังวลในใจคุณอาจเพียงต้องการให้คุณเข้าไปรับฟังด้วยความเข้าใจ ไม่ใช่ตัดสิน"
    },
    description: {
      en: "Navigate the shadows with trust. Illusions will fade with clarity.",
      th: "ยอมรับความไม่แน่นอนด้วยความอ่อนโยน หมอกแห่งความกังวลจะจางลงเมื่อใจคุณสงบ"
    }
  },
  {
    id: 19,
    name: "The Sun",
    keywords: {
      en: ["Joy", "Success", "Vitality"],
      th: ["ความสุขสันต์", "ความสำเร็จ", "พลังชีวิต"]
    },
    izuReflection: {
      en: "You are allowed to feel this good. Joy is not borrowed — it's yours.",
      th: "คุณได้รับอนุญาตให้มีความสุขได้อย่างเต็มที่ ความเบิกบานนี้เป็นของคุณแล้ว"
    },
    description: {
      en: "Radiant joy and success fill your path. Celebrate fully.",
      th: "แสงแดดอันอบอุ่นและพลังบวกกำลังส่องสว่างบนทางเดินของคุณ มาร่วมเฉลิมฉลองชีวิตกัน"
    }
  },
  {
    id: 20,
    name: "Judgement",
    keywords: {
      en: ["Awakening", "Renewal", "Calling"],
      th: ["การตื่นรู้", "การปรับปรุงใหม่", "เสียงเพรียกภายใน"]
    },
    izuReflection: {
      en: "Your past does not define you — your willingness to grow does.",
      th: "อดีตไม่ได้ชี้วัดคุณค่าของคุณ แต่เป็นความพร้อมที่จะเรียนรู้และเติบโตในปัจจุบันต่างหาก"
    },
    description: {
      en: "A calling awakens within. Rise and embrace your true self.",
      th: "เสียงเพรียกแห่งความเปลี่ยนแปลงดังขึ้นภายใน ถึงเวลาปลดแอกและยอมรับความจริง"
    }
  },
  {
    id: 21,
    name: "The World",
    keywords: {
      en: ["Completion", "Integration", "Wholeness"],
      th: ["ความเสร็จสมบูรณ์", "การหลอมรวม", "ความครบถ้วนสมบูรณ์"]
    },
    izuReflection: {
      en: "You have arrived, exactly as you are, exactly where you need to be.",
      th: "คุณได้มาถึงจุดที่เป็นตัวคุณอย่างสมบูรณ์แบบ ในพื้นที่และเวลาที่เหมาะสมที่สุดแล้ว"
    },
    description: {
      en: "A cycle completes in wholeness. You have everything you need.",
      th: "วัฏจักรเดิมลุล่วงไปด้วยดีด้วยความเข้าใจและความภาคภูมิใจในสิ่งที่คุณเป็น"
    }
  }
];
