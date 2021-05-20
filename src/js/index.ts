import '../css/style.css';
import { render } from './script/router';

export class Game {
  avgTime = 0;
  count = 0;
  failCount = 0;
  score = 10;
  isGameStarted = false;
  questions = [] as Array<{ second: number; text: string }>;
  responseTime = [] as Array<number>;
  modal = false;

  setScore(score: number) {
    this.failCount++;
    this.score = score;
  }

  setAvgTime() {
    const reducer = (accumulator: number, currentValue: number) => accumulator + currentValue;
    console.log(reducer, this.responseTime);
    this.avgTime = Number(
      (this.responseTime.reduce(reducer) / this.responseTime.length).toFixed(1)
    );
  }

  setResponseTime(time: number) {
    this.responseTime = this.responseTime.concat(time);
  }

  setNextGame() {
    const next = this.count + 1;

    if (next > this.questions.length - 1) {
      this.isGameStarted = false;
      this.setAvgTime();
    } else {
      this.count = next;
    }
  }

  setIsGameStarted(isGameStarted: boolean) {
    this.isGameStarted = isGameStarted;
  }

  setResetGame() {
    this.avgTime = 0;
    this.count = 0;
    this.score = 10;
    this.failCount = 0;
    this.responseTime = [];
    this.questions = [];
    this.isGameStarted = false;
  }

  setQuestions(list: Array<{ second: number; text: string }>) {
    this.questions = list;
    this.isGameStarted = true;
  }

  setModal(open: boolean) {
    this.modal = open;
  }
}

(() => {
  const game = new Game();
  const hash = window.location.hash.replace('#', '');
  window.addEventListener('hashchange', () => render({ game, hash }));
  window.addEventListener('load', () => render({ game, hash }));
})();
