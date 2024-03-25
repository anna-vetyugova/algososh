import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import { useState, ChangeEvent } from "react";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "../list-page/list-page.module.css";
import { LinkedList } from "./list-algo";
import { ElementStates } from "../../types/element-states";

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
      style={{ marginTop: '32px' }}
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
  const [list, setList] = useState(() => new LinkedList<string>());
  const [listArr, setListArr] = useState<(string | null)[]>([]);
  const [newHeadElement, setNewHeadElement] = useState<string | null>(null);
  const [isAboveCircleVisible, setIsAboveCircleVisible] = useState<boolean>(false);
  const [mainCircleState, setMainCircleState] = useState<ElementStates>(ElementStates.Modified);

  React.useEffect(() => {
    if(newHeadElement && listArr.length === 0) {
      list.prepend(newHeadElement);
      setListArr(list.toArray());

      const intervalId = setInterval(() => {
        setMainCircleState(ElementStates.Default);
        clearInterval(intervalId);
      }, 1000);

      setMainCircleState(ElementStates.Modified);
      // setIsAboveCircleVisible(false);
      setNewHeadElement(null); 
    }

    if(newHeadElement && listArr.length > 0){
      setIsAboveCircleVisible(true);
      const intervalId = setInterval(() => {
        setIsAboveCircleVisible(false);
        list.prepend(newHeadElement);
        setListArr(list.toArray());
        setMainCircleState(ElementStates.Modified);
        
        clearInterval(intervalId);

        const intervalId2 = setInterval(() => {
          setIsAboveCircleVisible(false);
          setNewHeadElement(null); 
          setMainCircleState(ElementStates.Default);
          clearInterval(intervalId2);
        }, 1000);

      }, 1000);
      setMainCircleState(ElementStates.Default);
      



    }
  }, [newHeadElement]);


  const addElement = () => {
    if (!inputValue.length) return;
    setInputValue("");
    setNewHeadElement(inputValue);

  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
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
            onClick={addElement}
            disabled={inputValue === "" ? true : false}
            // isLoader={isLoader}
          />
          <Button
            text={"Добавить в tail"}
            // onClick={startAlgorithm}
            // isLoader={isLoader}
            // disabled={isDisabled}
          />
          <Button
            text={"Удалить из head"}
            // onClick={startAlgorithm}
            // isLoader={isLoader}
            // disabled={isDisabled}
          />
          <Button
            text={"Удалить из tail"}
            // onClick={startAlgorithm}
            // isLoader={isLoader}
            // disabled={isDisabled}
          />
        </div>
        <div className={styles.buttons}>
          <Input
            isLimitText={false}
            placeholder="Введите индекс"
            type={"text"}
            // onChange={onChange}
            extraClass={styles.input}
          />
          <Button
            text={"Добавить по индексу"}
            // onClick={startAlgorithm}
            // isLoader={isLoader}
            // disabled={isDisabled}
            extraClass={styles.button}
          />
          <Button
            text={"Удалить по индексу"}
            // onClick={startAlgorithm}
            // isLoader={isLoader}
            // disabled={isDisabled}
            extraClass={styles.button}
          />
        </div>
        <ul className={styles.circlesContainer}>
          {listArr?.map((element, index, arr) => {
            const isHead = index === 0;
            // console.log(index);
            return (
              <li key={index} className={styles.circles}>
              <Circle
                letter={element?.toString()}
                index={index}
                head={ isAboveCircleVisible && index === 0 ? (
                  <Circle
                    letter={newHeadElement?.toString()}
                    isSmall={true}
                    state={ElementStates.Changing}
                  />
                ) : isHead ? (
                  "head"
                ) : (
                  ""
                )}
                state={isHead ? mainCircleState : ElementStates.Default}
                extraClass={styles.circle}
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
