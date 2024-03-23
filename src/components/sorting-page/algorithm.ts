export const randomArr = (memo: Record<number, number> = {}): number[] => {
  let newArr: number[] = [];
  let minLen = 3;
  let maxLen = 17;

  const newArrLength = Math.floor(Math.random() * (maxLen - minLen+1) + minLen-1)
  while(newArr.length <= newArrLength) {
    let newEl = Math.floor(Math.random()*101);
    if(!(newEl in memo)) {
      newArr.push(newEl);
    }
  }
  return newArr
}

export const sortArrayByType = (type: string, array: number[]): number[] => {
  let sortedArray: number[] = [...array];
  
  const swap = (arr: number[], firstIndex: number, secondIndex: number): void => {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
  };

  const { length } = sortedArray;
  for (let i = 0; i < length - 1; i++) {
    let maxInd = i;
    for (let j = 0; j < length; j++){
      if (type === 'asc') {
        if(sortedArray[j] > sortedArray[j + 1]) {
          swap(sortedArray, j, j+1)
        }
      } 
      else {
        if(sortedArray[j] < sortedArray[j + 1]) {
          swap(sortedArray, j, j+1)
        }
      }
    }
  }

  return sortedArray;
}