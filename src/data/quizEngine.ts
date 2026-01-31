import type { QuizCategory, QuizItem } from './quizContent';

export type Question = {
  categoryId: string;
  item: QuizItem;
  options: string[];
  correct: string;
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function buildQuestions(cat: QuizCategory): Question[] {
  const qs: Question[] = cat.items.map((item) => {
    const distractors = item.pronKrDistractors.filter((d) => d && d !== item.pronKrCorrect);
    const options = shuffle([item.pronKrCorrect, ...distractors]).slice(0, Math.min(4, 1 + distractors.length));
    // Ensure we always have 4 options; if not enough, pad by reusing distractors (safe) or placeholders.
    let padded = options;
    while (padded.length < 4) {
      const extra = distractors[padded.length % Math.max(1, distractors.length)] || `옵션${padded.length + 1}`;
      if (!padded.includes(extra)) padded = [...padded, extra];
      else padded = [...padded, `${extra}*`];
    }
    return {
      categoryId: cat.id,
      item,
      options: shuffle(padded),
      correct: item.pronKrCorrect
    };
  });
  return shuffle(qs);
}

export function findCategory(categories: QuizCategory[], id: string | null): QuizCategory | null {
  if (!id) return null;
  const cat = categories.find((c) => c.id === id);
  return cat ?? null;
}
