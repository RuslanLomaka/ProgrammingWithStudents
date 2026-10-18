(() => {
  const segmentNames = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'dp'];
  const numbers = {0:'abcdef',1:'bc',2:'abged',3:'abgcd',4:'fgbc',5:'afgcd',6:'afgecd',7:'abc',8:'abcdefg',9:'abfgcd'};
  const wordPositions = {
    IT:[0,0,2], IS:[0,3,2], A:[0,6,1], QUARTER:[1,0,7],
    ONE:[2,0,3], TWO:[2,4,3], THREE:[2,8,5],
    FOUR:[3,0,4], FIVE:[3,5,4], SIX:[3,10,3],
    SEVEN:[4,0,5], EIGHT:[4,6,5], NINE:[4,12,4],
    TEN:[5,0,3], ELEVEN:[5,4,6], TWELVE:[6,0,6], HALF:[6,7,4],
    THIRTEEN:[7,0,8], FOURTEEN:[8,0,8], FIFTEEN:[9,0,7], SIXTEEN:[9,8,7],
    SEVENTEEN:[10,0,9], EIGHTEEN:[11,0,8], NINETEEN:[11,9,8], TWENTY:[12,0,6],
    MINUTE:[13,0,6], MINUTES:[13,7,7], PAST:[14,0,4], TO:[14,5,2], OCLOCK:[19,0,6],
    HOUR_ONE:[15,0,3], HOUR_TWO:[15,4,3], HOUR_THREE:[15,8,5],
    HOUR_FOUR:[16,0,4], HOUR_FIVE:[16,5,4], HOUR_SIX:[16,10,3],
    HOUR_SEVEN:[17,0,5], HOUR_EIGHT:[17,6,5], HOUR_NINE:[17,12,4],
    HOUR_TEN:[18,0,3], HOUR_ELEVEN:[18,4,6], HOUR_TWELVE:[18,11,6]
  };
  const hourNames = {1:'HOUR_ONE',2:'HOUR_TWO',3:'HOUR_THREE',4:'HOUR_FOUR',5:'HOUR_FIVE',6:'HOUR_SIX',7:'HOUR_SEVEN',8:'HOUR_EIGHT',9:'HOUR_NINE',10:'HOUR_TEN',11:'HOUR_ELEVEN',12:'HOUR_TWELVE'};
  const smallNumbers = {1:'ONE',2:'TWO',3:'THREE',4:'FOUR',5:'FIVE',6:'SIX',7:'SEVEN',8:'EIGHT',9:'NINE',10:'TEN',11:'ELEVEN',12:'TWELVE',13:'THIRTEEN',14:'FOURTEEN',15:'FIFTEEN',16:'SIXTEEN',17:'SEVENTEEN',18:'EIGHTEEN',19:'NINETEEN',20:'TWENTY'};
  const digits = [...document.querySelectorAll('.digit')];
  const tickContainer = document.getElementById('ticks');
  const hourHand = document.getElementById('hourHand');
  const minuteHand = document.getElementById('minuteHand');
  const secondHand = document.getElementById('secondHand');
  const dateEl = document.getElementById('date');
  const timezoneEl = document.getElementById('timezone');
  const localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
  const localClockFormatter = new Intl.DateTimeFormat('en-GB', {
    timeZone:localTimeZone, hour:'2-digit', minute:'2-digit', second:'2-digit', hourCycle:'h23'
  });
  const localDateFormatter = new Intl.DateTimeFormat(undefined, {
    timeZone:localTimeZone, weekday:'long', month:'long', day:'numeric', year:'numeric'
  });
  const localZoneFormatter = new Intl.DateTimeFormat(undefined, {
    timeZone:localTimeZone, timeZoneName:'short'
  });
  const wordFace = document.getElementById('wordFace');
  const wordGrid = document.getElementById('wordGrid');
  const timeSlider = document.getElementById('timeSlider');
  const debugReadout = document.getElementById('debugReadout');
  const sliderHelp = document.getElementById('sliderHelp');
  const sourceButtons = [...document.querySelectorAll('.source-button')];
  const clockCard = document.querySelector('.clock-card');
  let timeSource = 'live';
  let debugMinute = 0;
  const modeButtons = [...document.querySelectorAll('.mode-button')];
  const panels = {digital:document.getElementById('digitalView'),analog:document.getElementById('analogView'),words:document.getElementById('wordsView')};

  digits.forEach((digit) => segmentNames.forEach((name) => {
    const segment = document.createElement('i'); segment.className = `segment ${name}`; digit.appendChild(segment);
  }));
  for (let index = 0; index < 60; index += 1) {
    const tick = document.createElement('i'); tick.className = `tick${index % 5 === 0 ? ' major' : ''}`;
    tick.style.transform = `rotate(${index * 6}deg)`; tickContainer.appendChild(tick);
  }
  for (let row = 0; row < 20; row += 1) {
    for (let col = 0; col < 20; col += 1) {
      const cell = document.createElement('span'); cell.className = 'word-letter'; cell.textContent = String.fromCharCode(65 + Math.floor(Math.random() * 26));
      cell.dataset.cell = `${row},${col}`; wordGrid.appendChild(cell);
    }
  }
  Object.entries(wordPositions).forEach(([word, [row, start, length]]) => {
    const cells = [...wordGrid.querySelectorAll('.word-letter')];
    const visibleWord = word.replace(/^HOUR_/, '');
    [...visibleWord].forEach((letter, index) => { cells[row * 20 + start + index].textContent = letter; });
  });

  modeButtons.forEach((button) => button.addEventListener('click', () => {
    const mode = button.dataset.mode;
    modeButtons.forEach((item) => {
      const selected = item === button; item.classList.toggle('active', selected); item.setAttribute('aria-pressed', String(selected));
    });
    Object.entries(panels).forEach(([name, panel]) => panel.classList.toggle('active', name === mode));
    clockCard.classList.toggle('word-mode', mode === 'words');
  }));


  function selectTimeSource(source) {
    timeSource = source;
    sourceButtons.forEach((button) => {
      const selected = button.dataset.source === source;
      button.classList.toggle('active', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
    timeSlider.disabled = source !== 'debug';
    sliderHelp.textContent = source === 'debug'
      ? 'Debug time is simulated on the word clock. Drag the slider to choose any minute of the day.'
      : 'Showing your actual local time. Select Debug Time to move the slider.';
    update();
  }
  sourceButtons.forEach((button) => button.addEventListener('click', () => selectTimeSource(button.dataset.source)));
  timeSlider.addEventListener('input', () => {
    debugMinute = Number(timeSlider.value);
    if (timeSource !== 'debug') selectTimeSource('debug');
    else update();
  });
  const pad = (value) => String(value).padStart(2, '0');
  function numberTokens(value) {
    if (value <= 20) return [smallNumbers[value]];
    return ['TWENTY', smallNumbers[value - 20]];
  }
  function getPhrase(hour, minute) {
    const currentHour = hour % 12 || 12;
    const nextHour = currentHour % 12 + 1;
    if (minute === 0) return ['IT','IS',hourNames[currentHour],'OCLOCK'];
    if (minute === 15) return ['IT','IS','A','QUARTER','PAST',hourNames[currentHour]];
    if (minute === 30) return ['IT','IS','HALF','PAST',hourNames[currentHour]];
    if (minute === 45) return ['IT','IS','A','QUARTER','TO',hourNames[nextHour]];

    const toNextHour = minute > 30;
    const count = toNextHour ? 60 - minute : minute;
    const phrase = ['IT','IS',...numberTokens(count)];
    if (count % 5 !== 0) phrase.push(count === 1 ? 'MINUTE' : 'MINUTES');
    phrase.push(toNextHour ? 'TO' : 'PAST', hourNames[toNextHour ? nextHour : currentHour]);
    return phrase;
  }
  function paintWords(hour, minute) {
    const activeCells = new Set();
    const phrase = getPhrase(hour, minute);
    phrase.forEach((word) => {
      const position = wordPositions[word]; if (!position) return;
      const [row, start, length] = position;
      for (let col = start; col < start + length; col += 1) activeCells.add(`${row},${col}`);
    });
    wordGrid.querySelectorAll('.word-letter').forEach((cell) => cell.classList.toggle('lit', activeCells.has(cell.dataset.cell)));
    const spoken = phrase.map((word) => word === 'OCLOCK' ? "o'clock" : word.replace(/^HOUR_/, '').toLowerCase()).join(' ');
    wordFace.setAttribute('aria-label', `It is ${spoken}`);
  }
  function update() {
    const now = new Date();
    const localParts = Object.fromEntries(localClockFormatter.formatToParts(now).map((part) => [part.type, part.value]));
    const hours = Number(localParts.hour);
    const minutes = Number(localParts.minute);
    const seconds = Number(localParts.second);
    const time = `${pad(hours)}${pad(minutes)}${pad(seconds)}`;
    digits.forEach((digit, index) => digit.querySelectorAll('.segment').forEach((segment) => {
      segment.classList.toggle('on', numbers[time[index]].includes(segment.classList[1]));
    }));
    document.getElementById('digits').setAttribute('aria-label', `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`);
    const smoothSeconds = seconds + now.getMilliseconds() / 1000;
    secondHand.style.transform = `rotate(${smoothSeconds * 6}deg)`;
    minuteHand.style.transform = `rotate(${(minutes + smoothSeconds / 60) * 6}deg)`;
    hourHand.style.transform = `rotate(${((hours % 12) + minutes / 60 + smoothSeconds / 3600) * 30}deg)`;
    if (timeSource === 'debug') {
      const wordHours = Math.floor(debugMinute / 60);
      const wordMinutes = debugMinute % 60;
      timeSlider.value = String(debugMinute);
      debugReadout.textContent = pad(wordHours) + ':' + pad(wordMinutes);
      paintWords(wordHours, wordMinutes);
    } else {
      debugMinute = hours * 60 + minutes;
      timeSlider.value = String(debugMinute);
      debugReadout.textContent = pad(hours) + ':' + pad(minutes);
      paintWords(hours, minutes);
    }
    dateEl.textContent = localDateFormatter.format(now);
    timezoneEl.textContent = localZoneFormatter.formatToParts(now).find((part) => part.type === 'timeZoneName')?.value ?? localTimeZone;
  }
  update(); setInterval(update, 100);
})();