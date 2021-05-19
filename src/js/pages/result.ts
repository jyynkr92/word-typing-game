const Result = {
  render: async ({ time, score }: { time: number; score: number }) => {
    const view = `
    <div>
      <div>당신의 점수는 ${score}입니다.</div>
      <div>평균 응답시간은 ${time}입니다.</div>
      <div>
        <button id="retry_btn">다시 하기</button>
      </div>
    </div>`;
    return view;
  },
};

export default Result;
