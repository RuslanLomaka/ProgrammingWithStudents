const state = {
  allQuestions: [],
  round: [],
  index: 0,
  score: 0,
  streak: 0,
  words: new Set(),
  roundSize: 10,
  sound: true,
  answered: false
};

const elements = {
  card: document.querySelector("#questionCard"),
  results: document.querySelector("#resultsCard"),
  error: document.querySelector("#loadingError"),
  counter: document.querySelector("#questionCounter"),
  progress: document.querySelector("#progressBar"),
  level: document.querySelector("#levelLabel"),
  emoji: document.querySelector("#animalEmoji"),
  animal: document.querySelector("#animalName"),
  question: document.querySelector("#questionText"),
  answers: document.querySelector("#answerButtons"),
  feedback: document.querySelector("#feedback"),
  verdictIcon: document.querySelector("#verdictIcon"),
  verdict: document.querySelector("#verdictText"),
  correctAnswer: document.querySelector("#correctAnswerText"),
  explanation: document.querySelector("#factExplanation"),
  vocabWord: document.querySelector("#vocabWord"),
  vocabDefinition: document.querySelector("#vocabDefinition"),
  source: document.querySelector("#sourceLink"),
  next: document.querySelector("#nextButton"),
  score: document.querySelector("#scoreValue"),
  streak: document.querySelector("#streakValue"),
  words: document.querySelector("#wordsValue"),
  sound: document.querySelector("#soundToggle"),
  resultTitle: document.querySelector("#resultTitle"),
  resultSummary: document.querySelector("#resultSummary"),
  finalScore: document.querySelector("#finalScore"),
  playAgain: document.querySelector("#playAgainButton")
};

function shuffled(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
  }
  return copy;
}

function buildBalancedRound(size) {
  if (size >= state.allQuestions.length) return shuffled(state.allQuestions);
  const levels = ["easy", "curious", "expert"];
  const buckets = Object.fromEntries(levels.map((level) => [level, shuffled(state.allQuestions.filter((item) => item.level === level))]));
  const round = [];
  let cursor = 0;
  while (round.length < size) {
    const level = levels[cursor % levels.length];
    if (buckets[level].length) round.push(buckets[level].pop());
    cursor += 1;
  }
  return shuffled(round);
}

function startRound() {
  state.round = buildBalancedRound(state.roundSize);
  state.index = 0;
  state.score = 0;
  state.streak = 0;
  state.words = new Set();
  elements.results.hidden = true;
  elements.card.hidden = false;
  updateStats();
  renderQuestion();
}

function renderQuestion() {
  const item = state.round[state.index];
  state.answered = false;
  elements.card.classList.remove("answered");
  elements.feedback.hidden = true;
  elements.feedback.classList.remove("wrong");
  elements.answers.hidden = false;
  elements.answers.querySelectorAll("button").forEach((button) => {
    button.disabled = false;
    button.classList.remove("selected-correct", "selected-wrong");
  });

  elements.counter.textContent = `QUESTION ${state.index + 1} / ${state.round.length}`;
  elements.progress.style.width = `${(state.index / state.round.length) * 100}%`;
  elements.level.textContent = item.level.toUpperCase();
  elements.level.className = `level-badge ${item.level}`;
  if (item.emoji.endsWith(".svg")) {
    elements.emoji.innerHTML = `<img src="${item.emoji}" alt="">`;
  } else {
    elements.emoji.textContent = item.emoji;
  }
  elements.animal.textContent = `${item.animal} · ${item.category}`;
  elements.question.textContent = item.statement;
  elements.next.innerHTML = state.index === state.round.length - 1 ? "See my result <span aria-hidden=\"true\">→</span>" : "Next animal <span aria-hidden=\"true\">→</span>";
}

