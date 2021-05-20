import { Game } from '..';
import Home from '../pages/home';
import Result from '../pages/result';
import { mainInit } from './main';
import { resultInit } from './result';

interface RouteType {
  home: {
    render: ({
      time,
      score,
      isGameStarted,
      modal,
    }: {
      time: number;
      score: number;
      isGameStarted: boolean;
      modal: boolean;
    }) => Promise<string>;
  };
  result: { render: ({ time, score }: { time: number; score: number }) => Promise<string> };
}

const routes: RouteType = {
  home: Home,
  result: Result,
};

export const render = async ({ game }: { game: Game }) => {
  const root = document.getElementById('root');
  try {
    const hash = location.hash.replace('#', '');
    const url = routes[hash === '' ? 'home' : 'result'];
    if (!url) {
      root.innerHTML = `<div>페이지를 찾을 수 없습니다.</div>`;
      return;
    }

    history.pushState(null, document.title, location.href);
    root.innerHTML = await url.render({
      time: hash === 'result' ? game.avgTime : 10,
      score: game.score || 10,
      isGameStarted: game.isGameStarted || false,
      modal: game.modal,
    });

    if (hash === 'result') {
      resultInit();
    } else {
      mainInit({ game });
    }
  } catch (e) {
    const root = document.getElementById('root');
    root.innerHTML = `<div>페이지를 찾을 수 없습니다.</div>`;
    console.error(e);
  }
};
