/**
 * Shared, runtime-safe tarot data used by the frontend and Vercel API.
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
      th: ["การเริ่มต้น", "ใจที่เปิดกว้าง", "ความเป็นธรรมชาติ"]
    },
    izuReflection: {
      en: "Every step into the unknown is an act of trust in yourself.",
      th: "ทุกก้าวสู่สิ่งที่ยังไม่รู้ อาจชวนให้คุณค่อย ๆ ไว้ใจตัวเองมากขึ้น"
    },
    description: {
      en: "A new journey begins. Embrace the unknown with an open heart.",
      th: "วันนี้อาจเหมาะกับการเริ่มต้นบางอย่าง ลองเปิดใจและค่อย ๆ เรียนรู้ระหว่างทาง"
    }
  },
  {
    id: 1,
    name: "The Magician",
    keywords: {
      en: ["Willpower", "Manifestation", "Skill"],
      th: ["ความตั้งใจ", "การสร้างสรรค์", "ศักยภาพ"]
    },
    izuReflection: {
      en: "You already hold all the tools you need within you.",
      th: "สิ่งที่คุณต้องการอาจมีอยู่ในตัวคุณมากกว่าที่คิด ลองหยิบมันมาใช้อย่างมั่นใจ"
    },
    description: {
      en: "Your intentions have power. Focus your will and create.",
      th: "ความตั้งใจของคุณมีพลัง ลองเลือกสิ่งสำคัญแล้วค่อย ๆ ลงมือทำให้เป็นรูปเป็นร่าง"
    }
  },
  {
    id: 2,
    name: "The High Priestess",
    keywords: {
      en: ["Intuition", "Mystery", "Inner knowing"],
      th: ["สัญชาตญาณ", "ความลึกลับ", "เสียงข้างใน"]
    },
    izuReflection: {
      en: "The answers you seek are already whispering inside you.",
      th: "คำตอบที่คุณตามหาอาจกำลังกระซิบอยู่ข้างใน ลองให้พื้นที่กับความเงียบสักครู่"
    },
    description: {
      en: "Trust your inner wisdom. Something hidden will be revealed.",
      th: "ลองฟังสัญชาตญาณของตัวเอง บางคำตอบอาจค่อย ๆ ชัดขึ้นเมื่อคุณไม่เร่งรีบ"
    }
  },
  {
    id: 3,
    name: "The Empress",
    keywords: {
      en: ["Abundance", "Nurturing", "Nature"],
      th: ["ความอุดมสมบูรณ์", "การดูแล", "การเติบโต"]
    },
    izuReflection: {
      en: "You deserve to receive as generously as you give.",
      th: "คุณคู่ควรกับความรักและการดูแล เช่นเดียวกับที่คุณมอบสิ่งเหล่านั้นให้คนอื่น"
    },
    description: {
      en: "Creativity and growth flourish. Abundance surrounds you.",
      th: "สิ่งที่คุณดูแลอาจกำลังเติบโต ลองเปิดรับความอ่อนโยนและความสร้างสรรค์รอบตัว"
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
      th: "การวางขอบเขตอย่างอ่อนโยน คือวิธีหนึ่งในการเคารพและดูแลตัวเอง"
    },
    description: {
      en: "Establish order. Lead with confidence and compassion.",
      th: "วันนี้อาจเหมาะกับการจัดระเบียบสิ่งสำคัญ และนำทางด้วยความมั่นคงที่ไม่แข็งกระด้าง"
    }
  },
  {
    id: 5,
    name: "The Hierophant",
    keywords: {
      en: ["Tradition", "Guidance", "Wisdom"],
      th: ["ธรรมเนียม", "คำแนะนำ", "บทเรียน"]
    },
    izuReflection: {
      en: "Sometimes the path walked by many holds a wisdom meant for you.",
      th: "บางครั้งบทเรียนจากคนที่เคยผ่านมาก่อน อาจช่วยให้คุณเห็นทางของตัวเองชัดขึ้น"
    },
    description: {
      en: "Seek guidance from those who've walked this path before.",
      th: "ลองเปิดใจรับคำแนะนำจากคนที่ไว้ใจ แล้วเลือกเฉพาะสิ่งที่สอดคล้องกับคุณ"
    }
  },
  {
    id: 6,
    name: "The Lovers",
    keywords: {
      en: ["Union", "Choice", "Alignment"],
      th: ["ความสัมพันธ์", "ทางเลือก", "ความสอดคล้อง"]
    },
    izuReflection: {
      en: "The most important relationship is the one you have with yourself.",
      th: "ความสัมพันธ์กับตัวเองคือพื้นฐานสำคัญ ลองฟังทั้งความต้องการและขอบเขตของใจ"
    },
    description: {
      en: "A meaningful choice awaits. Choose what aligns with your truth.",
      th: "หากกำลังลังเล ลองเลือกสิ่งที่ซื่อตรงกับคุณค่าและความรู้สึกข้างใน"
    }
  },
  {
    id: 7,
    name: "The Chariot",
    keywords: {
      en: ["Victory", "Determination", "Control"],
      th: ["ความก้าวหน้า", "ความมุ่งมั่น", "การกำกับทิศทาง"]
    },
    izuReflection: {
      en: "Your focused heart can carry you through any storm.",
      th: "เมื่อใจและทิศทางไปด้วยกัน คุณอาจก้าวผ่านความท้าทายได้อย่างมั่นคงขึ้น"
    },
    description: {
      en: "Move forward with determination. Victory comes to the resolute.",
      th: "ค่อย ๆ เดินหน้าอย่างมีเป้าหมาย คุณไม่จำเป็นต้องเร่ง แค่รักษาทิศทางของตัวเองไว้"
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
      th: "ความอ่อนโยนไม่ใช่ความอ่อนแอ แต่อาจเป็นพลังที่มั่นคงที่สุดของคุณ"
    },
    description: {
      en: "Inner strength and quiet courage will see you through.",
      th: "ลองรับมือกับสิ่งตรงหน้าด้วยความนิ่งและเมตตา พลังของคุณไม่จำเป็นต้องเสียงดัง"
    }
  },
  {
    id: 9,
    name: "The Hermit",
    keywords: {
      en: ["Solitude", "Reflection", "Guidance"],
      th: ["เวลาส่วนตัว", "การทบทวน", "แสงนำทาง"]
    },
    izuReflection: {
      en: "In stillness, you find the light that guides you home.",
      th: "ในความเงียบ คุณอาจพบแสงเล็ก ๆ ที่พาใจกลับมาใกล้ตัวเองอีกครั้ง"
    },
    description: {
      en: "A period of introspection will illuminate your path.",
      th: "ลองเว้นพื้นที่ให้ตัวเองได้ทบทวน บางคำตอบอาจชัดขึ้นเมื่อใจสงบลง"
    }
  },
  {
    id: 10,
    name: "Wheel of Fortune",
    keywords: {
      en: ["Cycles", "Fate", "Change"],
      th: ["วัฏจักร", "จังหวะชีวิต", "ความเปลี่ยนแปลง"]
    },
    izuReflection: {
      en: "Even when the wheel turns hard, you are still at the center.",
      th: "แม้หลายอย่างกำลังเปลี่ยน คุณยังกลับมายืนตรงกลางใจของตัวเองได้เสมอ"
    },
    description: {
      en: "Change is coming. Trust in the natural cycles of life.",
      th: "ชีวิตมีจังหวะขึ้นลงของมัน ลองปรับตัวกับความเปลี่ยนแปลงโดยไม่กดดันตัวเอง"
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
      th: "การซื่อตรงกับความรู้สึกของตัวเอง อาจเป็นจุดเริ่มต้นของการเยียวยา"
    },
    description: {
      en: "Cause and effect are in balance. Act with integrity.",
      th: "ลองมองสถานการณ์อย่างรอบด้าน แล้วเลือกสิ่งที่ยุติธรรมทั้งกับตัวเองและผู้อื่น"
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
      th: "การปล่อยวางไม่ใช่ความพ่ายแพ้ แต่อาจเป็นการเปิดพื้นที่ให้สิ่งที่จริงใจกว่า"
    },
    description: {
      en: "Pause and gain a new perspective. Surrender leads to insight.",
      th: "ลองพักและมองจากอีกมุม บางคำตอบอาจปรากฏเมื่อคุณยอมชะลอลง"
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
      th: "สิ่งที่กำลังจบลง อาจกำลังเปิดพื้นที่ให้ตัวตนอีกแบบของคุณได้เติบโต"
    },
    description: {
      en: "Transformation is underway. An ending brings beautiful renewal.",
      th: "บางช่วงอาจกำลังเปลี่ยนผ่าน ลองค่อย ๆ บอกลาสิ่งเดิมและเปิดรับการเริ่มต้นใหม่"
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
      th: "ความสงบอาจเกิดขึ้นเมื่อคุณค่อย ๆ หาจุดพอดีระหว่างสิ่งที่ต่างกัน"
    },
    description: {
      en: "Find balance and harmony. Patience blends everything beautifully.",
      th: "ลองค่อย ๆ ปรับจังหวะให้พอดี ความกลมกลืนไม่จำเป็นต้องเกิดขึ้นในทันที"
    }
  },
  {
    id: 15,
    name: "The Devil",
    keywords: {
      en: ["Shadow", "Attachment", "Freedom"],
      th: ["เงาในใจ", "ความยึดติด", "อิสรภาพ"]
    },
    izuReflection: {
      en: "Naming what binds you is the first breath of freedom.",
      th: "การมองเห็นสิ่งที่รั้งคุณไว้โดยไม่ตัดสินตัวเอง คือก้าวแรกของการคลายออก"
    },
    description: {
      en: "Examine what holds you back. Liberation begins with awareness.",
      th: "ลองสังเกตสิ่งที่ทำให้คุณรู้สึกติดอยู่ การรับรู้อย่างอ่อนโยนอาจเปิดทางเลือกใหม่"
    }
  },
  {
    id: 16,
    name: "The Tower",
    keywords: {
      en: ["Upheaval", "Revelation", "Breakthrough"],
      th: ["การสั่นคลอน", "ความจริงที่ปรากฏ", "การเปลี่ยนผ่าน"]
    },
    izuReflection: {
      en: "Sometimes things must fall apart so you can finally see what was real.",
      th: "เมื่อสิ่งเดิมสั่นคลอน คุณอาจได้เห็นว่าอะไรคือสิ่งสำคัญและจริงแท้สำหรับคุณ"
    },
    description: {
      en: "Sudden change clears what no longer serves. Truth emerges.",
      th: "ความเปลี่ยนแปลงอาจทำให้ไม่สบายใจ ลองค่อย ๆ มองว่าสิ่งใดไม่เหมาะกับคุณแล้ว"
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
      th: "แม้ในคืนที่มืด คุณยังมีแสงเล็ก ๆ ในตัวเองที่ค่อย ๆ พากลับมาหาความหวัง"
    },
    description: {
      en: "Hope and healing shine upon you. Trust in the universe.",
      th: "วันนี้อาจเป็นจังหวะให้คุณพักใจ เติมความหวัง และเชื่อในการฟื้นตัวทีละน้อย"
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
      th: "ความกังวลอาจกำลังขอให้คุณรับฟังด้วยความสงสัยใคร่รู้ แทนการตัดสินตัวเอง"
    },
    description: {
      en: "Navigate the shadows with trust. Illusions will fade with clarity.",
      th: "เมื่อทุกอย่างยังไม่ชัด ลองอยู่กับความไม่แน่นอนอย่างอ่อนโยนและค่อย ๆ สังเกต"
    }
  },
  {
    id: 19,
    name: "The Sun",
    keywords: {
      en: ["Joy", "Success", "Vitality"],
      th: ["ความเบิกบาน", "ความสำเร็จ", "พลังชีวิต"]
    },
    izuReflection: {
      en: "You are allowed to feel this good. Joy is not borrowed — it's yours.",
      th: "คุณอนุญาตให้ตัวเองมีความสุขได้ ความเบิกบานนี้ไม่จำเป็นต้องมีเงื่อนไข"
    },
    description: {
      en: "Radiant joy and success fill your path. Celebrate fully.",
      th: "ลองเปิดรับความสุขที่อยู่ตรงหน้า และชื่นชมสิ่งเล็ก ๆ ที่เติมพลังให้คุณ"
    }
  },
  {
    id: 20,
    name: "Judgement",
    keywords: {
      en: ["Awakening", "Renewal", "Calling"],
      th: ["การตื่นรู้", "การเริ่มใหม่", "เสียงเรียกข้างใน"]
    },
    izuReflection: {
      en: "Your past does not define you — your willingness to grow does.",
      th: "อดีตไม่ได้กำหนดคุณ คุณยังเลือกเรียนรู้และเติบโตจากจุดที่ยืนอยู่ตอนนี้ได้"
    },
    description: {
      en: "A calling awakens within. Rise and embrace your true self.",
      th: "บางสิ่งข้างในอาจกำลังชวนให้คุณมองชีวิตใหม่ และเลือกสิ่งที่ตรงกับตัวเองมากขึ้น"
    }
  },
  {
    id: 21,
    name: "The World",
    keywords: {
      en: ["Completion", "Integration", "Wholeness"],
      th: ["ความสำเร็จครบถ้วน", "การหลอมรวม", "ความสมบูรณ์ในตัวเอง"]
    },
    izuReflection: {
      en: "You have arrived, exactly as you are, exactly where you need to be.",
      th: "ลองรับรู้ว่าคุณเดินมาไกลแค่ไหน และยอมรับตัวเองในจุดที่ยืนอยู่วันนี้"
    },
    description: {
      en: "A cycle completes in wholeness. You have everything you need.",
      th: "บางวงจรอาจกำลังสมบูรณ์ ลองชื่นชมสิ่งที่เรียนรู้ก่อนก้าวต่อไป"
    }
  }
];
