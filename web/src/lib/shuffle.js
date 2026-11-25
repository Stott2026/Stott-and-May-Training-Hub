// Shuffling for quizzes and scenarios, so the right answer isn't always in the same place.
export function shuffle(list) {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// A multiple-choice question with its answers in a new order. `correct` is zero-based (as in the
// quiz and quick checks) and is moved to match. "All of the above"-style answers stay last.
const STAYS_LAST = /\b(all|none|both) of (the )?(above|these)\b/i;
export function shuffleAnswers(question) {
  const options = question.options ?? [];
  const order = [...shuffle(options.map((_, i) => i).filter((i) => !STAYS_LAST.test(options[i]))), ...options.map((_, i) => i).filter((i) => STAYS_LAST.test(options[i]))];
  return { ...question, options: order.map((i) => options[i]), correct: order.indexOf(question.correct) };
}
