import Game from '../class/Game';
import setHomeHTML from '../pages/home';
import setResultHTML from '../pages/result';
import { mainInit } from './main';
import { resultInit } from './result';

export const render = async ({ game, hash }: { game: Game; hash: string }) => {
  const root = document.getElementById('root');
  try {
    history.pushState(null, document.title, location.href);
    if (hash === 'result') {
      const item = JSON.parse(window.localStorage.getItem('gameResult'));

      if (item) {
        game.setAvgTime(item.avgTime);
        game.setScore(item.score);
      }
    } else {
      game.setResetGame();
    }

    root.innerHTML = !hash
      ? setHomeHTML({
          time: 0,
          score: game.score || 10,
          isGameStarted: game.isGameStarted || false,
        })
      : setResultHTML({
          time: hash === 'result' ? game.avgTime : 0,
          score: game.score || 10,
        });

    if (hash === 'result') {
      resultInit();
    } else {
      window.localStorage.removeItem('gameResult');
      mainInit({ game });
    }
  } catch (e) {
    const root = document.getElementById('root');
    root.innerHTML = `<div>페이지를 찾을 수 없습니다.</div>`;
    console.error(e);
  }
};
