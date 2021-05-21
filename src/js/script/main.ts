import { Game } from '..';
import { TEXT_RESET, TEXT_START, TEXT_START_QUESTION } from '../../data/content';
import { getQuestions } from '../api/questionApi';
import { setHTMLContent } from './common';

//html 렌더
export const renderHTML = ({ game }: { game: Game }) => {
  const { questions, score, count } = game;
  setHTMLContent({
    selector: '#countdown',
    content: questions.length > 0 ? questions[count].second.toString() : '0',
  });
  setHTMLContent({ selector: '#score', content: score.toString() });
};

export const isGameEnd = ({ game }: { game: Game }) => {
  const { isGameStarted, avgTime, score } = game;

  if (!isGameStarted) {
    const item = { avgTime, score };
    window.localStorage.setItem('gameResult', JSON.stringify(item));
    window.location.hash = '#result';
    return true;
  }

  return false;
};

export const moveToNextGame = ({ game }: { game: Game }) => {
  game.setNextGame();

  if (isGameEnd({ game })) {
    return;
  }

  const nextQuestion = game.questions[game.count];
  setHTMLContent({
    selector: '#question',
    content: nextQuestion.text.toString(),
  });

  const userAnswerELem = document.querySelector('#answer') as HTMLInputElement;
  userAnswerELem.value = '';
  setCountdown({ game });
};

//카운트 다운(게임 시작 후, 남은 시간 1초마다 떨어지도록 보여주기)
export const setCountdown = ({ game }: { game: Game }) => {
  const { questions, count } = game;
  const question = questions[count];
  let time = question.second;
  const text = question.text;
  setHTMLContent({ selector: '#countdown', content: time.toString() });
  const questionElem = document.querySelector('#question');

  const timer = setInterval(function () {
    const questionText = questionElem.textContent;
    if (questionElem && text !== questionText) {
      clearInterval(timer);
      return;
    }

    time--;
    setHTMLContent({ selector: '#countdown', content: time.toString() });

    if (time === 0) {
      clearInterval(timer);
      game.setFailCount(game.failCount + 1);
      game.setScore(game.score - 1);

      setHTMLContent({
        selector: '#score',
        content: game.score.toString(),
      });

      moveToNextGame({ game });
    }
  }, 1000);
};

export const setStartGame = ({
  game,
  questions,
}: {
  game: Game;
  questions: Array<{ second: number; text: string }>;
}) => {
  game.setQuestions(questions);
  game.setIsGameStarted(true);
  renderHTML({ game });
  setCountdown({ game });
  setHTMLContent({ selector: '#question', content: questions[game.count].text.toString() });
  setHTMLContent({ selector: '#start_btn', content: TEXT_RESET });
};

export const isCorrect = ({
  value,
  answer,
  game,
}: {
  value: string;
  answer: string;
  game: Game;
}) => {
  if (value === answer) {
    const countdown = document.querySelector('#countdown');
    game.setResponseTime(game.questions[game.count].second - parseInt(countdown.textContent));
    return true;
  }
  return false;
};

export const checkCorrect = ({ game }: { game: Game }) => {
  const userAnswerELem = document.querySelector('#answer') as HTMLInputElement;
  const value = userAnswerELem.value;
  const answer = game.questions[game.count].text;

  if (isCorrect({ value, answer, game })) {
    moveToNextGame({ game });
  } else {
    userAnswerELem.value = '';
  }
};

//게임 시작
export const onStartClick = async ({ game }: { game: Game }) => {
  try {
    const questions = await getQuestions();
    setStartGame({ game, questions });
  } catch (e) {
    alert('문제를 불러오는 데에 문제가 생겼습니다.');
    renderHTML({ game });
    return;
  }
};

//게임 초기화
export const onResetClick = ({ game }: { game: Game }) => {
  game.setResetGame();
  renderHTML({ game });
  setHTMLContent({ selector: '#question', content: TEXT_START_QUESTION });
  setHTMLContent({ selector: '#start_btn', content: TEXT_START });
};

export const mainInit = ({ game }: { game: Game }) => {
  const startBtn = document.querySelector('#start_btn');
  startBtn.addEventListener('click', () => {
    game.isGameStarted ? onResetClick({ game }) : onStartClick({ game });
  });

  const answerElem = document.querySelector('#answer') as HTMLInputElement;
  answerElem.addEventListener('keydown', (e) => {
    const { key } = e;
    if (game.isGameStarted && key === 'Enter') {
      checkCorrect({ game });
    }
  });
};
