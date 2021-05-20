import { Game } from '..';
import setHomeHTML from '../pages/home';
import setResultHTML from '../pages/result';
import { mainInit } from './main';
import { resultInit } from './result';

export const render = async ({ game, hash }: { game: Game; hash: string }) => {
  const root = document.getElementById('root');
  try {
    history.pushState(null, document.title, location.href);
    root.innerHTML = !hash
      ? setHomeHTML({
          time: 10,
          score: game.score || 10,
          isGameStarted: game.isGameStarted || false,
          modal: game.modal,
        })
      : setResultHTML({
          time: hash === 'result' ? game.avgTime : 10,
          score: game.score || 10,
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
