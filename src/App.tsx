import React, { useMemo, useState } from 'react';
import { CATEGORIES, Category, CategoryId, SentenceItem, WordItem } from './data/content';

type Screen =
  | { name: 'home' }
  | { name: 'words'; categoryId: CategoryId; index: number }
  | { name: 'sentences'; categoryId: CategoryId }
  | { name: 'quiz'; categoryId: CategoryId; qIndex: number; locked?: boolean; picked?: string }
  | { name: 'done'; categoryId: CategoryId };

function cx(...cls: Array<string | false | undefined | null>) {
  return cls.filter(Boolean).join(' ');
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function useCategory(categoryId: CategoryId): Category {
  const cat = CATEGORIES.find((c) => c.id === categoryId);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return cat!;
}

function TopBar({
  onClose,
  progress,
}: {
  onClose?: () => void;
  /** 0..1 */
  progress?: number;
}) {
  return (
    <div className="pt-4">
      <div className="flex items-center justify-between px-5">
        <button
          onClick={onClose}
          className="h-9 w-9 rounded-full bg-white/5 text-white/70 hover:bg-white/10"
          aria-label="닫기"
        >
          ✕
        </button>
        <div className="w-40" />
      </div>
      <div className="mt-4 px-5">
        <div className="h-1 w-full rounded-full bg-white/10">
          <div
            className="h-1 rounded-full bg-[#3B82F6] transition-all"
            style={{ width: `${Math.round(clamp((progress ?? 0) * 100, 0, 100))}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function PrimaryButton({
  children,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cx(
        'w-full rounded-2xl px-6 py-4 text-base font-semibold',
        'bg-[#3B82F6] text-white shadow-[0_12px_40px_rgba(59,130,246,0.25)]',
        'active:scale-[0.99] transition',
        disabled && 'opacity-60'
      )}
    >
      {children}
    </button>
  );
}

function GhostPill({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cx(
        'rounded-full px-3 py-1.5 text-sm font-semibold transition',
        active
          ? 'bg-white text-black'
          : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
      )}
    >
      {children}
    </button>
  );
}

function GlassCard({
  children,
  onClick,
  className,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cx(
        'w-full text-left rounded-3xl px-5 py-4',
        'bg-white/[0.06] border border-white/10',
        'shadow-[0_20px_60px_rgba(0,0,0,0.45)]',
        'hover:bg-white/[0.08] transition',
        className
      )}
    >
      {children}
    </button>
  );
}

function HomeScreen({
  onPick,
  completed,
}: {
  onPick: (id: CategoryId) => void;
  completed: Record<CategoryId, boolean>;
}) {
  const doneCount = Object.values(completed).filter(Boolean).length;
  return (
    <div className="px-5 pb-10 pt-10">
      <div className="inline-flex items-center gap-2 rounded-full bg-[#0B2B57] px-3 py-1 text-xs font-semibold text-[#93C5FD]">
        태국어 마스터
      </div>
      <h1 className="mt-4 text-3xl font-extrabold leading-tight text-white">
        태국어,
        <br />
        어렵지 않아요.
      </h1>
      <p className="mt-2 text-sm text-white/55">이모지로 쉽게 연상하며 배워보세요.</p>

      <div className="mt-8 flex items-center justify-between">
        <div className="text-sm font-semibold text-white/55">학습 레벨</div>
        <div className="text-sm font-semibold text-[#60A5FA]">{doneCount}/3</div>
      </div>

      <div className="mt-4 grid gap-4">
        {CATEGORIES.map((c) => (
          <GlassCard key={c.id} onClick={() => onPick(c.id)}>
            <div className="flex items-center gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/5 text-2xl">
                {c.emoji}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <div className="text-base font-extrabold text-white">{c.title}</div>
                  {completed[c.id] ? (
                    <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[11px] font-semibold text-emerald-300">
                      완료
                    </span>
                  ) : null}
                </div>
                <div className="mt-0.5 text-xs text-white/50">{c.subtitle}</div>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* footer text removed */}
    </div>
  );
}

function WordScreen({
  category,
  word,
  index,
  total,
  onNext,
  onClose,
}: {
  category: Category;
  word: WordItem;
  index: number;
  total: number;
  onNext: () => void;
  onClose: () => void;
}) {
  const progress = (index + 1) / (total + 2); // leave room for later steps
  return (
    <div className="min-h-[100dvh]">
      <TopBar onClose={onClose} progress={progress} />
      <div className="px-5 pb-10 pt-12 text-center">
        <div className="mx-auto grid h-24 w-24 place-items-center rounded-[28px] bg-white/5 text-5xl">
          {word.emoji}
        </div>
        <div className="mt-6 text-xs font-semibold text-[#60A5FA]">발음</div>
        <div className="mt-1 text-5xl font-extrabold tracking-tight text-white">{word.pronKr}</div>

        <div className="mt-6 text-xl font-extrabold text-white">{word.meaningKr}</div>
        <div className="mt-2 text-sm text-white/30">
          {word.thai ? <span className="mr-2">{word.thai}</span> : null}
          {word.roman ? <span className="">{word.roman}</span> : null}
        </div>

        <div className="mt-10">
          <PrimaryButton onClick={onNext}>{index + 1 < total ? '다음 단어' : '한 문장 더!'}</PrimaryButton>
        </div>
      </div>
      <div className="px-5 pb-6 text-center text-xs text-white/30">{category.title}</div>
    </div>
  );
}

function SentenceScreen({
  category,
  onStartQuiz,
  onClose,
}: {
  category: Category;
  onStartQuiz: () => void;
  onClose: () => void;
}) {
  return (
    <div className="min-h-[100dvh]">
      <TopBar onClose={onClose} progress={0.78} />

      <div className="px-5 pb-10 pt-10">
        <div className="text-2xl font-extrabold text-white">한 문장 더! 💬</div>
        <div className="mt-1 text-sm text-white/45">배운 단어를 이렇게 사용해보세요.</div>

        <div className="mt-6 grid gap-4">
          {category.sentences.slice(0, 3).map((s) => (
            <div
              key={s.id}
              className="rounded-3xl bg-white/[0.06] border border-white/10 px-5 py-4"
            >
              <div className="text-lg font-extrabold text-[#60A5FA]">{s.pronKr}</div>
              <div className="mt-1 text-base font-semibold text-white">{s.meaningKr}</div>
              {s.roman ? <div className="mt-2 text-xs text-white/30">{s.roman}</div> : null}
            </div>
          ))}
        </div>

        <div className="mt-8">
          <PrimaryButton onClick={onStartQuiz}>학습 확인 퀴즈</PrimaryButton>
        </div>
      </div>
    </div>
  );
}

function buildQuizFromCategory(category: Category) {
  // We ask: meaning -> pick correct pronKr
  return category.words.map((w) => {
    const distractors = category.words
      .filter((x) => x.id !== w.id)
      .map((x) => x.pronKr);
    const pool = Array.from(new Set(distractors)).slice(0, 3);
    while (pool.length < 3) pool.push('...');
    const options = [w.pronKr, ...pool]
      .sort(() => Math.random() - 0.5)
      .slice(0, 4);
    return {
      id: w.id,
      meaningKr: w.meaningKr,
      correct: w.pronKr,
      options,
    };
  });
}

function QuizScreen({
  category,
  qIndex,
  onClose,
  onNext,
  onDone,
}: {
  category: Category;
  qIndex: number;
  onClose: () => void;
  onNext: (isLast: boolean) => void;
  onDone: () => void;
}) {
  const quiz = useMemo(() => buildQuizFromCategory(category), [category]);
  const q = quiz[qIndex];
  const total = quiz.length;
  const [picked, setPicked] = useState<string | null>(null);
  const locked = picked !== null;

  const progress = 0.78 + (qIndex + 1) * (0.22 / total);

  function pick(opt: string) {
    if (locked) return;
    setPicked(opt);
  }

  const isCorrect = picked === q.correct;

  return (
    <div className="min-h-[100dvh]">
      <TopBar onClose={onClose} progress={progress} />

      <div className="px-5 pb-12 pt-14 text-center">
        <div className="text-4xl">🥺</div>
        <div className="mt-3 text-sm font-semibold text-white/50">이 뜻의 발음은?</div>
        <div className="mt-1 text-4xl font-extrabold text-white">{q.meaningKr}</div>

        <div className="mt-8 grid gap-3">
          {q.options.map((opt) => {
            const correct = opt === q.correct;
            const chosen = opt === picked;
            const showCorrect = locked && correct;
            const showWrong = locked && chosen && !correct;

            return (
              <button
                key={opt}
                onClick={() => pick(opt)}
                className={cx(
                  'w-full rounded-2xl px-5 py-4 text-left text-base font-extrabold transition',
                  'bg-white/[0.06] border border-white/10',
                  'hover:bg-white/[0.08]',
                  showCorrect && 'border-emerald-400/70 bg-emerald-500/10 text-emerald-200',
                  showWrong && 'border-rose-400/70 bg-rose-500/10 text-rose-200'
                )}
              >
                <div className="flex items-center justify-between">
                  <span>{opt}</span>
                  {showCorrect ? <span className="text-emerald-300">✓</span> : null}
                  {showWrong ? <span className="text-rose-300">✕</span> : null}
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-8">
          {locked ? (
            <PrimaryButton
              onClick={() => {
                setPicked(null);
                if (qIndex + 1 >= total) {
                  onDone();
                  return;
                }
                onNext(qIndex + 1 >= total - 1);
              }}
            >
              {qIndex + 1 >= total ? '완료' : '다음'}
            </PrimaryButton>
          ) : (
            <PrimaryButton disabled>정답을 선택하세요</PrimaryButton>
          )}
        </div>

        {locked ? (
          <div className={cx('mt-6 text-sm font-extrabold', isCorrect ? 'text-emerald-300' : 'text-rose-300')}>
            {isCorrect ? '정답! 🔥' : `아쉬워요! ${q.correct}`}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function DoneScreen({ category, onHome }: { category: Category; onHome: () => void }) {
  return (
    <div className="min-h-[100dvh] px-5 pb-12 pt-16 text-center">
      <div className="mx-auto grid h-20 w-20 place-items-center rounded-[26px] bg-emerald-500/10 text-4xl">
        ✅
      </div>
      <div className="mt-6 text-2xl font-extrabold text-white">완료!</div>
      <div className="mt-2 text-sm text-white/50">{category.title} 학습을 마쳤어요.</div>

      <div className="mt-10">
        <PrimaryButton onClick={onHome}>홈으로</PrimaryButton>
      </div>
    </div>
  );
}

export default function App() {
  const [completed, setCompleted] = useState<Record<CategoryId, boolean>>({
    flirt_words: false,
    flirt_lines: false,
    reactions: false,
  });
  const [screen, setScreen] = useState<Screen>({ name: 'home' });

  const activeCategory =
    screen.name === 'home' ? null : useCategory((screen as Exclude<Screen, { name: 'home' }>).categoryId);

  return (
    <div className="min-h-[100dvh] bg-[#050A12] text-white">
      {/* Mobile-first frame */}
      <div className="mx-auto min-h-[100dvh] max-w-[460px]">
        {screen.name === 'home' ? (
          <HomeScreen
            completed={completed}
            onPick={(id) => setScreen({ name: 'words', categoryId: id, index: 0 })}
          />
        ) : null}

        {screen.name === 'words' && activeCategory ? (
          <WordScreen
            category={activeCategory}
            word={activeCategory.words[screen.index]}
            index={screen.index}
            total={activeCategory.words.length}
            onClose={() => setScreen({ name: 'home' })}
            onNext={() => {
              const next = screen.index + 1;
              if (next >= activeCategory.words.length) {
                setScreen({ name: 'sentences', categoryId: activeCategory.id });
              } else {
                setScreen({ name: 'words', categoryId: activeCategory.id, index: next });
              }
            }}
          />
        ) : null}

        {screen.name === 'sentences' && activeCategory ? (
          <SentenceScreen
            category={activeCategory}
            onClose={() => setScreen({ name: 'home' })}
            onStartQuiz={() => setScreen({ name: 'quiz', categoryId: activeCategory.id, qIndex: 0 })}
          />
        ) : null}

        {screen.name === 'quiz' && activeCategory ? (
          <QuizScreen
            category={activeCategory}
            qIndex={screen.qIndex}
            onClose={() => setScreen({ name: 'home' })}
            onNext={() => setScreen({ name: 'quiz', categoryId: activeCategory.id, qIndex: screen.qIndex + 1 })}
            onDone={() => {
              setCompleted((p) => ({ ...p, [activeCategory.id]: true }));
              setScreen({ name: 'done', categoryId: activeCategory.id });
            }}
          />
        ) : null}

        {screen.name === 'done' && activeCategory ? (
          <DoneScreen
            category={activeCategory}
            onHome={() => {
              setScreen({ name: 'home' });
            }}
          />
        ) : null}
      </div>

      {/* desktop hint removed */}
    </div>
  );
}
