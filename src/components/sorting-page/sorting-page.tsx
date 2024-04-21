import React, { MouseEventHandler, ChangeEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import styles from "../sorting-page/sorting-page.module.css";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { randomArr } from "./utils";
import { Column } from "../ui/column/column";
import { useState } from "react";
import { ElementStates } from "../../types/element-states";
import { sortArrayByType } from "./sorting-algo";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export type TItem = {
  item: number;
  state: ElementStates;
};

export const SortingPage: React.FC = () => {
  const [newArr, setNewArr] = useState<TItem[][]>([]);
  const [updatedArray, setUpdatedArray] = useState<TItem[]>([]);
  const [isLoader, setLoader] = useState<string>('');
  const [type, setType] = useState<string>('selection');
  const [sortDirection, setSortDirection] = useState<string>('');

  React.useEffect(() => {
    getNewArray();
  },[]);
  const getNewArray = () => {
    const randomArray: number[] = randomArr();
    const updatedArray = randomArray.map((item) => {
      return {
        item: item,
        state: ElementStates.Default
      }
    });
    setUpdatedArray(updatedArray); 
  };

  const sortArray = (sortDirection: string) => {
    setLoader(sortDirection);
    const newArr = sortArrayByType(updatedArray, type, sortDirection);
    setNewArr(newArr);

    let step = 0;
    setUpdatedArray(newArr[step]);

    const timerId = setInterval(() => {
      if (step < newArr.length - 1) {
        step++;
        setUpdatedArray(newArr[step]);
      } else {
        clearInterval(timerId);
        setSortDirection('');
        setLoader('');
      }
    }, SHORT_DELAY_IN_MS);
  }
  const onChange = (type: string) => {
    setType(type);
  };

  const onClick = (sorting: string) => {
    setSortDirection(sorting);
    sortArray(sorting); 
  };
  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.main}>
        <div className={styles.radio}>
          <RadioInput
            label="Выбор"
            value="selection"
            onChange={() => onChange('selection')}
            checked={type === "selection"}
          />
          <RadioInput
            label="Пузырёк"
            value="bubble"
            onChange={() => onChange('bubble')}
            checked={type === "bubble"}
          />
        </div>
        <div className={styles.buttons}>
          <Button
            text={"По возрастанию"}
            sorting={Direction.Ascending}
            extraClass={styles.button}
            onClick={() => onClick('ascending')}
            disabled={isLoader ? true : false}
            isLoader={isLoader === 'ascending' ? true: false}
          />
          <Button
            text={"По убыванию"}
            sorting={Direction.Descending}
            extraClass={styles.button}
            onClick={() => onClick('descending')}
            disabled={isLoader ? true : false}
            isLoader={isLoader === 'descending' ? true: false}
          />
        </div>
        <Button
          text={"Новый массив"}
          extraClass={styles.button}
          onClick={getNewArray}
          disabled={isLoader ? true: false}
        />
      </div>
      <ul className={styles.array}>
        {updatedArray?.map((item, index) => {
          return (
            <li key={index} className={styles.columns}>
            <Column
              index={item.item}
              state={item.state}
            />
          </li>
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
