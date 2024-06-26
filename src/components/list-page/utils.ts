import { ElementStates } from "../../types/element-states";
import { LinkedList } from "./list-algo";


export type TItem = {
  item: string;
  state: ElementStates;
  head: {
    type: string;
    item: string;
    state: ElementStates;
  };
  tail: {
    type: string;
    item: string;
    state: ElementStates;
  };
}
const initialValues: TItem = {
  item: "",
  head: {
    type: "",
    item: "",
    state: ElementStates.Changing,
  },
  tail: {
    type: "",
    item: "",
    state: ElementStates.Changing,
  },
  state: ElementStates.Default,
};

export function updateListArray(array: string[]): TItem[] {
  const updatedArray = array.map((item, index, arr) => {
    return {
      item: item,
      state: ElementStates.Default,
      head: {
        type: "",
        item: index === 0 ? "head" : "",
        state: ElementStates.Changing
      },
      tail: {
        type: "",
        item: index === arr.length - 1 ? "tail" : "",
        state: ElementStates.Changing
      }
    };
  });

  return updatedArray;
}

export function addToHeadUpdateArr(linkedList: LinkedList<string>, item: string): TItem[][] {
  const steps = [];

  // 1. шаг - сохраним исходное состояние списка и добавим информацию, что первый элемент будет в кружке
  // 2. шаг - добавим новый элемент в начало списка и запишем его состояние "Modified"
  // 3. шаг - вернем конечный результат с обычным состоянием
  const newArray1 = updateListArray(linkedList.toArray());
  newArray1[0].head.item = item;
  newArray1[0].head.type = 'circle';

  linkedList.prepend(item);
  const newArray2 = updateListArray(linkedList.toArray()).map((element, index) => ({
    ...element,
    state: index === 0 ? ElementStates.Modified : element.state
  }));

  const newArray3 = newArray2.map((element, index) => ({
    ...element,
    state: index === 0 ? ElementStates.Default : element.state
  }));

  steps.push(newArray1, newArray2, newArray3);

  return steps;
}

export function addToTailUpdateArr(linkedList: LinkedList<string>, item: string): TItem[][] {
  const steps = [];

  // 1. шаг - сохраним исходное состояние списка и добавим информацию, что последний элемент будет в кружке
  // 2. шаг - добавим новый элемент в конец списка и запишем его состояние "Modified"
  // 3. шаг - вернем конечный результат с обычным состоянием
  const newArray1 = updateListArray(linkedList.toArray());
  newArray1[newArray1.length-1].head.item = item;
  newArray1[newArray1.length-1].head.type = 'circle';

  linkedList.append(item);
  const newArray2 = updateListArray(linkedList.toArray()).map((element, index) => ({
    ...element,
    state: index === newArray1.length ? ElementStates.Modified : element.state
  }));

  const newArray3 = newArray2.map((element, index) => ({
    ...element,
    state: index === newArray1.length ? ElementStates.Default : element.state
  }));

  steps.push(newArray1, newArray2, newArray3);
  return steps;
}

export function deleteFromHeadUpdateArr(linkedList: LinkedList<string>): TItem[][] {
  const steps = [];

  // 1. шаг - сохраним исходное состояние списка и добавим информацию, что первый элемент пустой и будет в кружке
  // 2. шаг -  вернем конечный результат с обычным состоянием
  const newArray1 = updateListArray(linkedList.toArray());
  newArray1[0].tail.item = newArray1[0].item;
  newArray1[0].tail.type = 'circle';
  newArray1[0].item = '';

  linkedList.deleteHead();
  const newArray2 = updateListArray(linkedList.toArray()).map((element, index) => ({
    ...element,
    state: index === 0 ? ElementStates.Default : element.state
  }));

  steps.push(newArray1, newArray2);
  return steps;
}


