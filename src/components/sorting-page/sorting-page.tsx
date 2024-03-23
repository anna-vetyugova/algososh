import React, { MouseEventHandler } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import styles from "../sorting-page/sorting-page.module.css";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { randomArr } from "./algorithm";
import { Column } from "../ui/column/column";
import { useState } from "react";
import { sortArrayByType } from "./algorithm";
import { ElementStates } from "../../types/element-states";
import { getChartStatus } from "../string/algorithm";
export const SortingPage: React.FC = () => {
  const [newArray, setNewArray] = useState<number[] | null>(null);
  const [sortedArray, setSorted] = useState<number[][] | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [sortType, setSort] = useState<string>("selection");
  const [isLoader, setLoader] = useState(false);
  const [type, setTypeSort] = useState<string>('');

  const getNewArray = () => {
    const randomArray: number[] = randomArr();
    setNewArray(randomArray);
  };
  const setSortType = (sortType: string) => {
    setSort(sortType);
  };
  const sortArray = (typeOfSorting: string) => {
    setTypeSort(typeOfSorting);

    if (!newArray) return;
    setLoader(true);
    const sortedArray = sortArrayByType(sortType, typeOfSorting, newArray);
    setSorted(sortedArray);
    setCurrentStepIndex(0);

    let index = 0;
    if (!sortedArray) return;
    const intervalId = setInterval(() => {
      if (index >= sortedArray.length) {
        clearInterval(intervalId);
        setLoader(false);
        return;
      }
      setCurrentStepIndex(index++);
    }, 1000);
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.main}>
        <div className={styles.radio}>
          <RadioInput
            label="Выбор"
            value="selection"
            onChange={() => setSortType("selection")}
            checked={sortType === "selection"}
          />
          <RadioInput
            label="Пузырёк"
            value="bubble"
            onChange={() => setSortType("bubble")}
            checked={sortType === "bubble"}
          />
        </div>
        <div className={styles.buttons}>
          <Button
            text={"По возрастанию"}
            sorting={Direction.Ascending}
            extraClass={styles.button}
            onClick={() => sortArray("asc")}
            disabled={!newArray}
          />
          <Button
            text={"По убыванию"}
            sorting={Direction.Descending}
            extraClass={styles.button}
            onClick={() => sortArray("desc")}
            disabled={!newArray}
          />
        </div>
        <Button
          text={"Новый массив"}
          extraClass={styles.button}
          onClick={getNewArray}
        />
      </div>
      <ul className={styles.array}>
        {sortedArray?.[currentStepIndex].map((number, index) => {
          const steps = sortedArray;
          const status = getChartStatus({ index, steps, currentStepIndex });
          const state = status === "sorted"
              ? ElementStates.Modified
              : status === "sorting"
              ? ElementStates.Changing
              : ElementStates.Default;
          return (
            <li key={index} className={styles.columns}>
              <Column index={number} state={state} />
            </li>
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