function answerQuestion(value, selectedButton) {
  if (state.answered) return;
  state.answered = true;
  elements.card.classList.add("answered");
  const item = state.round[state.index];
  const isCorrect = value === item.answer;

  elements.answers.querySelectorAll("button").forEach((button) => {
    button.disabled = true;
    if (button === selectedButton) button.classList.add(isCorrect ? "selected-correct" : "selected-wrong");
    if (button.dataset.answer === String(item.answer)) button.classList.add("selected-correct");
  });

  if (isCorrect) {
    state.score += 1;
    state.streak += 1;
    elements.verdictIcon.textContent = "✓";
    elements.verdict.textContent = state.streak >= 3 ? `${state.streak} in a row!` : "Great instinct!";
    playTone(640, 0.09);
    setTimeout(() => playTone(820, 0.1), 80);
  } else {
    state.streak = 0;
    elements.feedback.classList.add("wrong");
    elements.verdictIcon.textContent = "!";
    elements.verdict.textContent = "Surprising, isn't it?";
    playTone(220, 0.16);
  }

  state.words.add(item.vocab.word);
  elements.correctAnswer.textContent = `The statement is ${item.answer ? "true" : "false"}.`;
  elements.explanation.textContent = item.fact;
  elements.vocabWord.textContent = item.vocab.word;
  elements.vocabDefinition.textContent = item.vocab.definition;
  elements.source.textContent = `${item.source.label} ↗`;
  elements.source.href = item.source.url;
  elements.feedback.hidden = false;
  updateStats();
  elements.feedback.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function nextQuestion() {
  if (!state.answered) return;
  state.index += 1;
  if (state.index >= state.round.length) {
    showResults();
  } else {
    renderQuestion();
  }
}

function showResults() {
  elements.card.hidden = true;
  elements.results.hidden = false;
  elements.progress.style.width = "100%";
  elements.counter.textContent = "ROUND COMPLETE";
  const ratio = state.score / state.round.length;
  if (ratio === 1) {
    elements.resultTitle.textContent = "Perfect expedition!";
    elements.resultSummary.textContent = "You spotted every wild truth and every sneaky myth. That is expert-level animal knowledge.";
  } else if (ratio >= 0.7) {
    elements.resultTitle.textContent = "Wildlife expert!";
    elements.resultSummary.textContent = "Excellent work. You know the record breakers and picked up a whole trail of useful English words.";
  } else if (ratio >= 0.4) {
    elements.resultTitle.textContent = "Curious explorer!";
    elements.resultSummary.textContent = "Good start. The surprising answers are the ones your brain is most likely to remember next time.";
  } else {
    elements.resultTitle.textContent = "Adventure begun!";
    elements.resultSummary.textContent = "Animals are full of surprises. Try another shuffled round and see how quickly your score grows.";
  }
  elements.finalScore.textContent = `${state.score}/${state.round.length}`;
  playTone(520, 0.12);
  setTimeout(() => playTone(660, 0.12), 100);
  setTimeout(() => playTone(790, 0.18), 200);
}

function updateStats() {
  elements.score.textContent = state.score;
  elements.streak.textContent = state.streak;
  elements.words.textContent = state.words.size;
}

function playTone(frequency, duration) {
  if (!state.sound || !window.AudioContext) return;
  const context = new AudioContext();
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = "sine";
  oscillator.frequency.value = frequency;
  gain.gain.setValueAtTime(0.045, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + duration);
  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start();
  oscillator.stop(context.currentTime + duration);
  oscillator.addEventListener("ended", () => context.close());
}

elements.answers.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-answer]");
  if (button) answerQuestion(button.dataset.answer === "true", button);
});

elements.next.addEventListener("click", nextQuestion);
elements.playAgain.addEventListener("click", startRound);

document.querySelectorAll(".round-option").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".round-option").forEach((option) => option.classList.toggle("active", option === button));
    state.roundSize = Number(button.dataset.round);
    if (state.allQuestions.length) startRound();
  });
});

elements.sound.addEventListener("click", () => {
  state.sound = !state.sound;
  elements.sound.setAttribute("aria-pressed", String(state.sound));
  elements.sound.title = state.sound ? "Turn sounds off" : "Turn sounds on";
  elements.sound.querySelector(".sound-label").textContent = state.sound ? "Sound on" : "Sound off";
  elements.sound.firstElementChild.textContent = state.sound ? "♪" : "×";
});

fetch("animal-facts.json")
  .then((response) => {
    if (!response.ok) throw new Error(`Question data returned ${response.status}`);
    return response.json();
  })
  .then((data) => {
    if (!Array.isArray(data) || data.length < 20) throw new Error("Question data is incomplete");
    state.allQuestions = data;
    startRound();
  })
  .catch((error) => {
    console.error(error);
    elements.card.hidden = true;
    elements.error.hidden = false;
  });