export function deleteFromTailUpdateArr(linkedList: LinkedList<string>): TItem[][] {
  const steps = [];

  // 1. шаг - сохраним исходное состояние списка и добавим информацию, что последний элемент пустой и будет в кружке
  // 2. шаг -  вернем конечный результат с обычным состоянием
  const newArray1 = updateListArray(linkedList.toArray());
  newArray1[newArray1.length-1].tail.item = newArray1[0].item;
  newArray1[newArray1.length-1].tail.type = 'circle';
  newArray1[newArray1.length-1].item = '';

  linkedList.deleteTail();
  const newArray2 = updateListArray(linkedList.toArray()).map((element, index) => ({
    ...element,
    state: index === newArray1.length-1 ? ElementStates.Default : element.state
  }));

  steps.push(newArray1, newArray2);
  return steps;
}

export function addByIndexUpdateArr(linkedList: LinkedList<string>, item: string, index: number): TItem[][] {
  const steps: TItem[][] = [];
  // 1. шаг - сохраним исходное состояние списка и добавим информацию, что НОВЫЙ элемент будет в кружке у первого элемента, а остальные в статусе Default
  // 2. шаг - сохраним исходное состояние списка и добавим информацию, что НОВЫЙ элемент будет в кружке у второго элемента, а предыдущий будет в статусе Changing и т.д. до нового индекса
  // 3. шаг - обновляем список
  // 4. шаг - добавленному элементу обновляем статус в  Modified, а элементам до этого индекса ставим статус Default
  // 5. шаг - вернем конечный результат с обычным состоянием
  
  const newArray1 = updateListArray(linkedList.toArray());
  newArray1[0].head.item = item;
  newArray1[0].head.type = 'circle';
  steps.push(newArray1);

  for (let i = 1; i <= index; i++) {
    let tempArray = updateListArray(linkedList.toArray());
    tempArray[i - 1].head.item = '';
    tempArray[i - 1].head.type = '';
    tempArray[i - 1].state = ElementStates.Changing;
  
    tempArray[i].head.item = item;
    tempArray[i].head.type = 'circle';

    steps.push(tempArray); 
  }

  linkedList.addByIndex(item, index);
  
  const newArray3 = updateListArray(linkedList.toArray());
  newArray3[index].state = ElementStates.Modified;
  for(let i = 0; i < index; i++) {
    newArray3[i].state = ElementStates.Default;
  }
  steps.push(newArray3);

  const newArray4 = newArray3.map((item, indx) => ({
    ...item,
    state: indx === index ? ElementStates.Default : item.state
  }));
  steps.push(newArray4);
  
  return steps;
}

export function deleteByIndexUpdateArr(linkedList: LinkedList<string>, index: number): TItem[][] {
  const steps: TItem[][] = [];
  // 1. шаг - сохраним исходное состояние списка и добавим информацию, что первый элемент в статусе Changing, а остальные в статусе Default
  // 2. шаг - доходим до нужного индекса и выделяем его аналогично предыдущим элементам в статусе Changing
  // 3. шаг  - элемент с нужным индексом переводим в статус Default, записываем туда пустое знаение, и в tail пишем его значение и статус кружка Changing
  // 4. шаг - удаляем элемент
  // 5. шаг - вернем конечный результат с обычным состоянием
  
  for (let i = 0; i <= index; i++) {
    let tempArray = updateListArray(linkedList.toArray());
    tempArray[i].state = ElementStates.Changing;
    steps.push(tempArray); 
  }

  const newArray1 = updateListArray(linkedList.toArray());
  newArray1[index].state = ElementStates.Default;
  newArray1[index].tail.type = 'circle';
  newArray1[index].tail.item = newArray1[index].item;
  newArray1[index].tail.state = ElementStates.Changing;
  newArray1[index].item = '';
  steps.push(newArray1);

  linkedList.deleteByIndex(index);
  const newArray3 = updateListArray(linkedList.toArray());
  for(let i = 0; i < index; i++) {
    newArray3[i].state = ElementStates.Default;
  }
  steps.push(newArray3);

  return steps;
}