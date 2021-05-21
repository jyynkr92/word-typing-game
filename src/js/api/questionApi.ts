export const getQuestions = () => {
  const url = 'https://my-json-server.typicode.com/kakaopay-fe/resources/words';
  return fetch(url).then((response) => {
    return response.json();
  });
};
