export type CategoryId = 'feelings' | 'food' | 'manners';

export type WordItem = {
  id: string;
  emoji: string;
  /** user-friendly Korean pronunciation (hangul) */
  pronKr: string;
  /** meaning shown to user */
  meaningKr: string;
  /** optional Thai script (tiny / hint) */
  thai?: string;
  /** simple romanization hint (tiny) */
  roman?: string;
};

export type SentenceItem = {
  id: string;
  pronKr: string;
  meaningKr: string;
  roman?: string;
};

export type Category = {
  id: CategoryId;
  emoji: string;
  title: string;
  subtitle: string;
  words: WordItem[];
  sentences: SentenceItem[];
};

// NOTE: This is a starter dataset. You can add/replace items freely.
export const CATEGORIES: Category[] = [
  {
    id: 'feelings',
    emoji: '❤️',
    title: '달콤한 감정 표현',
    subtitle: '좋아하는 마음을 태국어로 전해볼까요? 💕',
    words: [
      {
        id: 'rak',
        emoji: '❤️',
        pronKr: '락',
        meaningKr: '사랑하다, 좋아하다',
        thai: 'รัก',
        roman: 'rak',
      },
      {
        id: 'kid-teung',
        emoji: '🥺',
        pronKr: '낏뜽',
        meaningKr: '보고싶다',
        thai: 'คิดถึง',
        roman: 'kid teung',
      },
      {
        id: 'ter-suay-mak',
        emoji: '✨',
        pronKr: '터 쑤아이 막',
        meaningKr: '너 진짜 예쁘다',
        thai: 'เธอสวยมาก',
        roman: 'ter suay maak',
      },
      {
        id: 'na-rak',
        emoji: '😊',
        pronKr: '나락',
        meaningKr: '귀엽다',
        thai: 'น่ารัก',
        roman: 'na rak',
      },
    ],
    sentences: [
      {
        id: 'chan-rak-ter',
        pronKr: '찬 락 터',
        meaningKr: '나는 너를 사랑해',
        roman: 'chan rak ter',
      },
      {
        id: 'kid-teung-mak',
        pronKr: '낏뜽 막',
        meaningKr: '너무 보고싶어',
        roman: 'kid teung maak',
      },
      {
        id: 'ter-suay-mak-sent',
        pronKr: '터 쑤아이 막',
        meaningKr: '너 진짜 예쁘다',
        roman: 'ter suay maak',
      },
    ],
  },
  {
    id: 'food',
    emoji: '😋',
    title: '일상의 맛 (음식)',
    subtitle: '태국 여행의 핵심! 맛 표현 정복하기 🍹',
    words: [
      {
        id: 'aroi',
        emoji: '🍜',
        pronKr: '아러이',
        meaningKr: '맛있다',
        thai: 'อร่อย',
        roman: 'aroi',
      },
      {
        id: 'phed',
        emoji: '🌶️',
        pronKr: '펫',
        meaningKr: '맵다',
        thai: 'เผ็ด',
        roman: 'phed',
      },
      {
        id: 'mai-phed',
        emoji: '🧊',
        pronKr: '마이 펫',
        meaningKr: '안 맵게',
        thai: 'ไม่เผ็ด',
        roman: 'mai phed',
      },
    ],
    sentences: [
      { id: 'ni-aroi', pronKr: '니 아러이', meaningKr: '이거 맛있다', roman: 'nii aroi' },
      { id: 'khaw-mai-phed', pronKr: '카오 마이 펫', meaningKr: '안 맵게 해주세요', roman: 'khaw mai phed' },
      { id: 'ao-nam', pronKr: '아오 남', meaningKr: '물 주세요', roman: 'ao naam' },
    ],
  },
  {
    id: 'manners',
    emoji: '🙏',
    title: '기본 인사와 매너',
    subtitle: '어디서나 환영받는 예의 바른 첫인사 🙏',
    words: [
      {
        id: 'khop-khun',
        emoji: '🙏',
        pronKr: '콥쿤',
        meaningKr: '고마워요',
        thai: 'ขอบคุณ',
        roman: 'khop khun',
      },
      {
        id: 'khor-thot',
        emoji: '🙇',
        pronKr: '커 톳',
        meaningKr: '미안해요/실례해요',
        thai: 'ขอโทษ',
        roman: 'khor thot',
      },
      {
        id: 'tao-rai',
        emoji: '💸',
        pronKr: '타오라이',
        meaningKr: '얼마예요?',
        thai: 'เท่าไหร่',
        roman: 'tao rai',
      },
    ],
    sentences: [
      { id: 'khop-khun-kap', pronKr: '콥쿤 캅', meaningKr: '감사합니다(남성)', roman: 'khop khun khap' },
      { id: 'khor-thot-na', pronKr: '커 톳 나', meaningKr: '죄송해요', roman: 'khor thot na' },
      { id: 'ni-tao-rai', pronKr: '니 타오라이', meaningKr: '이거 얼마예요?', roman: 'nii tao rai' },
    ],
  },
];
