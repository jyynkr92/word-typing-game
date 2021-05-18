const Home = {
  render: async () => {
    const view = `
    <div className="main_wrapper">
      <h1>단어 타이핑 게임</h1>
      <div>시작버튼을 눌러주세요!</div>
      <div>
        <div>시간 : <span id="countdown">10</span></div>
        <div>점수 : <span id="points">100점</span></div>
      </div>
      <div>
        <input type="text" id="answer" placeholder="단어 입력"/>
      </div>
      <div>
        <button id="start_btn">start</button>
      </div>
    </div>`;
    return view;
  },
};

export default Home;
