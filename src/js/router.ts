import Home from './pages/home';
import Result from './pages/result';

interface RouteType {
  home: { render: ({ time, score, isGameStarted }: { time: number; score: number; isGameStarted: boolean }) => Promise<string> };
  result: { render: ({ time, score }: { time: number; score: number }) => Promise<string> };
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
    root.innerHTML = await url.render({ time: 10, score: 100, isGameStarted: false });
  } catch (e) {
    const root = document.getElementById('root');
    root.innerHTML = `<div>페이지를 찾을 수 없습니다.</div>`;
    console.error(e);
  }
};
