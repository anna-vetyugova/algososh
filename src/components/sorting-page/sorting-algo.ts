import { ElementStates } from "../../types/element-states";
import { TItem } from "./sorting-page";

export const swap = (
  arr: TItem[],
  firstIndex: number,
  secondIndex: number
): void => {
  const tmp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = tmp;
};

export const sortArrayByType = (
  array: TItem[],
  type: string,
  direction: string
) => {
  let result: TItem[][] = [];
  if (type === "selection") {
    result = selectionSort(array, direction);
  } else {
    result = bubbleSort(array, direction);
  }
  return result;
};

export const selectionSort = (array: TItem[], direction: string) => {
  const steps: TItem[][] = [];
  if (direction === "ascending") {
    const n = array.length;
    for (let i = 0; i < n; i++) {
      array[i].state = ElementStates.Changing;
      steps.push([...array.map((item) => ({ ...item }))]);

      let minIndex = i;
      for (let j = i + 1; j < n; j++) {
        array[j].state = ElementStates.Changing;
        steps.push([...array.map((item) => ({ ...item }))]);

        if (array[j].item < array[minIndex].item) {
          swap(array, minIndex, j);
          steps.push([...array.map((item) => ({ ...item }))]);
        }
        array[j].state = ElementStates.Default;
        steps.push([...array.map((item) => ({ ...item }))]);
      }

      array[i].state = ElementStates.Modified;
      steps.push([...array.map((item) => ({ ...item }))]);
    }
  } else {
    const n = array.length;
    for (let i = 0; i < n; i++) {
      array[i].state = ElementStates.Changing;
      steps.push([...array.map((item) => ({ ...item }))]);

      let maxIndex = i;
      for (let j = i + 1; j < n; j++) {
        array[j].state = ElementStates.Changing;
        steps.push([...array.map((item) => ({ ...item }))]);

        if (array[j].item > array[maxIndex].item) {
          maxIndex = j;
        }
      }

      if (maxIndex !== i) {
        swap(array, maxIndex, i);
        steps.push([...array.map((item) => ({ ...item }))]);
      }

      array[i].state = ElementStates.Modified;
      for (let k = i + 1; k < n; k++) {
        array[k].state = ElementStates.Default;
      }
      steps.push([...array.map((item) => ({ ...item }))]);
    }
  }

  return steps;
};

export const bubbleSort = (array: TItem[], direction: string) => {
  const steps: TItem[][] = [];
  const n = array.length;

  if (direction === "ascending") {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        array[j].state = ElementStates.Changing;
        array[j + 1].state = ElementStates.Changing;
        steps.push([...array.map((item) => ({ ...item }))]);

        if (array[j].item > array[j + 1].item) {
          swap(array, j, j + 1);
          steps.push([...array.map((item) => ({ ...item }))]);
        }

        array[j].state = ElementStates.Default;
        array[j + 1].state = ElementStates.Default;
        steps.push([...array.map((item) => ({ ...item }))]);
      }
      array[n - i - 1].state = ElementStates.Modified;
      steps.push([...array.map((item) => ({ ...item }))]);
    }
  } else {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        array[j].state = ElementStates.Changing;
        array[j + 1].state = ElementStates.Changing;
        steps.push([...array.map((item) => ({ ...item }))]);

        if (array[j].item < array[j + 1].item) {
          swap(array, j, j + 1);
          steps.push([...array.map((item) => ({ ...item }))]);
        }

        array[j].state = ElementStates.Default;
        array[j + 1].state = ElementStates.Default;
        steps.push([...array.map((item) => ({ ...item }))]);
      }
      array[n - i - 1].state = ElementStates.Modified;
      steps.push([...array.map((item) => ({ ...item }))]);
    }
  }

  return steps;
};