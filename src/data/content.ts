export type CategoryId = 'flirt_words' | 'flirt_lines' | 'reactions';

export type ContentItem = {
  id: string;
  emoji: string;
  /** Korean-friendly pronunciation (hangul) */
  pronKr: string;
  /** Korean meaning shown to the user */
  meaningKr: string;
  /** Optional Thai script (user prefers pronunciation-only; keep empty by default) */
  thai?: string;
  /** Optional romanization (tiny hint) */
  roman?: string;
};

export type Category = {
  id: CategoryId;
  title: string;
  subtitle: string;
  emoji: string;
  items: ContentItem[];
};

/**
 * NOTE
 * - The user wants pronunciation-focused learning (hangul/roman), not Thai letters.
 * - Thai script is intentionally kept empty for these items.
 */
export const CATEGORIES: Category[] = [
  {
    id: 'flirt_words',
    title: '플러팅 핵심 단어',
    subtitle: '좋아/싫어/끌려… 감정 단어부터 빠르게',
    emoji: '💘',
    items: [
      // ---- Subject / verb blocks (minimal) ----
      { id: 'subj_i', emoji: '🙋', pronKr: '찬', meaningKr: '나(=I)', thai: '', roman: 'chan' },
      { id: 'subj_you', emoji: '👉', pronKr: '터', meaningKr: '너(=you)', thai: '', roman: 'ter' },
      { id: 'verb_like', emoji: '❤️', pronKr: '촙', meaningKr: '좋아(좋아하다)', thai: '', roman: 'chop' },
      { id: 'verb_not_like', emoji: '🙅', pronKr: '마이 촙', meaningKr: '싫어(=안 좋아해)', thai: '', roman: 'mai chop' },
      { id: 'why', emoji: '❓', pronKr: '탐마이', meaningKr: '왜?', thai: '', roman: 'tham-mai' },

      // ---- Feelings / adjectives ----
      { id: 'attracted', emoji: '🧲', pronKr: '툭 짜이', meaningKr: '끌려 / 취향저격', thai: '', roman: 'thuuk jai' },
      { id: 'pretty', emoji: '✨', pronKr: '쑤아이', meaningKr: '예쁘다', thai: '', roman: 'suay' },
      { id: 'sexy', emoji: '🔥', pronKr: '섹씨', meaningKr: '섹시하다', thai: '', roman: 'sexy' },
      { id: 'flutter', emoji: '💓', pronKr: '뜬뗀', meaningKr: '설렌다 / 두근거린다', thai: '', roman: 'tuen ten' },

      // jealousy (question & statement)
      { id: 'jealous_q', emoji: '😏', pronKr: '흥 러?', meaningKr: '질투해?', thai: '', roman: 'heung ...' },
      { id: 'jealous_s', emoji: '😤', pronKr: '찬 흥 나', meaningKr: '질투난다', thai: '', roman: 'chan heung na' },

      // 기대된다 (keep simple: excited / looking forward)
      { id: 'looking_forward', emoji: '⏳', pronKr: '뜬뗀', meaningKr: '기대된다(=설레/기대돼)', thai: '', roman: 'tuen ten' },
    ],
  },
  {
    id: 'flirt_lines',
    title: '같이 있을 때 한마디',
    subtitle: '짧고 바로 써먹는 문장만',
    emoji: '🫶',
    items: [
      { id: 'next_to_you_good', emoji: '🙂', pronKr: '유 캉 캉 터 래우 디 짱', meaningKr: '너 옆에 있으니까 좋다', thai: '', roman: 'yuu khaang-khaang ter laew dii jang' },
      { id: 'your_smile_good', emoji: '😊', pronKr: '터 임 래우 디', meaningKr: '너 웃는 거 좋다', thai: '', roman: 'ter yim laew dii' },
      { id: 'i_like_your_smile', emoji: '😁', pronKr: '촙 웰라 터 임', meaningKr: '너 웃는 거 좋아', thai: '', roman: 'chop welaa ter yim' },
      { id: 'with_you_good', emoji: '🤍', pronKr: '유 갑 터 래우 디', meaningKr: '너랑 있으면 좋아', thai: '', roman: 'yuu gap ter laew dii' },

      { id: 'want_hug', emoji: '🤗', pronKr: '약 껏', meaningKr: '안고 싶다', thai: '', roman: 'yaak gɔ̀ɔt' },
      { id: 'want_kiss', emoji: '💋', pronKr: '약 쭙', meaningKr: '키스하고 싶다', thai: '', roman: 'yaak juup' },
      { id: 'cant_resist', emoji: '🫠', pronKr: '유 끌라이 터 래우 찬 옫 마이 다이', meaningKr: '너 옆에 있으면 참을 수 없어', thai: '', roman: 'yuu glai ter laew chan ot mai dai' },
      { id: 'danger_vibe', emoji: '⚠️', pronKr: '완니 반야깟 안뜨라이 나?', meaningKr: '오늘 분위기 위험한데?', thai: '', roman: 'wan-nii banyaagaat an-traai na?' },
    ],
  },
  {
    id: 'reactions',
    title: '감정 리액션',
    subtitle: '짧게 내 감정만 바로 꺼내기 (중요)',
    emoji: '🎭',
    items: [
      { id: 'happy', emoji: '😄', pronKr: '찬 디짜이!', meaningKr: '나 기뻐!', thai: '', roman: 'chan dii-jai' },
      { id: 'lol', emoji: '🤣', pronKr: '찬 캄 러이!', meaningKr: '나 웃겨!', thai: '', roman: 'chan kham loei' },
      { id: 'excited', emoji: '😳', pronKr: '뜬뗀…', meaningKr: '설렌다.', thai: '', roman: 'tuen ten' },
      { id: 'shy', emoji: '🙈', pronKr: '아이…', meaningKr: '부끄럽다.', thai: '', roman: 'ai' },
    ],
  },
];
