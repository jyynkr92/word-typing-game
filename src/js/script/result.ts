export const resultInit = () => {
  const retryBtn = document.getElementById('retry_btn');
  retryBtn.addEventListener('click', () => {
    window.location.hash = '#';
  });
};
