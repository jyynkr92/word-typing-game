import '../css/style.css';
import { render } from './router';

(() => {
  window.addEventListener('hashchange', render);
  window.addEventListener('load', render);
})();
