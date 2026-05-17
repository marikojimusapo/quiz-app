'use strict';

const QUESTIONS = [
  {
    text: '日本の国鳥として正式に定められている鳥はどれですか？',
    choices: ['鶴（ツル）', '鷹（タカ）', 'キジ', 'フクロウ'],
    correct: 2,
  },
  {
    text: '世界で最も面積が大きい国はどこですか？',
    choices: ['カナダ', 'アメリカ合衆国', '中国', 'ロシア'],
    correct: 3,
  },
  {
    text: '人間の体で最も大きい臓器はどれですか？',
    choices: ['肝臓', '肺', '皮膚', '心臓'],
    correct: 2,
  },
  {
    text: '光が1秒間に進む距離として最も近いものはどれですか？',
    choices: ['約3万km', '約30万km', '約300万km', '約3000万km'],
    correct: 1,
  },
  {
    text: '俳句において「切れ字」として使われない言葉はどれですか？',
    choices: ['や', 'かな', 'けり', 'こそ'],
    correct: 3,
  },
  {
    text: '日本で最も長い川はどれですか？',
    choices: ['利根川', '信濃川', '石狩川', '北上川'],
    correct: 1,
  },
  {
    text: '元素記号「Fe」が表す元素はどれですか？',
    choices: ['金', '銀', '銅', '鉄'],
    correct: 3,
  },
  {
    text: '日本の都道府県の数は全部でいくつですか？',
    choices: ['43', '45', '47', '49'],
    correct: 2,
  },
  {
    text: 'ピカソが反戦を訴えて描いた代表作「ゲルニカ」が完成した年はいつですか？',
    choices: ['1929年', '1937年', '1945年', '1953年'],
    correct: 1,
  },
  {
    text: '地球から見た月が約27日で一周するのに対し、満月から次の満月までの周期として正しいものはどれですか？',
    choices: ['約25日', '約27日', '約29日', '約31日'],
    correct: 2,
  },
];

const MESSAGES = [
  { min: 0,  max: 3,  text: 'もう少し頑張りましょう！また挑戦してみてください。' },
  { min: 4,  max: 6,  text: 'なかなか良いですね！あと少しで上位です。' },
  { min: 7,  max: 9,  text: 'とても惜しい！もう一息で満点です。' },
  { min: 10, max: 10, text: '素晴らしい！全問正解です！' },
];

let currentIndex = 0;
let score = 0;
let answered = false;

const progressFill  = document.getElementById('progressFill');
const progressText  = document.getElementById('progressText');
const questionNumber = document.getElementById('questionNumber');
const questionText  = document.getElementById('questionText');
const choiceList    = document.getElementById('choiceList');
const feedback      = document.getElementById('feedback');
const btnNext       = document.getElementById('btnNext');
const quizSection   = document.getElementById('quizSection');
const resultSection = document.getElementById('resultSection');
const scoreText     = document.getElementById('scoreText');
const scoreMessage  = document.getElementById('scoreMessage');
const btnRetry      = document.getElementById('btnRetry');
const btnExit       = document.getElementById('btnExit');

function renderQuestion() {
  const q = QUESTIONS[currentIndex];
  answered = false;

  const total = QUESTIONS.length;
  const current = currentIndex + 1;

  progressFill.style.width = `${(current / total) * 100}%`;
  progressText.textContent = `${current} / ${total} 問`;
  questionNumber.textContent = `問題 ${current}`;
  questionText.textContent = q.text;

  feedback.textContent = '';
  feedback.className = 'feedback';
  btnNext.hidden = true;

  choiceList.innerHTML = '';
  q.choices.forEach((choice, index) => {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.textContent = choice;
    btn.addEventListener('click', () => handleAnswer(index));
    li.appendChild(btn);
    choiceList.appendChild(li);
  });
}

function handleAnswer(selectedIndex) {
  if (answered) return;
  answered = true;

  const q = QUESTIONS[currentIndex];
  const buttons = choiceList.querySelectorAll('button');

  buttons.forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.correct) {
      btn.classList.add('correct');
    } else if (i === selectedIndex) {
      btn.classList.add('incorrect');
    }
  });

  if (selectedIndex === q.correct) {
    score++;
    feedback.textContent = '◎ 正解です！';
    feedback.className = 'feedback correct';
  } else {
    feedback.textContent = `✕ 不正解。正解は「${q.choices[q.correct]}」でした。`;
    feedback.className = 'feedback incorrect';
  }

  if (currentIndex < QUESTIONS.length - 1) {
    btnNext.hidden = false;
  } else {
    setTimeout(showResult, 900);
  }
}

function showResult() {
  quizSection.hidden = true;
  resultSection.hidden = false;

  const total = QUESTIONS.length;
  scoreText.textContent = `${total} 問中 ${score} 問正解`;

  const msg = MESSAGES.find(m => score >= m.min && score <= m.max);
  scoreMessage.textContent = msg ? msg.text : '';
}

btnNext.addEventListener('click', () => {
  currentIndex++;
  renderQuestion();
});

btnExit.addEventListener('click', () => {
  window.close();
});

btnRetry.addEventListener('click', () => {
  currentIndex = 0;
  score = 0;
  quizSection.hidden = false;
  resultSection.hidden = true;
  renderQuestion();
});

renderQuestion();
