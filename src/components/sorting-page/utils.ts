export const randomArr = (
  minLen: number = 3,
  maxLen: number = 17
): number[] => {
  const newSet = new Set<number>();
  const newArr: number[] = [];
  const newArrLength = Math.floor(
    Math.random() * (maxLen - minLen + 1) + minLen - 1
  );
  while (newSet.size < newArrLength) {
    const newEl = Math.floor(Math.random() * 101);
    newSet.add(newEl);
  }
  newSet.forEach((num) => newArr.push(num));
  return newArr;
};
