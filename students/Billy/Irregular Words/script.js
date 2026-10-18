(() => {
  const verbs = [
    {base:'be',past:'was / were',part:'been',meaning:'exist; feel; happen',example:'The evening was quiet.',gap:'The roads ___ wet after the storm.',answer:'were',form:'past simple'},
    {base:'become',past:'became',part:'become',meaning:'start to be',example:'She became a confident speaker.',gap:'The small project has ___ a popular app.',answer:'become',form:'past participle'},
    {base:'begin',past:'began',part:'begun',meaning:'start',example:'The film began at eight.',gap:'The meeting ___ shortly after lunch.',answer:'began',form:'past simple'},
    {base:'break',past:'broke',part:'broken',meaning:'damage into pieces',example:'I have broken my old phone.',gap:'He ___ the chocolate bar in half.',answer:'broke',form:'past simple'},
    {base:'bring',past:'brought',part:'brought',meaning:'carry something here',example:'They brought snacks for everyone.',gap:'Have you ___ your notebook?',answer:'brought',form:'past participle'},
    {base:'build',past:'built',part:'built',meaning:'make by putting parts together',example:'They built a tree house.',gap:'The team ___ a website for the club.',answer:'built',form:'past simple'},
    {base:'buy',past:'bought',part:'bought',meaning:'get something by paying for it',example:'I bought a warm coat.',gap:'We have ___ the tickets already.',answer:'bought',form:'past participle'},
    {base:'choose',past:'chose',part:'chosen',meaning:'decide between options',example:'He chose the blue one.',gap:'Maya has ___ a topic for her talk.',answer:'chosen',form:'past participle'},
    {base:'come',past:'came',part:'come',meaning:'move toward this place',example:'My friends came over yesterday.',gap:'My cousins ___ to visit last weekend.',answer:'came',form:'past simple'},
    {base:'cut',past:'cut',part:'cut',meaning:'divide with a sharp tool',example:'She cut the paper carefully.',gap:'I have ___ the vegetables for dinner.',answer:'cut',form:'past participle'},
    {base:'do',past:'did',part:'done',meaning:'perform an action',example:'We did our homework early.',gap:'Have you ___ the washing-up?',answer:'done',form:'past participle'},
    {base:'draw',past:'drew',part:'drawn',meaning:'make a picture with a pen or pencil',example:'He drew a map for us.',gap:'The child ___ a house on the board.',answer:'drew',form:'past simple'},
    {base:'drink',past:'drank',part:'drunk',meaning:'take liquid into your body',example:'I drank a glass of water.',gap:'She has ___ all her tea.',answer:'drunk',form:'past participle'},
    {base:'drive',past:'drove',part:'driven',meaning:'control a car or other vehicle',example:'They drove through the mountains.',gap:'Dad ___ us to the station yesterday.',answer:'drove',form:'past simple'},
    {base:'eat',past:'ate',part:'eaten',meaning:'put food in your mouth and swallow it',example:'We have eaten already.',gap:'I ___ breakfast before the train arrived.',answer:'ate',form:'past simple'},
    {base:'fall',past:'fell',part:'fallen',meaning:'move down from a higher place',example:'The leaves have fallen.',gap:'One of the books ___ off the shelf.',answer:'fell',form:'past simple'},
    {base:'feel',past:'felt',part:'felt',meaning:'experience an emotion or sensation',example:'She felt much better later.',gap:'I have ___ this way before.',answer:'felt',form:'past participle'},
    {base:'find',past:'found',part:'found',meaning:'discover something you were looking for',example:'He found his keys under the chair.',gap:'We ___ a quiet café near the station.',answer:'found',form:'past simple'},
    {base:'fly',past:'flew',part:'flown',meaning:'travel through the air',example:'They have flown to Rome.',gap:'The bird ___ across the garden.',answer:'flew',form:'past simple'},
    {base:'forget',past:'forgot',part:'forgotten',meaning:'not remember something',example:'I forgot to call my friend.',gap:'She has ___ where she parked the car.',answer:'forgotten',form:'past participle'},
    {base:'get',past:'got',part:'got / gotten',meaning:'receive, obtain, or become',example:'We got home before dark.',gap:'He has ___ much better at chess.',answer:'gotten',accepted:['got'],form:'past participle',note:'“Gotten” is especially common in American English; “got” is also correct in many varieties.'},
    {base:'give',past:'gave',part:'given',meaning:'hand something to someone',example:'She gave me a useful tip.',gap:'They have ___ us enough time.',answer:'given',form:'past participle'},
    {base:'go',past:'went',part:'gone',meaning:'move or travel to another place',example:'We went to the lake on Sunday.',gap:'I ___ home before it started raining.',answer:'went',form:'past simple'},
    {base:'have',past:'had',part:'had',meaning:'own, hold, or experience',example:'They had a long conversation.',gap:'We have ___ this book for years.',answer:'had',form:'past participle'},
    {base:'hear',past:'heard',part:'heard',meaning:'notice a sound',example:'I heard a knock at the door.',gap:'Have you ___ the latest news?',answer:'heard',form:'past participle'},
    {base:'keep',past:'kept',part:'kept',meaning:'continue to have or hold',example:'He kept the letter in a drawer.',gap:'She ___ the receipt just in case.',answer:'kept',form:'past simple'},
    {base:'know',past:'knew',part:'known',meaning:'have information or understand',example:'I knew the answer.',gap:'We have ___ each other since school.',answer:'known',form:'past participle'},
    {base:'leave',past:'left',part:'left',meaning:'go away from a place',example:'They left at six.',gap:'The bus ___ before we reached the stop.',answer:'left',form:'past simple'},
    {base:'lose',past:'lost',part:'lost',meaning:'be unable to find or keep something',example:'I lost one glove on the walk.',gap:'He has ___ his library card again.',answer:'lost',form:'past participle'},
    {base:'make',past:'made',part:'made',meaning:'create or prepare something',example:'We made dinner together.',gap:'She ___ a playlist for the trip.',answer:'made',form:'past simple'},
    {base:'meet',past:'met',part:'met',meaning:'come together or be introduced',example:'I met my new neighbour yesterday.',gap:'Have you ___ the new teacher?',answer:'met',form:'past participle'},
    {base:'pay',past:'paid',part:'paid',meaning:'give money for something',example:'He paid for lunch.',gap:'We ___ for the tickets online.',answer:'paid',form:'past simple'},
    {base:'put',past:'put',part:'put',meaning:'move something to a place',example:'She put the keys on the table.',gap:'I have ___ the clean cups away.',answer:'put',form:'past participle'},
    {base:'read',past:'read',part:'read',meaning:'look at and understand written words',example:'He read the note twice.',gap:'We ___ the instructions before starting.',answer:'read',form:'past simple'},
    {base:'run',past:'ran',part:'run',meaning:'move quickly on your feet',example:'They ran to catch the bus.',gap:'I have ___ five kilometres this week.',answer:'run',form:'past participle'},
    {base:'say',past:'said',part:'said',meaning:'speak words',example:'She said thank you.',gap:'He ___ he would be there at noon.',answer:'said',form:'past simple'},
    {base:'see',past:'saw',part:'seen',meaning:'notice with your eyes',example:'We saw a rainbow after the rain.',gap:'Have you ___ that film?',answer:'seen',form:'past participle'},
    {base:'sell',past:'sold',part:'sold',meaning:'give something in exchange for money',example:'They sold their old bicycles.',gap:'The shop ___ all of its fresh bread.',answer:'sold',form:'past simple'},
    {base:'send',past:'sent',part:'sent',meaning:'cause something to go somewhere',example:'I sent her a message.',gap:'She has ___ the email to the group.',answer:'sent',form:'past participle'},
    {base:'sit',past:'sat',part:'sat',meaning:'rest with your body supported',example:'We sat by the window.',gap:'He ___ beside me during the concert.',answer:'sat',form:'past simple'},
    {base:'sleep',past:'slept',part:'slept',meaning:'rest with your eyes closed',example:'The baby slept for two hours.',gap:'I have ___ very well this week.',answer:'slept',form:'past participle'},
    {base:'speak',past:'spoke',part:'spoken',meaning:'talk to someone',example:'She spoke clearly at the meeting.',gap:'They ___ with the manager yesterday.',answer:'spoke',form:'past simple'},
    {base:'take',past:'took',part:'taken',meaning:'carry or move something with you',example:'He took an umbrella.',gap:'I have ___ a few photos today.',answer:'taken',form:'past participle'},
    {base:'teach',past:'taught',part:'taught',meaning:'help someone learn',example:'My aunt taught me to bake.',gap:'He ___ English in Spain for a year.',answer:'taught',form:'past simple'},
    {base:'tell',past:'told',part:'told',meaning:'give information in words',example:'They told us a funny story.',gap:'Have you ___ her the good news?',answer:'told',form:'past participle'},
    {base:'think',past:'thought',part:'thought',meaning:'use your mind to consider something',example:'I thought about your suggestion.',gap:'She ___ the answer was correct.',answer:'thought',form:'past simple'},
    {base:'understand',past:'understood',part:'understood',meaning:'know the meaning of something',example:'We understood the directions.',gap:'I have ___ the main idea now.',answer:'understood',form:'past participle'},
    {base:'wear',past:'wore',part:'worn',meaning:'have clothes on your body',example:'He wore a red scarf.',gap:'She has ___ those boots every winter.',answer:'worn',form:'past participle'},
    {base:'win',past:'won',part:'won',meaning:'be the best or first in a contest',example:'Their team won the match.',gap:'Our class ___ the quiz last Friday.',answer:'won',form:'past simple'},
    {base:'write',past:'wrote',part:'written',meaning:'make words with a pen or keyboard',example:'I wrote a letter to my cousin.',gap:'He has ___ three pages so far.',answer:'written',form:'past participle'}
  ];

  
  const extraGapSentences = [
    {base:'go',gap:'We ___ down the path until we reached the river.',answer:'went',form:'past simple'},
    {base:'go',gap:'She has ___ to the shop already.',answer:'gone',form:'past participle'},
    {base:'eat',gap:'By noon, they had ___ all the sandwiches.',answer:'eaten',form:'past participle'},
    {base:'write',gap:'I ___ three postcards while I was on holiday.',answer:'wrote',form:'past simple'},
    {base:'speak',gap:'The guide has ___ to every visitor.',answer:'spoken',form:'past participle'},
    {base:'take',gap:'I ___ the wrong umbrella by mistake.',answer:'took',form:'past simple'},
    {base:'see',gap:'We ___ a fox near the woods yesterday.',answer:'saw',form:'past simple'},
    {base:'make',gap:'They have ___ a few changes to the plan.',answer:'made',form:'past participle'},
    {base:'find',gap:'Have you ___ your keys yet?',answer:'found',form:'past participle'},
    {base:'begin',gap:'The course ___ with a short introduction.',answer:'began',form:'past simple'},
    {base:'begin',gap:'The match has ___, so please take your seats.',answer:'begun',form:'past participle'},
    {base:'break',gap:'The window was ___ during the storm.',answer:'broken',form:'past participle'},
    {base:'choose',gap:'He ___ the first answer on the page.',answer:'chose',form:'past simple'},
    {base:'drive',gap:'She ___ home through heavy rain last night.',answer:'drove',form:'past simple'},
    {base:'give',gap:'They ___ us directions to the museum.',answer:'gave',form:'past simple'},
    {base:'run',gap:'The children ___ to the playground after lunch.',answer:'ran',form:'past simple'},
    {base:'teach',gap:'Ms. Lee has ___ here for ten years.',answer:'taught',form:'past participle'},
    {base:'think',gap:'I ___ about your suggestion last night.',answer:'thought',form:'past simple'},
    {base:'fly',gap:'My grandparents ___ in from Lisbon yesterday.',answer:'flew',form:'past simple'},
    {base:'fly',gap:'Have you ever ___ over the Alps?',answer:'flown',form:'past participle'},
    {base:'forget',gap:'I ___ to bring my water bottle this morning.',answer:'forgot',form:'past simple'},
    {base:'keep',gap:'We ___ the old photographs in a wooden box.',answer:'kept',form:'past simple'},
    {base:'meet',gap:'I ___ him at the library yesterday.',answer:'met',form:'past simple'},
    {base:'tell',gap:'He has ___ me the same story twice.',answer:'told',form:'past participle'},
    {base:'build',gap:'They have ___ a new footbridge across the stream.',answer:'built',form:'past participle'},
    {base:'bring',gap:'She ___ her camera on the school trip.',answer:'brought',form:'past simple'},
    {base:'pay',gap:'We ___ the bill before we left.',answer:'paid',form:'past simple'},
    {base:'win',gap:'Our team has ___ four games this season.',answer:'won',form:'past participle'}
  ];
  const gapExercises = [
    ...verbs.map((verb) => ({...verb, verb})),
    ...extraGapSentences.map((exercise) => ({...exercise, verb:verbs.find((verb) => verb.base === exercise.base)}))
  ];
  const $ = (id) => document.getElementById(id);
  const shuffle = (items) => {
    const result = [...items];
    for (let i = result.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  };
  const readCookie = (name) => {
    try {
      const prefix = name + '=';
      const part = document.cookie.split('; ').find((item) => item.startsWith(prefix));
      if (!part) return null;
      try { return decodeURIComponent(part.slice(prefix.length)); } catch { return part.slice(prefix.length); }
    } catch { return null; }
  };
  const writeCookie = (name, value) => {
    try {
      const secure = location.protocol === 'https:' ? '; Secure' : '';
      document.cookie = name + '=' + encodeURIComponent(value) + '; Path=/; Max-Age=15552000; SameSite=Lax' + secure;
      return readCookie(name) === value;
    } catch { return false; }
  };
  const readLocal = (key) => { try { return localStorage.getItem(key); } catch { return null; } };
  const writeLocal = (key, value) => { try { localStorage.setItem(key, value); return true; } catch { return false; } };
  const cookieNotice = $('cookieNotice');
  const consentAccepted = readCookie('learning_consent') === 'yes' || readLocal('learning_consent') === 'yes';
  let canSave = consentAccepted;
  try {
    if (consentAccepted || sessionStorage.getItem('learning_consent_dismissed') === 'yes') cookieNotice.hidden = true;
  } catch { if (consentAccepted) cookieNotice.hidden = true; }
  let saved = {};
  if (canSave) {
    try {
      const raw = readCookie('learning_progress') || readLocal('learning_progress');
      if (raw) saved = JSON.parse(raw);
    } catch { saved = {}; }
  }
  let cardOrder = shuffle(verbs.map((_, i) => i));
  let cardIndex = 0;
  let gapOrder = shuffle(gapExercises.map((_, i) => i));
  let gapCursor = 0;
  let previousGap = -1;
  let gapCompleted = Number(saved.gapCompleted) || 0;
  let spellingCompleted = Number(saved.spellingCompleted) || 0;
  let revealed = false;
  let learned = new Set(Array.isArray(saved.learned) ? saved.learned.filter((word) => verbs.some((verb) => verb.base === word)) : []);
  let currentGap = null;
  let currentSpelling = null;
  let gapCorrect = false;
  let spellingCorrect = false;
  const saveProgress = () => {
    if (!canSave) return;
    const data = JSON.stringify({learned:[...learned], gapCompleted, spellingCompleted, savedAt:new Date().toISOString()});
    if (!writeCookie('learning_progress', data)) writeLocal('learning_progress', data);
  };
  $('acceptCookies').addEventListener('click', () => {
    canSave = true;
    writeCookie('learning_consent', 'yes');
    writeLocal('learning_consent', 'yes');
    cookieNotice.hidden = true;
    saveProgress();
  });
  $('declineCookies').addEventListener('click', () => {
    cookieNotice.hidden = true;
    try { sessionStorage.setItem('learning_consent_dismissed', 'yes'); } catch {}
  });
  const drawGap = () => {
    if (gapCursor >= gapOrder.length) {
      gapOrder = shuffle(gapExercises.map((_, i) => i));
      if (gapOrder.length > 1 && gapOrder[0] === previousGap) [gapOrder[0], gapOrder[1]] = [gapOrder[1], gapOrder[0]];
      gapCursor = 0;
    }
    previousGap = gapOrder[gapCursor];
    return gapExercises[gapOrder[gapCursor++]];
  };
  const normalize = (value) => value.trim().toLowerCase().replace(/[’']/g, "'").replace(/\s+/g, ' ');
  const randomVerb = (avoid) => {
    let index = Math.floor(Math.random() * verbs.length);
    if (verbs.length > 1) while (index === avoid) index = Math.floor(Math.random() * verbs.length);
    return verbs[index];
  };
  const setProgress = () => {
    $('progressText').textContent = learned.size + ' learned';
    $('progressText').title = gapCompleted + ' sentence answers · ' + spellingCompleted + ' spelling answers saved';
  };
  const setTab = (button) => {
    document.querySelectorAll('.tab').forEach((tab) => {
      const active = tab === button;
      tab.classList.toggle('active', active);
      tab.setAttribute('aria-selected', String(active));
      const panel = $(tab.dataset.panel);
      panel.hidden = !active;
      panel.classList.toggle('active', active);
    });
  };
  document.querySelectorAll('.tab').forEach((button) => button.addEventListener('click', () => setTab(button)));

  function renderCard() {
    const verb = verbs[cardOrder[cardIndex]];
    $('cardBase').textContent = verb.base;
    $('cardIndex').textContent = String(cardIndex + 1).padStart(2, '0');
    $('cardCounter').textContent = `CARD ${String(cardIndex + 1).padStart(2, '0')} / ${verbs.length}`;
    $('cardPrompt').textContent = revealed ? '' : 'Try to remember the forms before you reveal them.';
    $('cardPast').textContent = verb.past;
    $('cardPart').textContent = verb.part;
    $('cardMeaning').textContent = verb.meaning;
    $('cardExample').textContent = verb.example;
    ['cardForms','cardMeaning','cardExample'].forEach((id) => $(id).classList.toggle('hidden', !revealed));
    $('revealCard').classList.toggle('hidden', revealed);
    $('againCard').disabled = !revealed;
    $('knowCard').disabled = !revealed;
    setProgress();
  }
  $('revealCard').addEventListener('click', () => { revealed = true; renderCard(); });
  $('againCard').addEventListener('click', () => nextCard(false));
  $('knowCard').addEventListener('click', () => {
    learned.add(verbs[cardOrder[cardIndex]].base);
    setProgress();
    saveProgress();
    nextCard();
  });
  $('shuffleCards').addEventListener('click', () => {
    const previous = cardOrder[cardIndex];
    cardOrder = shuffle(verbs.map((_, i) => i));
    if (cardOrder.length > 1 && cardOrder[0] === previous) [cardOrder[0], cardOrder[1]] = [cardOrder[1], cardOrder[0]];
    cardIndex = 0;
    revealed = false;
    renderCard();
  });
  function nextCard() {
    if (cardIndex === cardOrder.length - 1) {
      const previous = cardOrder[cardIndex];
      cardOrder = shuffle(verbs.map((_, i) => i));
      if (cardOrder.length > 1 && cardOrder[0] === previous) [cardOrder[0], cardOrder[1]] = [cardOrder[1], cardOrder[0]];
      cardIndex = 0;
    } else cardIndex += 1;
    revealed = false;
    renderCard();
  }

  function renderGapSentence(revealAnswer, isCorrect = false) {
    const sentence = currentGap.gap;
    const markerIndex = sentence.indexOf('___');
    const before = sentence.slice(0, markerIndex);
    const after = sentence.slice(markerIndex + 3);
    const answer = document.createElement('span');
    answer.className = revealAnswer ? `blank filled${isCorrect ? ' answer-correct' : ''}` : 'blank';
    answer.textContent = revealAnswer ? currentGap.displayAnswer : '________';
    $('gapSentence').replaceChildren(document.createTextNode(before), answer, document.createTextNode(after));
  }
  function newGap() {
    const exercise = drawGap();

    currentGap = {...exercise};
    gapCorrect = false;
    currentGap.displayAnswer = currentGap.answer;
    $('gapTense').textContent = currentGap.form.toUpperCase();
    $('gapFormCue').textContent = currentGap.form;
    $('gapBase').textContent = currentGap.verb.base;
    renderGapSentence(false);
    $('gapAnswer').value = '';
    $('gapAnswer').disabled = false;
    $('gapFeedback').textContent = '';
    $('gapFeedback').className = 'feedback';
    $('gapForm').querySelector('button').textContent = 'Check →';
    $('gapAnswer').focus({preventScroll:true});
  }
  $('gapForm').addEventListener('submit', (event) => {
    event.preventDefault();
    if (!currentGap || gapCorrect) return;
    const typed = normalize($('gapAnswer').value);
    const feedback = $('gapFeedback');
    if (!typed) {
      feedback.textContent = 'Type your answer first, then check it.';
      feedback.className = 'feedback';
      return;
    }
    const accepted = [currentGap.answer, ...(currentGap.accepted || [])].map(normalize);
    gapCorrect = true;
    gapCompleted += 1;
    setProgress();
    saveProgress();
    const isCorrect = accepted.includes(typed);
    currentGap.displayAnswer = isCorrect ? typed : currentGap.answer;
    renderGapSentence(true, isCorrect);
    $('gapAnswer').disabled = true;
    if (isCorrect) {
      feedback.textContent = `Correct — ${currentGap.displayAnswer} is the ${currentGap.form} form of ${currentGap.verb.base}.${currentGap.note ? ` ${currentGap.note}` : ''}`;
      feedback.className = 'feedback correct';
      $('gapForm').querySelector('button').textContent = 'Correct ✓';
    } else {
      feedback.textContent = `Your version is wrong. The correct answer is “${currentGap.answer}” — the ${currentGap.form} form of “${currentGap.verb.base}”.`;
      feedback.className = 'feedback incorrect';
      $('gapForm').querySelector('button').textContent = 'Answer shown';
    }
  });
  $('nextGap').addEventListener('click', newGap);

  function makePattern(word) {
    const letters = [...word];
    const candidates = Array.from({length:Math.max(0, word.length - 2)}, (_, index) => index + 1);
    const hiddenCount = Math.min(candidates.length, word.length < 6 ? 1 : 2 + Math.floor(Math.random() * 2));
    for (let i = candidates.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1)); [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
    }
    candidates.slice(0, hiddenCount).forEach((index) => { letters[index] = ''; });
    const pattern = $('letterPattern'); pattern.replaceChildren();
    letters.forEach((letter) => {
      const cell = document.createElement('span'); cell.className = `letter-cell${letter ? '' : ' missing'}`;
      cell.textContent = letter || '＿'; pattern.appendChild(cell);
    });
  }
  function newSpelling() {
    currentSpelling = randomVerb(currentSpelling ? verbs.indexOf(currentSpelling.verb) : -1);
    spellingCorrect = false;
    const usePart = Math.random() < .5;
    const answer = usePart ? currentSpelling.part.split(' / ')[0] : currentSpelling.past.split(' / ')[0];
    currentSpelling = {verb:currentSpelling, form:usePart ? 'past participle' : 'past simple', answer};
    $('spellingTense').textContent = currentSpelling.form.toUpperCase();
    $('spellingBase').textContent = currentSpelling.verb.base;
    $('spellingAnswer').value = '';
    $('spellingAnswer').disabled = false;
    $('spellingFeedback').textContent = '';
    $('spellingFeedback').className = 'feedback';
    $('spellingForm').querySelector('button').textContent = 'Check →';
    makePattern(answer);
  }
  $('spellingForm').addEventListener('submit', (event) => {
    event.preventDefault();
    if (!currentSpelling || spellingCorrect) return;
    const feedback = $('spellingFeedback');
    if (normalize($('spellingAnswer').value) === normalize(currentSpelling.answer)) {
      spellingCorrect = true;
      spellingCompleted += 1;
      setProgress();
      saveProgress();
      feedback.textContent = `Correct — ${currentSpelling.answer} is the ${currentSpelling.form} of ${currentSpelling.verb.base}.`;
      feedback.className = 'feedback correct';
      $('spellingAnswer').disabled = true;
      $('spellingForm').querySelector('button').textContent = 'Correct ✓';
    } else {
      feedback.textContent = 'Not quite. Look at the visible letters and try again.';
      feedback.className = 'feedback incorrect';
    }
  });
  $('nextSpelling').addEventListener('click', newSpelling);
  renderCard(); newGap(); newSpelling();
})();