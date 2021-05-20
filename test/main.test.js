import { Game } from '../src/js';
import { checkCorrect, isCorrect, onStartGame, resetGame, setNextGame, startGame } from '../src/js/script/main';
import getQuestions from '../__mocks__/getQuestions';

const defaultHTML = ` 
<div id="root">
  <div class="main_wrapper">
    <h1>단어 타이핑 게임</h1>
    <div class="time_header">
      <div>시간 : <span id="countdown">0</span></div>
      <div>점수 : <span id="points">10</span></div>
    </div>
    <div class="question" id="question">시작버튼을 눌러주세요!</div>
    <div class="text_wrapper">
      <input type="text" id="answer" placeholder="단어 입력"/>
    </div>
    <div class="btn_wrapper">
      <button id="start_btn">게임시작</button>
    </div>
  </div>
</div>`;

const game = new Game();
const data = [
  { second: 10, text: 'hello' },
  { second: 10, text: 'world' },
];

describe('start_game', () => {
  beforeEach(() => {
    document.body.innerHTML = defaultHTML;
    onStartGame({ game, questions: data });
  });

  //game start
  test('fetchdata', async () => {
    await expect(getQuestions()).resolves.toStrictEqual([
      { second: 10, text: 'hello' },
      { second: 10, text: 'world' },
    ]);
  });

  test('start_btn is inside', async () => {
    expect(document.getElementById('start_btn').textContent).toEqual('초기화');
  });

  test('countdown initial state is 10', () => {
    expect(document.getElementById('countdown').textContent).toEqual('10');
  });

  test('points initial state is 10', () => {
    expect(document.getElementById('points').textContent).toEqual('10');
  });

  test('question initial state', () => {
    expect(document.getElementById('question').textContent).toEqual('hello');
  });
});

describe('reset_game', () => {
  beforeEach(() => {
    document.body.innerHTML = defaultHTML;
    onStartGame({ game, questions: data });
    resetGame({ game });
  });

  test('start_btn is inside', async () => {
    expect(document.getElementById('start_btn').textContent).toEqual('게임시작');
  });

  test('countdown initial state is 0', () => {
    expect(document.getElementById('countdown').textContent).toEqual('0');
  });

  test('points initial state is 10', () => {
    expect(document.getElementById('points').textContent).toEqual('10');
  });

  test('question initial state', () => {
    expect(document.getElementById('question').textContent).toEqual('시작버튼을 눌러주세요!');
  });
});

describe('checkCorrection', () => {
  beforeEach(() => {
    document.body.innerHTML = defaultHTML;
    onStartGame({ game, questions: data });
  });

  test('check correct', async () => {
    const inputElem = document.querySelector('#answer');
    inputElem.value = 'hello';

    expect(isCorrect({ value: inputElem.value, answer: game.questions[game.count].text })).toBeTruthy();
  });

  test('check incorrect', async () => {
    const inputElem = document.querySelector('#answer');
    inputElem.value = 'test';

    expect(isCorrect({ value: inputElem.value, answer: game.questions[game.count].text })).toBeFalsy();
  });
});

describe('nextMove', () => {
  beforeEach(() => {
    document.body.innerHTML = defaultHTML;
    onStartGame({ game, questions: data });
    const countdown = document.querySelector('#countdown');
    countdown.textContent = '3';
    setNextGame({ game });
  });

  test('lenth of response time list should be 1', () => {
    expect(game.responseTime.length).toBe(1);
  });

  test('input should be empty', () => {
    const inputElem = document.querySelector('#answer');
    expect(inputElem.value).toBe('');
  });

  test('count of game should be 1', () => {
    expect(game.count).toBe(1);
  });

  test('next question should be "world"', () => {
    const question = document.querySelector('#question');
    expect(question.textContent).toBe('world');
  });
});