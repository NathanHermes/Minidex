export const generateFiveRandonIndex = () => {
  const randomIndexs = [];

  for (let index = 0; index < 5; index++) {
    const randomNumber = Math.floor(Math.random() * (1010 - 1 + 1)) + 1;
    randomIndexs.push(randomNumber);
  }
  return randomIndexs;
};
