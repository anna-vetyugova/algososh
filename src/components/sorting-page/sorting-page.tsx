import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import styles from '../sorting-page/sorting-page.module.css'
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { randomArr } from "./algorithm";
import { Column } from "../ui/column/column";
import { useState } from "react";
import { sortArrayByType } from "./algorithm";

export const SortingPage: React.FC = () => {
  const [isArray, setArray] = useState<number[] | null>(null);
  
  const onClick = () => {
    const randomArray: number[] = randomArr();
    setArray(randomArray);
  }

  const sortArray = (type: string) => {
    if (!isArray) return;
    const sortedArray = sortArrayByType(type, isArray);
    setArray(sortedArray);
  
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.main}>
        <div className={styles.radio}>
          <RadioInput label="Выбор"/>
          <RadioInput label="Пузырёк"/>
        </div>
        <div className={styles.buttons}>
          <Button text={"По возрастанию"} sorting={Direction.Ascending} extraClass={styles.button} onClick={(e) => sortArray('asc')} disabled={!isArray} />
          <Button text={"По убыванию"} sorting={Direction.Descending} extraClass={styles.button} onClick={(e) => sortArray('desc')} disabled={!isArray}/>
        </div>
        <Button text={"Новый массив"} extraClass={styles.button} onClick={onClick}/>
      </div>
      <ul className={styles.array}>
        { isArray && isArray.map(( number, index ) => {
          return (
            <li key={index} className={styles.columns}>
              <Column index={number}/>
            </li>
          )
        })
      }
      </ul>
    </SolutionLayout>
  );
};
