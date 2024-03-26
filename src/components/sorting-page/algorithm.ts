type Props = {
  index: number;
  sortedArray: number[][];
  currentStepIndex: number;
};

export const randomArr = (memo: Record<number, number> = {}, minLen: number = 3, maxLen:number = 17): number[] => {
  let newArr: number[] = [];
  // let minLen = 3;
  // let maxLen = 17;

  const newArrLength = Math.floor(Math.random() * (maxLen - minLen+1) + minLen-1);
  let i = 0;
  while(newArr.length <= newArrLength) {
    let newEl = Math.floor(Math.random()*101);
    if(!(newEl in memo)) {
      // console.log(newEl); 
      newArr.push(newEl);
    }
    // else {
    //   console.log('Такой элемент уже был добавлен');
    // }
    memo[i++]=newEl;
    // console.log(memo);
  }
  // console.log(newArr);
  return newArr
}

export function getColumnStatus({index, sortedArray, currentStepIndex}: Props) {
  const start: number[] = sortedArray[0];
  const end: number[] = sortedArray[sortedArray.length-1]
  // console.log(end);
  
  const maxIndex = sortedArray[currentStepIndex].length - 1;
  if (
    index < currentStepIndex ||
    index > maxIndex - currentStepIndex ||
    currentStepIndex === sortedArray.length - 1
  ) {
    return 'sorted';
  }
  
  if( index === currentStepIndex || index === maxIndex - currentStepIndex) {
    return 'sorting'
  }

  return 'unsorted';
}

export const sortArrayByType = (sortType: string, typeOfSorting: string, arr: number[]): number[][] => { 
  const sortedArray: number[][] = [[...arr]];

  const swap = (arr: number[], firstIndex: number, secondIndex: number): void => {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
  };

  const { length } = sortedArray[0];

  if (sortType === 'selection') {
    for (let i = 0; i < length - 1; i++) {
      let minInd = i;
      for (let j = i + 1; j < length; j++) {
        if (typeOfSorting === 'asc' && arr[j] < arr[minInd]) {
          minInd = j;
        } else if (typeOfSorting === 'desc' && arr[j] > arr[minInd]) {
          minInd = j;
        }
      }
      if (minInd !== i) {
        swap(arr, i, minInd);
      }
      sortedArray.push([...arr]);
    }
  } else { 
    for (let i = 0; i < length - 1; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        if (typeOfSorting === 'asc' && arr[j] > arr[j + 1]) {
          swap(arr, j, j + 1);
        } else if (typeOfSorting === 'desc' && arr[j] < arr[j + 1]) {
          swap(arr, j, j + 1);
        }
      }
      sortedArray.push([...arr]);
    }
  }

  console.log(sortedArray);
  return sortedArray;
}