import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import { useState, ChangeEvent } from "react";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "../list-page/list-page.module.css";
import { LinkedList } from "./list-algo";
import { ElementStates } from "../../types/element-states";
import { randomArr } from "../sorting-page/utils";
import { updateListArray, TItem, addToHeadUpdateArr, addToTailUpdateArr, deleteFromHeadUpdateArr, deleteFromTailUpdateArr, addByIndexUpdateArr, deleteByIndexUpdateArr } from "./utils";
import { DELAY_IN_MS } from "../../constants/delays";

type Props = {
  fill?: string;
};

export default function ArrowIcon({ fill = "#0032FF" }: Props) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ marginTop: "32px" }}
    >
      <path
        fill={fill}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.29289 4.29289C9.68342 3.90237 10.3166 3.90237 10.7071 4.29289L18.4142 12L10.7071 19.7071C10.3166 20.0976 9.68342 20.0976 9.29289 19.7071C8.90237 19.3166 8.90237 18.6834 9.29289 18.2929L15.5858 12L9.29289 5.70711C8.90237 5.31658 8.90237 4.68342 9.29289 4.29289Z"
      />
    </svg>
  );
}

export const ListPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [indexValue, setIndexValue] = useState<string>("");
  const [isLoader, setLoader] = useState<string>("");
  const [isDisabled, setDisabled] = useState<boolean>(false);

  const [linkedList, setLinkedList] = useState(() => {
    const initialList = new LinkedList<string>();
    const randomArray: number[] = randomArr(3, 5);
    const stringArray = randomArray.map((item) => item.toString());
    stringArray.forEach((item) => initialList.append(item));
    return initialList;
  });

  const [list, setList] = useState<TItem[]>();

  React.useEffect(() => {
    setList(updateListArray(linkedList.toArray()));
  }, [linkedList]);

  const setTimer = (array: TItem[][]) => {
    let step = 0;
    setList(array[step]);
    const timerId = setInterval(() => {
      if (step < array.length - 1) {
        step++;
        setList(array[step]);
      } else {
        clearInterval(timerId);
        setInputValue('');
        if (indexValue !== '') setIndexValue('');
        setLoader('');
      }
    }, DELAY_IN_MS);
  }
  const addToHeadElement = () => {
    if(linkedList.getSize() === 7) return
    setLoader("addToHead");
    const updatedArray = addToHeadUpdateArr(linkedList, inputValue);
    setTimer(updatedArray);
  };
  const addToTailElement = () => {;
    if(linkedList.getSize() === 7) return
    setLoader("addToTail");
    const updatedArray = addToTailUpdateArr(linkedList, inputValue);
    setTimer(updatedArray);
  };
  const deleteFromHead = () => {;
    if(linkedList.getSize() === 1) return
    setLoader("deleteFromHead");
    const updatedArray = deleteFromHeadUpdateArr(linkedList);
    setTimer(updatedArray);
  };
  const deleteFromTail = () => {;
    if(linkedList.getSize() === 1) return
    setLoader("deleteFromTail");
    const updatedArray = deleteFromTailUpdateArr(linkedList);
    setTimer(updatedArray);
  };
  const insertAtIndex = () => {
    if(linkedList.getSize() === 7) return
    setLoader("insertAtIndex");
    const updatedArray = addByIndexUpdateArr(linkedList, inputValue, parseInt(indexValue));
    setTimer(updatedArray);
  };
  const deleteAtIndex = () => {
    if(linkedList.getSize() === 1) return
    setLoader("deleteAtIndex");
    const updatedArray = deleteByIndexUpdateArr(linkedList, parseInt(indexValue));
    setTimer(updatedArray);
  };
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const onChangeIndex = (e: ChangeEvent<HTMLInputElement>) => {
    const newIndex = parseFloat(e.target.value);
    if( Number.isInteger(newIndex) === false || newIndex < 0 ) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
    setIndexValue(e.target.value);
  };
  return (
    <SolutionLayout title="Связный список">
      <div className={styles.container}>
        <div className={styles.buttons}>
          <Input
            isLimitText={true}
            maxLength={4}
            placeholder="Введите значение"
            type={"text"}
            onChange={onChange}
            extraClass={styles.input}
            value={inputValue}
          />
          <Button
            text={"Добавить в head"}
            onClick={addToHeadElement}
            disabled={inputValue === "" || linkedList.getSize() === 7 || isLoader !== '' ? true : false}
            isLoader={isLoader === "addToHead" ? true : false}
          />
          <Button
            text={"Добавить в tail"}
            onClick={addToTailElement}
            isLoader={isLoader === 'addToTail' ? true : false}
            disabled={inputValue === '' || linkedList.getSize() === 7 || isLoader !== '' ? true : false}
          />
          <Button
            text={"Удалить из head"}
            onClick={deleteFromHead}
            isLoader={isLoader === "deleteFromHead" ? true : false}
            disabled={ linkedList.getSize() === 1 || isLoader !== '' ? true : false}
          />
          <Button
            text={"Удалить из tail"}
            onClick={deleteFromTail}
            isLoader={isLoader === "deleteFromTail" ? true : false}
            disabled={ linkedList.getSize() === 1 || isLoader !== '' ? true : false}
          />
        </div>
        <div className={styles.buttons}>
          <Input
            placeholder="Введите индекс"
            type={"number"}
            onChange={onChangeIndex}
            extraClass={styles.input}
            value={indexValue}
            min={0}
            max={list && list.length-1}
          />
          <Button
            text={"Добавить по индексу"}
            onClick={insertAtIndex}
            isLoader={isLoader === "insertAtIndex" ? true : false}
            disabled={indexValue === "" || inputValue === "" || isDisabled || isLoader !== '' ||  (list && parseInt(indexValue) > list.length-1) ? true : false}
            extraClass={styles.button}
          />
          <Button
            text={"Удалить по индексу"}
            onClick={deleteAtIndex}
            isLoader={isLoader === "deleteAtIndex" ? true : false}
            disabled={indexValue === ""  || isDisabled || isLoader !== '' ||  (list && parseInt(indexValue) > list.length-1) ? true : false}
            extraClass={styles.button}
          />
        </div>
        <ul className={styles.circlesContainer}>
          {list?.map((element, index, arr) => {
            return (
              <li key={index} className={styles.circles}>
                <Circle
                  head={ element.head.type === "circle" ? 
                    <Circle
                      letter={element.head.item}
                      isSmall
                      state={element.head.state}
                    /> : element.head.item
                  }
                  tail={ element.tail?.type === "circle" ? 
                      <Circle
                        letter={element.tail?.item}
                        isSmall
                        state={element.tail?.state}
                      /> : element.tail?.item
                  }
                  letter={element.item}
                  index={index}
                  state={element.state}
                />
                {index !== arr.length - 1 && <ArrowIcon />}
              </li>
            );
          })}
        </ul>
      </div>
    </SolutionLayout>
  );
};
