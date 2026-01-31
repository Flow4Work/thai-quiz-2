import { useMemo, useState } from "react";
import { QUESTIONS, type Question } from "./data/questions";

type Mode = "meaning_to_pron" | "pron_to_meaning";

type QuizItem = {
  q: Question;
  mode: Mode;
  choices: string[];
  answer: string;
};

function shuffle<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function sample<T>(arr: T[], n: number) {
  return shuffle(arr).slice(0, n);
}

function buildQuizItems(
  pool: Question[],
  mode: Mode,
  count: number
): QuizItem[] {
  const pronPool = pool.map((x) => x.pronKr);
  const items = sample(pool, Math.min(count, pool.length)).map((q) => {
    const answer = mode === "meaning_to_pron" ? q.pronKr : q.meaningKr;

    const distractorSource =
      mode === "meaning_to_pron"
        ? pronPool.filter((p) => p !== q.pronKr)
        : pool.map((x) => x.meaningKr).filter((m) => m !== q.meaningKr);

    const distractors = sample(distractorSource, 3);
    const choices = shuffle([answer, ...distractors]);

    return { q, mode, choices, answer };
  });

  return items;
}

function Pill({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "px-3 py-1.5 rounded-full border text-sm transition",
        active
          ? "bg-white text-black border-white"
          : "bg-black/30 text-white/80 border-white/15 hover:border-white/35 hover:text-white",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

export default function App() {
  const [step, setStep] = useState<"setup" | "quiz" | "result">("setup");
  const [mode, setMode] = useState<Mode>("meaning_to_pron");
  const [tag, setTag] = useState<
    "all" | "general" | "transport" | "hotel" | "shopping" | "flirt"
  >("all");
  const [count, setCount] = useState<number>(20);

  const filtered = useMemo(() => {
    if (tag === "all") return QUESTIONS;
    return QUESTIONS.filter((q) => q.tags.includes(tag));
  }, [tag]);

  const [items, setItems] = useState<QuizItem[]>([]);
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [correct, setCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [wrong, setWrong] = useState<
    { q: Question; your: string; ans: string; mode: Mode }[]
  >([]);

  const current = items[idx];

  function start() {
    const built = buildQuizItems(filtered, mode, count);
    setItems(built);
    setIdx(0);
    setPicked(null);
    setCorrect(null);
    setScore(0);
    setWrong([]);
    setStep("quiz");
  }

  function choose(choice: string) {
    if (!current || picked) return;
    setPicked(choice);
    const ok = choice === current.answer;
    setCorrect(ok);
    if (ok) setScore((s) => s + 1);
    else
      setWrong((w) => [
        ...w,
        { q: current.q, your: choice, ans: current.answer, mode: current.mode },
      ]);
  }

  function next() {
    setPicked(null);
    setCorrect(null);
    if (idx + 1 >= items.length) setStep("result");
    else setIdx((i) => i + 1);
  }

  function restart() {
    setStep("setup");
  }

  const total = items.length || 0;
  const progress = total ? Math.round(((idx + 1) / total) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#0b0f14] text-white">
      <div className="mx-auto max-w-3xl px-5 py-8">
        <header className="flex items-center justify-between">
          <div>
            <div className="text-xs tracking-widest text-white/50">OFFLINE PWA</div>
            <h1 className="text-2xl font-semibold leading-tight">
              Thai quiz 2
            </h1>
            <p className="text-sm text-white/60 mt-1">
              한국어 뜻 ↔ 발음(한글) 퀴즈로 “입으로” 외우는 용도.
            </p>
          </div>
          <div className="text-xs text-white/50 text-right">
            <div>vercel / vite</div>
            <div className="mt-1">
              {step === "quiz" ? `${idx + 1}/${total}` : ""}
            </div>
          </div>
        </header>

        {step === "setup" && (
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="flex flex-col gap-6">
              <section>
                <div className="text-sm text-white/70 mb-2">퀴즈 모드</div>
                <div className="flex flex-wrap gap-2">
                  <Pill
                    active={mode === "meaning_to_pron"}
                    onClick={() => setMode("meaning_to_pron")}
                  >
                    뜻 → 발음 고르기
                  </Pill>
                  <Pill
                    active={mode === "pron_to_meaning"}
                    onClick={() => setMode("pron_to_meaning")}
                  >
                    발음 → 뜻 고르기
                  </Pill>
                </div>
              </section>

              <section>
                <div className="text-sm text-white/70 mb-2">카테고리</div>
                <div className="flex flex-wrap gap-2">
                  {(
                    [
                      ["all", "전체"],
                      ["general", "기본"],
                      ["transport", "이동"],
                      ["hotel", "호텔"],
                      ["shopping", "쇼핑"],
                      ["flirt", "칭찬/가벼운 플러팅"],
                    ] as const
                  ).map(([k, label]) => (
                    <Pill
                      key={k}
                      active={tag === k}
                      onClick={() => setTag(k)}
                    >
                      {label}
                    </Pill>
                  ))}
                </div>
                <div className="mt-2 text-xs text-white/45">
                  현재 {filtered.length}개 문장/단어
                </div>
              </section>

              <section className="flex items-center gap-3">
                <div className="text-sm text-white/70">문제 수</div>
                <input
                  className="w-24 rounded-lg bg-black/30 border border-white/15 px-3 py-2 text-sm outline-none focus:border-white/35"
                  type="number"
                  min={5}
                  max={Math.max(5, filtered.length)}
                  value={count}
                  onChange={(e) => setCount(Number(e.target.value || 0))}
                />
                <div className="text-xs text-white/45">
                  (최대 {filtered.length})
                </div>
              </section>

              <button
                onClick={start}
                disabled={filtered.length === 0}
                className="rounded-xl bg-white text-black font-medium px-4 py-3 hover:bg-white/90 disabled:opacity-50"
              >
                시작하기
              </button>

              <div className="text-xs text-white/45 leading-relaxed">
                팁: 옵션(발음)은 “한글 표기”로만 나옵니다. 태국어 글자는 힌트로
                작게 표시돼요. (원하면 아예 숨기는 토글도 나중에 추가 가능)
              </div>
            </div>
          </div>
        )}

        {step === "quiz" && current && (
          <div className="mt-8">
            <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-white/60"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs text-white/50">
                    {mode === "meaning_to_pron"
                      ? "뜻 → 발음"
                      : "발음 → 뜻"}
                  </div>

                  {mode === "meaning_to_pron" ? (
                    <>
                      <div className="mt-2 text-3xl font-semibold tracking-tight">
                        {current.q.meaningKr}
                      </div>
                      <div className="mt-3 text-sm text-white/55">
                        <span className="font-medium text-white/70">
                          {current.q.thai}
                        </span>{" "}
                        · {current.q.roman}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="mt-2 text-3xl font-semibold tracking-tight">
                        {current.q.pronKr}
                      </div>
                      <div className="mt-3 text-sm text-white/55">
                        <span className="font-medium text-white/70">
                          {current.q.thai}
                        </span>{" "}
                        · {current.q.roman}
                      </div>
                    </>
                  )}
                </div>

                <div className="text-right">
                  <div className="text-xs text-white/50">점수</div>
                  <div className="text-2xl font-semibold">{score}</div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-3">
                {current.choices.map((c) => {
                  const isPicked = picked === c;
                  const isAnswer = c === current.answer;

                  const state =
                    picked == null
                      ? "idle"
                      : isAnswer
                      ? "answer"
                      : isPicked
                      ? "wrong"
                      : "idle";

                  const cls =
                    state === "answer"
                      ? "border-emerald-400/60 bg-emerald-400/10"
                      : state === "wrong"
                      ? "border-rose-400/60 bg-rose-400/10"
                      : "border-white/12 bg-black/20 hover:border-white/30";

                  return (
                    <button
                      key={c}
                      onClick={() => choose(c)}
                      className={[
                        "text-left rounded-xl border px-4 py-3 transition",
                        cls,
                      ].join(" ")}
                    >
                      <div className="text-lg font-medium">
                        {c}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-5 flex items-center justify-between">
                <div className="text-sm text-white/60">
                  {picked ? (
                    correct ? (
                      <span className="text-emerald-300">정답 ✅</span>
                    ) : (
                      <span className="text-rose-300">
                        오답 ❌ (정답: {current.answer})
                      </span>
                    )
                  ) : (
                    "선택하세요"
                  )}
                </div>

                <button
                  onClick={next}
                  disabled={!picked}
                  className="rounded-xl bg-white text-black font-medium px-4 py-2.5 hover:bg-white/90 disabled:opacity-50"
                >
                  다음
                </button>
              </div>
            </div>

            <div className="mt-3 text-xs text-white/45">
              * 발음 표기는 학습용 “한국어 표기”라서 사람마다 다르게 느낄 수 있어요.
            </div>
          </div>
        )}

        {step === "result" && (
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-white/50">결과</div>
                <div className="mt-1 text-3xl font-semibold">
                  {score} / {total}
                </div>
                <div className="mt-2 text-sm text-white/60">
                  오답 {wrong.length}개
                </div>
              </div>
              <button
                onClick={restart}
                className="rounded-xl bg-white text-black font-medium px-4 py-2.5 hover:bg-white/90"
              >
                다시 하기
              </button>
            </div>

            {wrong.length > 0 && (
              <div className="mt-6">
                <div className="text-sm text-white/75 mb-2">오답 노트</div>
                <div className="grid grid-cols-1 gap-3">
                  {wrong.slice(-30).reverse().map((w, i) => (
                    <div
                      key={i}
                      className="rounded-xl border border-white/10 bg-black/20 p-4"
                    >
                      <div className="text-xs text-white/50">
                        {w.q.thai} · {w.q.roman}
                      </div>
                      <div className="mt-1 text-lg font-semibold">
                        {w.mode === "meaning_to_pron" ? w.q.meaningKr : w.q.pronKr}
                      </div>
                      <div className="mt-2 text-sm text-white/70">
                        내 답: <span className="text-rose-300">{w.your}</span>
                        {"  "} / 정답:{" "}
                        <span className="text-emerald-300">{w.ans}</span>
                      </div>
                      <div className="mt-2 text-xs text-white/55">
                        뜻: {w.q.meaningKr} · 발음(한글): {w.q.pronKr}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6 text-xs text-white/45 leading-relaxed">
              오프라인 사용: 한 번이라도 접속(로딩)하면 캐시가 잡혀서 비행기 모드에서도
              열릴 확률이 높습니다. 설치(PWA)까지 하면 더 안정적이에요.
            </div>
          </div>
        )}

        <footer className="mt-10 text-center text-xs text-white/35">
          © Thai quiz 2 · offline-first PWA
        </footer>
      </div>
    </div>
  );
}
