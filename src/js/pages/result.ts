import { TEXT_RETRY } from '../../data/content';

const setResultHTML = ({ time, score }: { time: number; score: number }) => {
  const view = `
    <div class="result_wrapper">
      <div>당신의 점수는 ${score}점입니다.</div>
      <div>평균 응답시간은 ${time}초입니다.</div>
      <div>
        <button id="retry_btn">${TEXT_RETRY}</button>
      </div>
    </div>`;
  return view;
};

export default setResultHTML;
