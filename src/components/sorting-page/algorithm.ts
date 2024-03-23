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

export const sortArrayByType = (sortType: string, typeOfSorting: string, arr: number[]): number[][] => { 
  const sortedArray: number[][] = [[...arr]];

  const swap = (arr: number[], firstIndex: number, secondIndex: number): void => {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
  };

  const { length } = sortedArray[0];

  if(sortType === 'selection') {
    for (let i = 0; i < length - 1; i++) {
      let minInd = i;
      for (let j = i + 1; j < length; j++){
        if (typeOfSorting === 'asc') {
          if(arr[j] < arr[minInd]) {
            minInd = j;
          }
        } 
        else {
          if(arr[j] > arr[minInd]) {
            minInd = j;
          }
        }
      }
      if (minInd !== i) {
        swap(arr, i, minInd)
      }
      sortedArray.push([...arr]);
    }
  } 
  else {
    for (let i = 0; i < length - 1; i++) {
      for (let j = 0; j < length; j++){
        if (typeOfSorting === 'asc') {
          if(arr[j] > arr[j + 1]) {
            swap(arr, j, j+1)
          }
        } 
        else {
          if(arr[j] < arr[j + 1]) {
            swap(arr, j, j+1)
          }
        }
      }
      sortedArray.push([...arr]);
    }
  }

  console.log(sortedArray);
  return sortedArray;
}