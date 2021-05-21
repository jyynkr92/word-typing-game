import '../css/style.css';
import Game from './class/Game';
import { render } from './script/router';

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
