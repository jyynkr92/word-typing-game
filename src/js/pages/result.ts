import { TEXT_RETRY } from '../../data/content';

const setResultHTML = ({ time, score }: { time: number; score: number }) => {
  const view = `
    <div class="result_wrapper">
      <h1>단어 타이핑 게임</h1>
      <div class="score_result">당신의 점수는 <span class="score">${score}</span>점입니다.</div>
      <div class="time_result">단어당 평균 응답시간은 <span class="time">${time}</span>초입니다.</div>
      <div class="btn_wrapper">
        <button id="retry_btn">${TEXT_RETRY}</button>
      </div>
    </div>`;
  return view;
};

export default setResultHTML;
