const questions = [
  {
    question: '日本の国鳥に指定されている鳥はどれですか？',
    options: ['ツル', 'キジ', 'ハト', 'スズメ'],
    answer: 1
  },
  {
    question: '太陽系の惑星の中で最も大きいのはどれですか？',
    options: ['土星', '天王星', '木星', '海王星'],
    answer: 2
  },
  {
    question: '小説「吾輩は猫である」の作者は誰ですか？',
    options: ['芥川龍之介', '夏目漱石', '太宰治', '川端康成'],
    answer: 1
  },
  {
    question: '元素記号「Au」が表す元素は何ですか？',
    options: ['銀', '銅', '金', '鉄'],
    answer: 2
  },
  {
    question: '世界で最も面積が大きい国はどれですか？',
    options: ['カナダ', 'アメリカ', '中国', 'ロシア'],
    answer: 3
  },
  {
    question: 'オリンピックの五輪マークは何色の輪で構成されていますか？',
    options: ['3色', '4色', '5色', '6色'],
    answer: 2
  },
  {
    question: '日本の都道府県の数はいくつですか？',
    options: ['43', '45', '47', '49'],
    answer: 2
  },
  {
    question: '「モナ・リザ」を描いた画家は誰ですか？',
    options: ['ミケランジェロ', 'ラファエロ', 'レオナルド・ダ・ヴィンチ', 'ゴッホ'],
    answer: 2
  },
  {
    question: '成人の人体に含まれる骨の数はおよそ何本ですか？',
    options: ['約186本', '約206本', '約226本', '約246本'],
    answer: 1
  },
  {
    question: '地球から最も近い恒星（太陽を除く）はどれですか？',
    options: ['シリウス', 'プロキシマ・ケンタウリ', 'ベテルギウス', 'アルタイル'],
    answer: 1
  }
];

let currentIndex = 0;
let score = 0;

const startScreen = document.getElementById('start-screen');
const questionScreen = document.getElementById('question-screen');
const resultScreen = document.getElementById('result-screen');
const progressBar = document.getElementById('progress-bar');

document.getElementById('start-btn').addEventListener('click', startQuiz);
document.getElementById('next-btn').addEventListener('click', handleNext);
document.getElementById('restart-btn').addEventListener('click', restartQuiz);

function startQuiz() {
  currentIndex = 0;
  score = 0;
  startScreen.classList.add('hidden');
  questionScreen.classList.remove('hidden');
  showQuestion();
}

function showQuestion() {
  const q = questions[currentIndex];

  // プログレスバー更新
  progressBar.style.width = `${(currentIndex / questions.length) * 100}%`;

  document.getElementById('question-number').textContent =
    `問題 ${currentIndex + 1} / ${questions.length}`;
  document.getElementById('score-display').textContent = `スコア: ${score}`;
  document.getElementById('question-text').textContent = q.question;

  // フィードバックと次へボタンをリセット
  const feedback = document.getElementById('feedback');
  feedback.className = 'feedback hidden';
  feedback.textContent = '';

  const nextBtn = document.getElementById('next-btn');
  nextBtn.classList.add('hidden');

  // 選択肢をシャッフルして生成
  const shuffled = q.options
    .map((text, i) => ({ text, isCorrect: i === q.answer }))
    .sort(() => Math.random() - 0.5);

  const optionsEl = document.getElementById('options');
  optionsEl.innerHTML = '';
  shuffled.forEach((option) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = option.text;
    btn.dataset.correct = option.isCorrect;
    btn.addEventListener('click', () => selectAnswer(btn));
    optionsEl.appendChild(btn);
  });
}

function selectAnswer(selectedBtn) {
  const q = questions[currentIndex];
  const optionBtns = document.querySelectorAll('.option-btn');
  const feedback = document.getElementById('feedback');
  const nextBtn = document.getElementById('next-btn');

  // 全ボタンを無効化して重複クリックを防ぐ
  optionBtns.forEach(btn => (btn.disabled = true));

  // 正解ボタンを緑でハイライト
  const correctBtn = [...optionBtns].find(btn => btn.dataset.correct === 'true');
  correctBtn.classList.add('correct');

  if (selectedBtn.dataset.correct === 'true') {
    score++;
    feedback.textContent = '正解！';
    feedback.className = 'feedback correct';
  } else {
    selectedBtn.classList.add('incorrect');
    feedback.textContent = `不正解。正解は「${q.options[q.answer]}」です。`;
    feedback.className = 'feedback incorrect';
  }

  // 最終問題はボタンテキストを変える
  nextBtn.textContent =
    currentIndex === questions.length - 1 ? '結果を見る' : '次の問題へ';
  nextBtn.classList.remove('hidden');
}

function handleNext() {
  currentIndex++;
  if (currentIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  questionScreen.classList.add('hidden');
  resultScreen.classList.remove('hidden');

  // プログレスバーを100%に
  progressBar.style.width = '100%';

  document.getElementById('result-score').textContent =
    `${questions.length}問中 ${score}問 正解`;

  let message = '';
  if (score === questions.length) {
    message = '素晴らしい！全問正解です！';
  } else if (score >= 8) {
    message = 'とても良い成績です！';
  } else if (score >= 6) {
    message = 'まずまずの成績です。もう一度挑戦してみましょう。';
  } else {
    message = '次回は頑張りましょう！';
  }

  document.getElementById('result-message').textContent = message;
}

function restartQuiz() {
  resultScreen.classList.add('hidden');
  startScreen.classList.remove('hidden');
  progressBar.style.width = '0%';
}
