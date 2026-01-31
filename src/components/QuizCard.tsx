export function QuizCard({ item }: any) {
  return (
    <div style={{ border: '1px solid #333', padding: 24 }}>
      <h1>{item.kr}</h1>
      <p>{item.pron}</p>
    </div>
  );
}
