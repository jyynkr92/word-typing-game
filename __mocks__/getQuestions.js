const data = [
  { second: 10, text: 'hello' },
  { second: 10, text: 'world' },
];

export default function getQuestions() {
  return new Promise((resolve, reject) => {
    process.nextTick(() => {
      resolve(data);
    });
  });
}
