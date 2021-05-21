export const setHTMLContent = ({ selector, content }: { selector: string; content: string }) => {
  if (!selector) return;

  const elem = document.querySelector(selector);

  if (!elem) return;

  elem.textContent = content;
};
