const Home = {
  render: async ({ time, score, isGameStarted }: { time: number; score: number; isGameStarted: boolean }) => {
    const view = `
    <div class="main_wrapper">
      <h1>단어 타이핑 게임</h1>
      <div class="time_header">
        <div>시간 : <span id="countdown">${time}</span></div>
        <div>점수 : <span id="points">${score}점</span></div>
      </div>
      <div class="question">시작버튼을 눌러주세요!</div>
      <div class="text_wrapper">
        <input type="text" id="answer" placeholder="단어 입력"/>
      </div>
      <div class="btn_wrapper">
        <button id="start_btn">${isGameStarted ? '다시하기' : '게임시작'}</button>
      </div>
    </div>`;
    return view;
  },
};

export default Home;
