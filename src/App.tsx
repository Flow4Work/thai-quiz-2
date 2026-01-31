import { quizData } from './data/quizData';
import { QuizCard } from './components/QuizCard';

export default function App() {
  const item = quizData[0].items[0];
  return (
    <div style={{ padding: 24 }}>
      <QuizCard item={item} />
    </div>
  );
}
