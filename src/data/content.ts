export type CategoryId = 'flirt_words' | 'flirt_lines' | 'reactions';

export type Category = {
  id: CategoryId;
  title: string;
  subtitle: string;
  icon: string;
  accent: string; // tailwind color class
};

export type ContentItem = {
  id: string;
  type: 'word' | 'sentence';
  meaningKr: string;
  thai?: string;
  roman: string;
  pronKr: string;
  notes?: string;
};

export const CATEGORIES: Category[] = [
  {
    id: 'flirt_words',
    title: '플러팅 핵심 단어',
    subtitle: '좋아/싫어/끌려… 감정 단어부터 빠르게',
    icon: '🪄',
    accent: 'from-sky-500 to-blue-600',
  },
  {
    id: 'flirt_lines',
    title: '같이 있을 때 한마디',
    subtitle: '짧고 바로 써먹는 문장',
    icon: '🤝',
    accent: 'from-indigo-500 to-purple-600',
  },
  {
    id: 'reactions',
    title: '감정 리액션',
    subtitle: '짧게 내 감정만 바로 꺼내기 (중요)',
    icon: '🎭',
    accent: 'from-pink-500 to-rose-600',
  },
];

export const CONTENT: Record<CategoryId, ContentItem[]> = {
  flirt_words: [
    { id: 'fw_like', type: 'word', meaningKr: '좋아', thai: 'ชอบ', roman: 'chɔ̂ɔp', pronKr: '촙' },
    { id: 'fw_dislike', type: 'word', meaningKr: '싫어', thai: 'ไม่ชอบ', roman: 'mâi chɔ̂ɔp', pronKr: '마이 촙' },
    { id: 'fw_attracted', type: 'word', meaningKr: '끌려', thai: 'ดึงดูด', roman: 'deung-dùut', pronKr: '등둣' },
    { id: 'fw_pretty', type: 'word', meaningKr: '예쁘다', thai: 'สวย', roman: 'sǔai', pronKr: '쑤아이' },
    { id: 'fw_sexy', type: 'word', meaningKr: '섹시하다', thai: 'เซ็กซี่', roman: 'sék-sîi', pronKr: '섹-씨' },
    { id: 'fw_flutter', type: 'word', meaningKr: '설렌다', thai: 'ใจสั่น', roman: 'jai sàn', pronKr: '짜이 싼' },
    { id: 'fw_heartbeat', type: 'word', meaningKr: '두근거린다', thai: 'ใจเต้นแรง', roman: 'jai têen rɛɛng', pronKr: '짜이 뗀 랭' },
    { id: 'fw_jealous_q', type: 'word', meaningKr: '질투나?', thai: 'หึงเหรอ?', roman: 'hǔeng řə̌ə?', pronKr: '흥 러?' },
    { id: 'fw_jealous', type: 'word', meaningKr: '질투난다', thai: 'หึง', roman: 'hǔeng', pronKr: '흥' },
    { id: 'fw_excited', type: 'word', meaningKr: '기대된다', thai: 'ตื่นเต้น', roman: 'tùuen-tên', pronKr: '뜬-뗀' },
    { id: 'fw_why', type: 'word', meaningKr: '왜?', thai: 'ทำไม?', roman: 'tham-mai?', pronKr: '탐마이?' },
  ],

  flirt_lines: [
    {
      id: 'fl_beside_good',
      type: 'sentence',
      meaningKr: '너 옆에 있으니까 좋다',
      thai: 'อยู่ข้างเธอแล้วดี',
      roman: 'yùu khâang thə̌ə lɛ́ɛo dii',
      pronKr: '유 캉 터 레오 디',
      notes: '옆에 있어 좋다(자연스러운 플러팅)',
    },
    {
      id: 'fl_smile_like1',
      type: 'sentence',
      meaningKr: '너 웃는 거 좋다',
      thai: 'ชอบเวลาเธอยิ้ม',
      roman: 'chɔ̂ɔp wee-laa thə̌ə yím',
      pronKr: '촙 웰라 터 윔',
    },
    {
      id: 'fl_smile_like2',
      type: 'sentence',
      meaningKr: '너 웃는 거 좋아',
      thai: 'ชอบเธอยิ้ม',
      roman: 'chɔ̂ɔp thə̌ə yím',
      pronKr: '촙 터 윔',
    },
    {
      id: 'fl_with_you_good',
      type: 'sentence',
      meaningKr: '너랑 있으면 좋아',
      thai: 'อยู่กับเธอแล้วดี',
      roman: 'yùu kàp thə̌ə lɛ́ɛo dii',
      pronKr: '유 갑 터 레오 디',
    },
    {
      id: 'fl_hug_want',
      type: 'sentence',
      meaningKr: '안고 싶다',
      thai: 'อยากกอด',
      roman: 'yàak gɔ̀ɔt',
      pronKr: '약 껏(드)',
    },
    {
      id: 'fl_kiss_want',
      type: 'sentence',
      meaningKr: '키스하고 싶다',
      thai: 'อยากจูบ',
      roman: 'yàak jùup',
      pronKr: '약 쭙',
    },
    {
      id: 'fl_cant_hold',
      type: 'sentence',
      meaningKr: '너 옆에 있으면 참을 수 없어',
      thai: 'อยู่ข้างเธอแล้วทนไม่ไหว',
      roman: 'yùu khâang thə̌ə lɛ́ɛo thon mâi wǎi',
      pronKr: '유 캉 터 레오 톤 마이 와이',
    },
    {
      id: 'fl_today_danger',
      type: 'sentence',
      meaningKr: '오늘 분위기 위험한데?',
      thai: 'วันนี้บรรยากาศอันตรายนะ?',
      roman: 'wan-níi ban-yaa-gàat an-dtraai ná?',
      pronKr: '완니 반야갓 안뜨라이 나?',
    },
  ],

  reactions: [
    { id: 're_happy', type: 'sentence', meaningKr: '나 기뻐!', thai: 'ดีใจ!', roman: 'dii-jai!', pronKr: '디-짜이!' },
    { id: 're_funny', type: 'sentence', meaningKr: '나 웃겨!', thai: 'ตลก!', roman: 'dtà-lòk!', pronKr: '딸록!' },
    { id: 're_flutter', type: 'sentence', meaningKr: '설렌다.', thai: 'ใจสั่น.', roman: 'jai sàn.', pronKr: '짜이 싼.' },
    { id: 're_shy', type: 'sentence', meaningKr: '부끄럽다.', thai: 'เขิน.', roman: 'khə̌ən.', pronKr: '컨.' },
  ],
};
