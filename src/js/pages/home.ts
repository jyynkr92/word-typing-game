import { TEXT_PLACEHOLDER, TEXT_RESET, TEXT_START, TEXT_START_QUESTION } from '../../data/content';

const setHomeHTML = ({
  time,
  score,
  isGameStarted,
}: {
  time: number;
  score: number;
  isGameStarted: boolean;
}) => {
  const view = `
    <div class="main_wrapper">
      <h1>단어 타이핑 게임</h1>
      <div class="time_header">
        <div>시간 : <span id="countdown">${time}</span></div>
        <div>점수 : <span id="score">${score}</span></div>
      </div>
      <div class="question" id="question">${TEXT_START_QUESTION}</div>
      <div class="text_wrapper">
        <input type="text" id="answer" readOnly placeholder="${TEXT_PLACEHOLDER}"/>
      </div>
      <div class="btn_wrapper">
        <button id="start_btn">${isGameStarted ? TEXT_RESET : TEXT_START}</button>
      </div>
    </div>`;
  return view;
};

export default setHomeHTML;
