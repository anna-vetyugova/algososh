import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import { useState, ChangeEvent } from "react";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "../list-page/list-page.module.css";

export const ListPage: React.FC = () => {
  return (
    <SolutionLayout title="Связный список">
      <div className={styles.container}>
        <div className={styles.buttons}>
          <Input
            isLimitText={true}  
            max={4}
            maxLength={4}
            placeholder='Введите значение'
            type={'text'}
            // onChange={onChange}
            extraClass={styles.input}
          />
          <Button
            text={"Добавить в head"}
            // onClick={startAlgorithm}
            // isLoader={isLoader}
            // disabled={isDisabled}
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
            placeholder='Введите индекс'
            type={'text'}
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
    </div>
    </SolutionLayout>
  );
};
