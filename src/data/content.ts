export type CategoryId =
  | 'flirt_words'
  | 'together_lines'
  | 'strong_flirt'
  | 'reactions'
  | 'grammar_blocks';

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

/**
 * NOTE
 * - User preference: no Thai script by default -> keep `thai` empty.
 * - Quiz is built from `words`, so every category includes at least a few `words`.
 */
export const CATEGORIES: Category[] = [
  {
    id: 'flirt_words',
    emoji: '💗',
    title: '감정/호감 핵심 단어',
    subtitle: '짧게 던지기 좋은 “한 단어/짧은 표현” 모음',
    words: [
      { id: 'like', emoji: '👍', pronKr: '촙', meaningKr: '좋아', roman: 'chop' },
      { id: 'dislike', emoji: '🙅', pronKr: '마이 촙', meaningKr: '싫어', roman: 'mai chop' },
      { id: 'attracted', emoji: '🧲', pronKr: '툭짜이', meaningKr: '끌려', roman: 'thuk jai' },
      { id: 'pretty', emoji: '✨', pronKr: '쑤아이', meaningKr: '예쁘다', roman: 'suay' },
      { id: 'sexy', emoji: '🔥', pronKr: '쎅씨', meaningKr: '섹시하다', roman: 'sek-si' },
      { id: 'flutter', emoji: '🫀', pronKr: '짜이 뗀', meaningKr: '설렌다', roman: 'jai ten' },
      { id: 'heartbeat', emoji: '💓', pronKr: '짜이 뗀', meaningKr: '두근거린다', roman: 'jai ten' },
      { id: 'jealous_q', emoji: '😼', pronKr: '흥 러?', meaningKr: '질투나?', roman: 'hueng roe?' },
      { id: 'jealous', emoji: '😾', pronKr: '찬 흥', meaningKr: '질투난다', roman: 'chan hueng' },
      { id: 'cant_wait', emoji: '⏳', pronKr: '러 마이 와이', meaningKr: '기대된다', roman: 'ro mai wai' },
      { id: 'why', emoji: '❓', pronKr: '탐마이', meaningKr: '왜?', roman: 'tham-mai' },
    ],
    sentences: [],
  },

  {
    id: 'together_lines',
    emoji: '😊',
    title: '같이 있을 때 한마디',
    subtitle: '부담 없이 분위기 올리는 짧은 문장',
    words: [
      { id: 'nice_next_to_you', emoji: '🫶', pronKr: '유 캉캉 터 레오 디', meaningKr: '너 옆에 있으니까 좋다', roman: 'yuu khaang-khaang thoe laeo di' },
      { id: 'like_your_smile_1', emoji: '😁', pronKr: '촙 똔 터 임', meaningKr: '너 웃는 거 좋다', roman: 'chop dton thoe yim' },
      { id: 'like_your_smile_2', emoji: '😄', pronKr: '촙 똔 터 임', meaningKr: '너 웃는 거 좋아', roman: 'chop dton thoe yim' },
      { id: 'with_you_good', emoji: '🤍', pronKr: '유 깝 터 레오 미 콰암쑥', meaningKr: '너랑 있으면 좋아', roman: 'yuu gap thoe laeo mii khwaam-suk' },
    ],
    sentences: [
      { id: 't1', pronKr: '촙 똔 터 임', meaningKr: '너 웃는 거 좋아.', roman: 'chop dton thoe yim' },
      { id: 't2', pronKr: '유 깝 터 레오 디', meaningKr: '너랑 있으면 좋아.', roman: 'yuu gap thoe laeo di' },
      { id: 't3', pronKr: '유 캉 터', meaningKr: '너 옆에 있을래.', roman: 'yuu khaang thoe' },
    ],
  },

  {
    id: 'strong_flirt',
    emoji: '🌙',
    title: '조금 더 강한 플러팅',
    subtitle: '수위는 살짝 올리되, 짧고 직관적으로',
    words: [
      { id: 'want_hug', emoji: '🤗', pronKr: '약 껏 터', meaningKr: '안고 싶다', roman: 'yaak got thoe' },
      { id: 'want_kiss', emoji: '💋', pronKr: '약 쭙 터', meaningKr: '키스하고 싶다', roman: 'yaak juup thoe' },
      { id: 'cant_hold', emoji: '😵‍💫', pronKr: '유 글라이 터 레오 톤 마이 와이', meaningKr: '너 옆에 있으면 참을 수 없어', roman: 'yuu glai thoe laeo thon mai wai' },
      { id: 'danger_vibe', emoji: '⚠️', pronKr: '완니 반야갓 안뜨라이 나?', meaningKr: '오늘 분위기 위험한데?', roman: 'wan-nii ban-yaa-gat an-dtraai na?' },
    ],
    sentences: [
      { id: 's1', pronKr: '약 껏 터', meaningKr: '안고 싶다.', roman: 'yaak got thoe' },
      { id: 's2', pronKr: '약 쭙 터', meaningKr: '키스하고 싶다.', roman: 'yaak juup thoe' },
      { id: 's3', pronKr: '완니 반야갓 안뜨라이 나?', meaningKr: '오늘 분위기 위험한데?', roman: 'wan-nii ban-yaa-gat an-dtraai na?' },
    ],
  },

  {
    id: 'reactions',
    emoji: '🎭',
    title: '감정 리액션 묶음',
    subtitle: '대화 중에 바로 튀어나오는 반응들',
    words: [
      { id: 'happy', emoji: '🥳', pronKr: '찬 디짜이', meaningKr: '나 기뻐!', roman: 'chan dii-jai' },
      { id: 'funny', emoji: '🤣', pronKr: '찬 캄', meaningKr: '나 웃겨!', roman: 'chan kham' },
      { id: 'flutter2', emoji: '😳', pronKr: '짜이 뗀', meaningKr: '설렌다.', roman: 'jai ten' },
      { id: 'shy', emoji: '🙈', pronKr: '큰', meaningKr: '부끄럽다.', roman: 'khoen' },
    ],
    sentences: [
      { id: 'r1', pronKr: '찬 디짜이!', meaningKr: '나 기뻐!', roman: 'chan dii-jai!' },
      { id: 'r2', pronKr: '찬 캄!', meaningKr: '나 웃겨!', roman: 'chan kham!' },
      { id: 'r3', pronKr: '큰...', meaningKr: '부끄럽다...', roman: 'khoen...' },
    ],
  },

  {
    id: 'grammar_blocks',
    emoji: '🧩',
    title: '주어/동사 조합 블록',
    subtitle: '문장 만들 때 “갑자기 튀어나오는 단어” 없이 조합으로 익히기',
    words: [
      { id: 'i', emoji: '🧑', pronKr: '찬', meaningKr: '나 / 나는', roman: 'chan' },
      { id: 'you', emoji: '👤', pronKr: '터', meaningKr: '너 / 너는', roman: 'thoe' },
      { id: 'we', emoji: '👥', pronKr: '라오', meaningKr: '우리', roman: 'rao' },
      { id: 'like2', emoji: '❤️', pronKr: '촙', meaningKr: '좋아하다', roman: 'chop' },
      { id: 'love', emoji: '💘', pronKr: '락', meaningKr: '사랑하다', roman: 'rak' },
      { id: 'miss', emoji: '🥺', pronKr: '낏뜽', meaningKr: '보고 싶다', roman: 'kid-teung' },
      { id: 'want', emoji: '✨', pronKr: '약', meaningKr: '~하고 싶다', roman: 'yaak' },
      { id: 'not', emoji: '⛔', pronKr: '마이', meaningKr: '아니다/안', roman: 'mai' },
      { id: 'very', emoji: '➕', pronKr: '막', meaningKr: '아주/많이', roman: 'mak' },
    ],
    sentences: [
      { id: 'g1', pronKr: '찬 촙 터', meaningKr: '나는 너 좋아해.', roman: 'chan chop thoe' },
      { id: 'g2', pronKr: '찬 낏뜽 터', meaningKr: '나는 너 보고 싶어.', roman: 'chan kid-teung thoe' },
      { id: 'g3', pronKr: '찬 마이 촙', meaningKr: '나는 싫어(안 좋아해).', roman: 'chan mai chop' },
    ],
  },
];
