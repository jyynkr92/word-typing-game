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

  setScore(score: number) {
    this.score = score;
  }

  setFailCount(count: number) {
    this.failCount = count;
  }

  setAvgTime(time: number) {
    this.avgTime = time;
  }

  setResponseTime(time: number) {
    this.responseTime = this.responseTime.concat(time);
  }

  setNextGame() {
    const next = this.count + 1;

    if (next > this.questions.length - 1) {
      this.isGameStarted = false;
      this.calcAvgTime();
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

  calcAvgTime() {
    const reducer = (accumulator: number, currentValue: number) => accumulator + currentValue;
    this.setAvgTime(
      Number((this.responseTime.reduce(reducer) / this.responseTime.length).toFixed(1))
    );
  }
}

(() => {
  const game = new Game();

  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.replace('#', '');
    render({ game, hash });
  });
  window.addEventListener('load', () => {
    const hash = window.location.hash.replace('#', '');
    render({ game, hash });
  });
})();
