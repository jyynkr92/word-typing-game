import Home from './pages/home';
import Result from './pages/result';

interface RouteType {
  home: { render: () => Promise<string> };
  result: { render: () => Promise<string> };
}

const routes: RouteType = {
  home: Home,
  result: Result,
};

export const render = async () => {
  const root = document.getElementById('root');
  try {
    const hash = location.hash.replace('#', '');
    const url = routes[hash === '' ? 'home' : 'result'];
    if (!url) {
      root.innerHTML = `<div>페이지를 찾을 수 없습니다.</div>`;
      return;
    }

    // history.pushState(null, document.title, location.origin + '/' + hash);
    root.innerHTML = await url.render();
  } catch (e) {
    const root = document.getElementById('root');
    root.innerHTML = `<div>페이지를 찾을 수 없습니다.</div>`;
    console.error(e);
  }
};
