import React, { useMemo, useState } from 'react';
import { PhoneShell } from './components/PhoneShell';
import { WrongTicker } from './components/WrongTicker';
import { categories } from './data/quizContent';
import { buildQuestions, findCategory, type Question } from './data/quizEngine';

type Screen = 'home' | 'quiz' | 'result' | 'review';

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [wrongIds, setWrongIds] = useState<string[]>([]);

  const cat = useMemo(() => findCategory(categories, categoryId), [categoryId]);

  const wrongTickerText = useMemo(() => {
    const map = new Map<string, string>();
    for (const c of categories) {
      for (const it of c.items) map.set(it.id, it.kr);
    }
    return wrongIds.map((id) => map.get(id) ?? id);
  }, [wrongIds]);

  function startCategory(id: string) {
    const c = findCategory(categories, id);
    if (!c) {
      // fail-safe: never blank screen
      setCategoryId(null);
      setScreen('home');
      return;
    }
    const qs = buildQuestions(c);
    setCategoryId(id);
    setQuestions(qs);
    setIdx(0);
    setSelected(null);
    setWrongIds([]);
    setScreen('quiz');
  }

  function answer(opt: string) {
    if (!questions[idx]) return;
    if (selected) return; // prevent double click
    setSelected(opt);

    const q = questions[idx];
    const isCorrect = opt === q.correct;
    if (!isCorrect) setWrongIds((prev) => (prev.includes(q.item.id) ? prev : [...prev, q.item.id]));

    window.setTimeout(() => {
      const next = idx + 1;
      if (next >= questions.length) {
        setScreen('result');
      } else {
        setIdx(next);
        setSelected(null);
      }
    }, 420);
  }

  function restart() {
    setScreen('home');
    setCategoryId(null);
    setQuestions([]);
    setIdx(0);
    setSelected(null);
    setWrongIds([]);
  }

  function startReview() {
    if (!cat) {
      restart();
      return;
    }
    const wrongItems = cat.items.filter((it) => wrongIds.includes(it.id));
    const tempCat = { ...cat, items: wrongItems };
    const qs = buildQuestions(tempCat);
    setQuestions(qs);
    setIdx(0);
    setSelected(null);
    setScreen('review');
  }

  const total = questions.length;
  const q = questions[idx];

  return (
    <PhoneShell>
      <header className="topBar">
        <div>
          <div className="brand">Thai Quiz</div>
          <div className="sub">발음 선택 퀴즈 · 모바일 터치 UX</div>
        </div>
        {screen !== 'home' && (
          <button className="ghostBtn" onClick={restart} aria-label="home">
            홈
          </button>
        )}
      </header>

      {/* Optional: wrong ticker */}
      {(screen === 'quiz' || screen === 'review') && <WrongTicker items={wrongTickerText} />}

      <main className="content">
        {screen === 'home' && (
          <>
            <div className="sectionTitle">카테고리</div>
            <div className="grid">
              {categories.map((c) => (
                <button key={c.id} className="card" onClick={() => startCategory(c.id)}>
                  <div className="cardTop">
                    <div className="cardTitle">{c.title}</div>
                    <div className="pill">{c.items.length}</div>
                  </div>
                  <div className="cardSub">{c.subtitle}</div>
                </button>
              ))}
            </div>
            <div className="hint">
              <span className="dot" />
              <span>
                화면이 빈 화면으로 멈추는 문제를 막기 위해, 카테고리 → 질문 생성 매핑을 한 파일에서 단일
                소스로 관리합니다.
              </span>
            </div>
          </>
        )}

        {(screen === 'quiz' || screen === 'review') && q && (
          <>
            <div className="progressRow">
              <div className="progressText">
                {cat?.title ?? '퀴즈'} · {idx + 1}/{total}
              </div>
              <div className="progressBar" aria-hidden="true">
                <div className="progressFill" style={{ width: `${Math.round(((idx + 1) / total) * 100)}%` }} />
              </div>
            </div>

            <div className="quizCard">
              <div className="krBig">{q.item.kr}</div>
              {q.item.thai ? <div className="thaiSmall">{q.item.thai}</div> : null}
              {q.item.pronRoman ? <div className="romanSmall">{q.item.pronRoman}</div> : null}
            </div>

            <div className="sectionTitle">발음을 고르세요</div>
            <div className="options">
              {q.options.map((opt) => {
                const isPicked = selected === opt;
                const isCorrect = opt === q.correct;
                const reveal = Boolean(selected);

                let cls = 'optBtn';
                if (reveal && isCorrect) cls += ' ok';
                if (reveal && isPicked && !isCorrect) cls += ' bad';

                return (
                  <button
                    key={opt}
                    className={cls}
                    onClick={() => answer(opt)}
                    disabled={Boolean(selected)}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </>
        )}

        {screen === 'result' && (
          <>
            <div className="resultCard">
              <div className="resultTitle">끝!</div>
              <div className="resultSub">
                총 {total}개 · 틀림 {wrongIds.length}개
              </div>
              <div className="resultActions">
                <button className="primaryBtn" onClick={restart}>카테고리로</button>
                <button
                  className="secondaryBtn"
                  onClick={startReview}
                  disabled={!wrongIds.length}
                  title={wrongIds.length ? '틀린 것만 복습' : '틀린 게 없어요'}
                >
                  틀린 것 복습
                </button>
              </div>
            </div>

            {wrongIds.length > 0 && (
              <div className="wrongList">
                <div className="sectionTitle">틀린 항목</div>
                <div className="chips">
                  {wrongTickerText.map((t) => (
                    <span key={t} className="chip">{t}</span>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* fail-safe */}
        {(screen === 'quiz' || screen === 'review') && !q && (
          <div className="errorCard">
            <div className="errorTitle">질문을 불러오지 못했어요</div>
            <div className="errorSub">콘텐츠 데이터가 비어있거나 매핑이 깨졌을 수 있습니다.</div>
            <button className="primaryBtn" onClick={restart}>홈으로</button>
          </div>
        )}
      </main>

      <footer className="bottomBar">
        <div className="bottomLeft">
          {screen === 'quiz' || screen === 'review' ? (
            <span className="mini">터치로 빠르게 선택하세요</span>
          ) : (
            <span className="mini">PWA 지원 · Vite + React</span>
          )}
        </div>
        <div className="bottomRight">
          {screen === 'quiz' || screen === 'review' ? (
            <span className="mini">틀린 것: {wrongIds.length}</span>
          ) : (
            <span className="mini">© {new Date().getFullYear()}</span>
          )}
        </div>
      </footer>
    </PhoneShell>
  );
}
