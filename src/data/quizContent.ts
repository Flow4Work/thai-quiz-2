export type QuizItem = {
  id: string;
  /** Korean meaning or sentence */
  kr: string;
  /** Thai script (optional) */
  thai?: string;
  /** Simple romanization (optional) */
  pronRoman?: string;
  /** Correct Korean phonetic choice */
  pronKrCorrect: string;
  /** Distractors (Korean phonetic) */
  pronKrDistractors: string[];
};

export type QuizCategory = {
  id: string;
  title: string;
  subtitle: string;
  items: QuizItem[];
};

// NOTE:
// - thai/pronRoman are optional. UI safely hides empty values.
// - Always keep pronKrCorrect included in the options.

export const categories: QuizCategory[] = [
  {
    id: 'vocab-flirt',
    title: '플러팅 핵심 단어',
    subtitle: '감정·호감 단어 (발음 선택)',
    items: [
      {
        id: 'like',
        kr: '좋아',
        thai: 'ชอบ',
        pronRoman: 'chɔ̂ɔp',
        pronKrCorrect: '쵭(촙)',
        pronKrDistractors: ['쳅', '촙', '쵸프']
      },
      {
        id: 'dislike',
        kr: '싫어',
        thai: 'ไม่ชอบ',
        pronRoman: 'mâi chɔ̂ɔp',
        pronKrCorrect: '마이 쵭(촙)',
        pronKrDistractors: ['마이 촙', '마이 쳅', '마이 쵸프']
      },
      {
        id: 'attracted',
        kr: '끌려',
        thai: 'ดึงดูด',
        pronRoman: 'dʉng duut',
        pronKrCorrect: '등둣',
        pronKrDistractors: ['뜽둣', '등둠', '등둣트']
      },
      {
        id: 'pretty',
        kr: '예쁘다',
        thai: 'สวย',
        pronRoman: 'sǔai',
        pronKrCorrect: '쑤아이',
        pronKrDistractors: ['쑤웨이', '쏴이', '수아이']
      },
      {
        id: 'sexy',
        kr: '섹시하다',
        thai: 'เซ็กซี่',
        pronRoman: 'sek-sîi',
        pronKrCorrect: '섹씨',
        pronKrDistractors: ['섹시', '쎅씨', '셱씨']
      },
      {
        id: 'flutter',
        kr: '설렌다',
        thai: 'ใจเต้น',
        pronRoman: 'jai tên',
        pronKrCorrect: '짜이 땐',
        pronKrDistractors: ['짜이 덴', '자이 땐', '짜이 뗀']
      },
      {
        id: 'heart-thump',
        kr: '두근거린다',
        thai: 'หัวใจเต้นแรง',
        pronRoman: 'hǔa-jai tên rɛɛng',
        pronKrCorrect: '후아짜이 땐 랭',
        pronKrDistractors: ['후아자이 땐 랭', '후아짜이 뗀 랭', '후아짜이 땐 렝']
      },
      {
        id: 'jealous-q',
        kr: '질투나?',
        thai: 'หึงเหรอ?',
        pronRoman: 'hǔeng rɔ̌ɔ?',
        pronKrCorrect: '흥 러?',
        pronKrDistractors: ['흉 러?', '흥 로?', '흉 로?']
      },
      {
        id: 'jealous',
        kr: '질투난다',
        thai: 'ฉันหึง',
        pronRoman: 'chǎn hǔeng',
        pronKrCorrect: '찬 흥',
        pronKrDistractors: ['찬 흉', '챈 흥', '찬 흥그']
      },
      {
        id: 'excited',
        kr: '기대된다',
        thai: 'ตื่นเต้น',
        pronRoman: 'tʉ̀ʉn tên',
        pronKrCorrect: '뜬 땐',
        pronKrDistractors: ['뜬 덴', '뜬 뗀', '뜬 텐']
      },
      {
        id: 'why',
        kr: '왜?',
        thai: 'ทำไม?',
        pronRoman: 'tham-mai?',
        pronKrCorrect: '탐마이?',
        pronKrDistractors: ['탐마이!', '탐메이?', '담마이?']
      }
    ]
  },
  {
    id: 'together-one-liner',
    title: '같이 있을 때 한마디',
    subtitle: '짧고 자연스러운 문장',
    items: [
      {
        id: 'with-you-good',
        kr: '너 옆에 있으니까 좋다',
        thai: 'อยู่ข้าง ๆ คุณแล้วดีจัง',
        pronRoman: 'yùu khâang-kâang khun lɛ́ɛo dii jang',
        pronKrCorrect: '유 캉캉 쿤 래오 디 짱',
        pronKrDistractors: ['유 캉캉 쿤 래오 디 짠', '유 칭칭 쿤 래오 디 짱', '유 캉캉 쿤 레오 디 짱']
      },
      {
        id: 'your-smile-nice',
        kr: '너 웃는 거 좋다',
        thai: 'คุณยิ้มแล้วน่ารัก',
        pronRoman: 'khun yím lɛ́ɛo nâa-rák',
        pronKrCorrect: '쿤 임 래오 나락',
        pronKrDistractors: ['쿤 윔 래오 나락', '쿤 임 레오 나락', '쿤 임 래오 나랏']
      },
      {
        id: 'your-smile-like',
        kr: '너 웃는 거 좋아',
        thai: 'ชอบเวลาคุณยิ้ม',
        pronRoman: 'chɔ̂ɔp wee-laa khun yím',
        pronKrCorrect: '쵭 웨라 쿤 임',
        pronKrDistractors: ['촙 웨라 쿤 임', '쵭 웨라 쿤 윔', '쵭 웰라 쿤 임']
      },
      {
        id: 'with-you-like',
        kr: '너랑 있으면 좋아',
        thai: 'อยู่กับคุณแล้วชอบ',
        pronRoman: 'yùu gàp khun lɛ́ɛo chɔ̂ɔp',
        pronKrCorrect: '유 갑 쿤 래오 쵭',
        pronKrDistractors: ['유 갑 쿤 래오 촙', '유 갑 쿤 레오 쵭', '유 갚 쿤 래오 쵭']
      }
    ]
  },
  {
    id: 'strong-flirt',
    title: '강한 플러팅/분위기',
    subtitle: '분위기 올릴 때 (주의)',
    items: [
      {
        id: 'hug-want',
        kr: '안고 싶다',
        thai: 'อยากกอดคุณ',
        pronRoman: 'yàak gɔ̀ɔt khun',
        pronKrCorrect: '약 껏 쿤',
        pronKrDistractors: ['약 꼿 쿤', '약 껏 큰', '약 껃 쿤']
      },
      {
        id: 'kiss-want',
        kr: '키스하고 싶다',
        thai: 'อยากจูบคุณ',
        pronRoman: 'yàak jùup khun',
        pronKrCorrect: '약 쭙 쿤',
        pronKrDistractors: ['약 쭈업 쿤', '약 쭙 큰', '약 줍 쿤']
      },
      {
        id: 'cant-hold',
        kr: '너 옆에 있으면 참을 수 없어',
        thai: 'อยู่ใกล้คุณแล้วทนไม่ไหว',
        pronRoman: 'yùu glâi khun lɛ́ɛo thon mâi wǎi',
        pronKrCorrect: '유 글라이 쿤 래오 톤 마이 와이',
        pronKrDistractors: ['유 글라이 쿤 레오 톤 마이 와이', '유 글라이 쿤 래오 돈 마이 와이', '유 글래이 쿤 래오 톤 마이 와이']
      },
      {
        id: 'danger-mood',
        kr: '오늘 분위기 위험한데?',
        thai: 'วันนี้บรรยากาศอันตรายนะ?',
        pronRoman: 'wan-níi ban-yaa-gàat an-dta-rai ná?',
        pronKrCorrect: '완니 반야깟 안따라이 나?',
        pronKrDistractors: ['완니 반야깟 안따라이 낙?', '완니 반야갓 안따라이 나?', '완니 반야깟 안따라이 라?']
      }
    ]
  },
  {
    id: 'reactions',
    title: '감정 리액션',
    subtitle: '짧게 바로 반응하기',
    items: [
      {
        id: 'im-happy',
        kr: '나 기뻐!',
        thai: 'ฉันดีใจ!',
        pronRoman: 'chǎn dii-jai!',
        pronKrCorrect: '찬 디짜이!',
        pronKrDistractors: ['찬 디자이!', '찬 디짜이?', '찬 티짜이!']
      },
      {
        id: 'im-funny',
        kr: '나 웃겨!',
        thai: 'ฉันขำ!',
        pronRoman: 'chǎn khǎm!',
        pronKrCorrect: '찬 캄!',
        pronKrDistractors: ['찬 칸!', '찬 캄?', '찬 컴!']
      },
      {
        id: 'im-flutter',
        kr: '설렌다.',
        thai: 'ใจเต้น.',
        pronRoman: 'jai tên.',
        pronKrCorrect: '짜이 땐.',
        pronKrDistractors: ['짜이 덴.', '자이 땐.', '짜이 뗀.']
      },
      {
        id: 'im-shy',
        kr: '부끄럽다.',
        thai: 'เขิน.',
        pronRoman: 'khǒen.',
        pronKrCorrect: '컨.',
        pronKrDistractors: ['킨.', '큰.', '콘.']
      }
    ]
  },
  {
    id: 'building-blocks',
    title: '주어/동사/형용사 블록',
    subtitle: '문장 만들기용 기본 재료',
    items: [
      {
        id: 'i',
        kr: '나 / 저 (주어)',
        thai: 'ฉัน',
        pronRoman: 'chǎn',
        pronKrCorrect: '찬',
        pronKrDistractors: ['챈', '천', '찬느']
      },
      {
        id: 'you',
        kr: '너 / 당신 (주어)',
        thai: 'คุณ',
        pronRoman: 'khun',
        pronKrCorrect: '쿤',
        pronKrDistractors: ['큰', '쿤느', '쿤(강세)']
      },
      {
        id: 'want',
        kr: '원하다 / 하고 싶다 (동사)',
        thai: 'อยาก',
        pronRoman: 'yàak',
        pronKrCorrect: '약',
        pronKrDistractors: ['얕', '약크', '약(길게)']
      },
      {
        id: 'be',
        kr: '~이다 / ~하다 (동사)',
        thai: 'เป็น',
        pronRoman: 'bpen',
        pronKrCorrect: '뺀',
        pronKrDistractors: ['펜', '뻰', '벤']
      },
      {
        id: 'really',
        kr: '진짜 (부사)',
        thai: 'จริง',
        pronRoman: 'jing',
        pronKrCorrect: '찡',
        pronKrDistractors: ['징', '찐', '쯩']
      },
      {
        id: 'very',
        kr: '너무 / 매우 (부사)',
        thai: 'มาก',
        pronRoman: 'mâak',
        pronKrCorrect: '막',
        pronKrDistractors: ['맠', '마크', '막(길게)']
      }
    ]
  }
];
