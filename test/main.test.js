import { TEXT_PLACEHOLDER, TEXT_START, TEXT_START_QUESTION } from '../src/data/content';
import { Game } from '../src/js';
import {
  checkCorrect,
  isCorrect,
  moveToNextGame,
  onResetClick,
  setStartGame,
} from '../src/js/script/main';
import getQuestions from '../__mocks__/getQuestions';

const defaultHTML = ` 
<div id="root">
  <div class="main_wrapper">
    <h1>단어 타이핑 게임</h1>
    <div class="time_header">
      <div>시간 : <span id="countdown">0</span></div>
      <div>점수 : <span id="score">10</span></div>
    </div>
    <div class="question" id="question">${TEXT_START_QUESTION}</div>
    <div class="text_wrapper">
      <input type="text" id="answer" placeholder="${TEXT_PLACEHOLDER}"/>
    </div>
    <div class="btn_wrapper">
      <button id="start_btn">${TEXT_START}</button>
    </div>
  </div>
</div>`;

const data = [
  { second: 10, text: 'hello' },
  { second: 7, text: 'world' },
];

describe('start game', () => {
  const game = new Game();
  beforeEach(() => {
    document.body.innerHTML = defaultHTML;
    setStartGame({ game, questions: data });
  });

  //game start
  test('fetchdata', async () => {
    await expect(getQuestions()).resolves.toStrictEqual([
      { second: 10, text: 'hello' },
      { second: 10, text: 'world' },
    ]);
  });

  test('start_btn text should be 초기화', async () => {
    expect(document.querySelector('#start_btn').textContent).toEqual('초기화');
  });

  test('countdown initial state is 10', () => {
    expect(document.querySelector('#countdown').textContent).toEqual('10');
  });

  test('score initial state is 10', () => {
    expect(document.querySelector('#score').textContent).toEqual('10');
  });

  test('question initial state', () => {
    expect(document.querySelector('#question').textContent).toEqual('hello');
  });
});

describe('reset game', () => {
  const game = new Game();
  beforeEach(() => {
    document.body.innerHTML = defaultHTML;
    setStartGame({ game, questions: data });
    onResetClick({ game });
  });

  test('start btn should be 게임시작', async () => {
    expect(document.querySelector('#start_btn').textContent).toEqual('게임시작');
  });

  test('countdown state should be 0', () => {
    expect(document.querySelector('#countdown').textContent).toEqual('0');
  });

  test('score state should be 10', () => {
    expect(document.querySelector('#score').textContent).toEqual('10');
  });

  test('question state should be', () => {
    expect(document.querySelector('#question').textContent).toEqual('게임시작 버튼을 눌러주세요!');
  });
});

describe('checkCorrection', () => {
  const game = new Game();
  beforeEach(() => {
    document.body.innerHTML = defaultHTML;
    setStartGame({ game, questions: data });
  });

  test('check correct', async () => {
    const inputElem = document.querySelector('#answer');
    inputElem.value = 'hello';

    expect(
      isCorrect({ value: inputElem.value, answer: game.questions[game.count].text, game })
    ).toBeTruthy();
  });

  test('check incorrect', async () => {
    const inputElem = document.querySelector('#answer');
    inputElem.value = 'test';

    expect(
      isCorrect({ value: inputElem.value, answer: game.questions[game.count].text, game })
    ).toBeFalsy();
  });

  test('when answer is incorrect, inputElem should be empty', async () => {
    const inputElem = document.querySelector('#answer');
    inputElem.value = 'test';
    checkCorrect({ game });

    expect(inputElem.value).toBe('');
  });
});

describe('nextMove', () => {
  beforeEach(() => {
    document.body.innerHTML = defaultHTML;
  });

  test('lenth of response time list should be 1', () => {
    const game = new Game();
    setStartGame({ game, questions: data });
    const countdown = document.querySelector('#countdown');
    countdown.textContent = '3';
    isCorrect({ value: 'hello', answer: 'hello', game });
    moveToNextGame({ game });
    expect(game.responseTime.length).toBe(1);
  });

  test('input should be empty', () => {
    const game = new Game();
    setStartGame({ game, questions: data });
    const countdown = document.querySelector('#countdown');
    countdown.textContent = '3';
    moveToNextGame({ game });
    const inputElem = document.querySelector('#answer');
    expect(inputElem.value).toBe('');
  });

  test('count of game should be 1', () => {
    const game = new Game();
    setStartGame({ game, questions: data });
    const countdown = document.querySelector('#countdown');
    countdown.textContent = '3';
    moveToNextGame({ game });
    expect(game.count).toBe(1);
  });

  test('next question should be "world"', () => {
    const game = new Game();
    setStartGame({ game, questions: data });
    const countdown = document.querySelector('#countdown');
    countdown.textContent = '3';
    moveToNextGame({ game });
    const question = document.querySelector('#question');
    expect(question.textContent).toBe('world');
  });

  test('inputElem should be empty', async () => {
    const game = new Game();
    setStartGame({ game, questions: data });
    const countdown = document.querySelector('#countdown');
    countdown.textContent = '3';
    moveToNextGame({ game });
    const inputElem = document.querySelector('#answer');
    expect(inputElem.value).toBe('');
  });

  test('countdown state should be 7', () => {
    const game = new Game();
    setStartGame({ game, questions: data });
    const countdown = document.querySelector('#countdown');
    countdown.textContent = '3';
    moveToNextGame({ game });
    expect(countdown.textContent).toEqual('7');
  });
});
