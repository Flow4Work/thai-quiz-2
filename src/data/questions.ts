import type { Category, ContentItem } from './content';
import { CATEGORIES } from './content';

export type Question = {
  id: string;
  meaningKr: string;
  thai: string;
  roman: string;
  pronKr: string;
  tags: string[];
};

function toQuestion(it: ContentItem, cat: Category): Question {
  return {
    id: it.id,
    meaningKr: it.meaningKr,
    thai: it.thai ?? '',
    roman: it.roman ?? '',
    pronKr: it.pronKr,
    tags: [cat.id],
  };
}

export const QUESTIONS: Question[] = CATEGORIES.flatMap((cat) =>
  cat.items.map((it) => toQuestion(it, cat))
);
