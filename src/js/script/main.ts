import { Game } from '..';
import Home from '../pages/home';

export const mainInit = ({ game }: { game: Game }) => {
  const startBtn = document.getElementById('start_btn');
  startBtn.addEventListener('click', () => {
    game.isGameStarted ? resetGame({ game }) : startGame({ game });
  });
  const answerElem = document.getElementById('answer');
  answerElem.addEventListener('keydown', (e) => {
    const keycode = e.key;

    if (keycode === 'Enter') {
      checkCorrect({ game });
    }
  });
};

const getQuestions = () => {
  const url = 'https://my-json-server.typicode.com/kakaopay-fe/resources/words';
  return fetch(url).then((response) => {
    return response.json();
  });
};

const startGame = async ({ game }: { game: Game }) => {
  try {
    const questions = await getQuestions();
    game.setQuestions(questions);
    const question = document.querySelector('#question');
    question.innerHTML = game.questions[game.count].text.toString();
    setCountdown({ game });
    game.setIsGameStarted(true);
  } catch (e) {
    console.log(e);
    game.setModal(false);
    renderHTML({ game });
    return;
  }
};

const resetGame = ({ game }: { game: Game }) => {
  game.setResetGame();
  const questionElem = document.getElementById('question');
  questionElem.textContent = '시작버튼을 눌러주세요!';
  renderHTML({ game });
};

const renderHTML = ({ game }: { game: Game }) => {
  const home = Home;
  home.render({
    time: game.questions[game.count].second,
    score: game.score,
    isGameStarted: false,
    modal: game.modal,
  });
};

const setCountdown = ({ game }: { game: Game }) => {
  let time = game.questions[game.count].second;
  let text = game.questions[game.count].text;
  const countDown = document.getElementById('countdown');
  countDown.innerHTML = time.toString();

  const timer = setInterval(function () {
    const question = document.querySelector('#question');
    if (question && text !== question.textContent) {
      clearInterval(timer);
      return;
    }

    time--;
    countDown.innerHTML = time.toString();
    if (time === 0) {
      clearInterval(timer);
      game.setNextGame();
      game.setScore(game.score - 1);

      if (!game.isGameStarted) {
        window.location.hash = '#result';
        return;
      }

      const score = document.querySelector('#points');
      score.innerHTML = game.score.toString();
      const question = document.querySelector('#question');
      question.innerHTML = game.questions[game.count].text.toString();
      setCountdown({ game });
    }
  }, 1000);
};

const checkCorrect = ({ game }: { game: Game }) => {
  const answer = document.querySelector('#answer') as HTMLInputElement;

  if (answer.value === game.questions[game.count].text) {
    const countdown = document.querySelector('#countdown');
    game.setResponseTime(game.questions[game.count].second - parseInt(countdown.textContent));
    game.setNextGame();

    if (!game.isGameStarted) {
      window.location.hash = '#result';
      return;
    }

    const question = document.querySelector('#question');
    question.innerHTML = game.questions[game.count].text.toString();
    answer.value = '';

    setCountdown({ game });
  } else {
    answer.value = '';
  }
};
