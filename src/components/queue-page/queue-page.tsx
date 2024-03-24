import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import { useState, ChangeEvent } from "react";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "../stack-page/stack-page.module.css";

export const QueuePage: React.FC = () => {
  const [isLoader, setLoader] = useState(false);
  const [isDisabled, setDisabled] = useState(false);
  const [isError, setError] = useState(false);

  const [input, setInput] = useState<number>(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [steps, setSteps] = useState<number[] | null>(null);

  const startAlgorithm = () => {
    // const newSteps: number[] = fibbonacchiNumber(input);
    // setSteps(newSteps);
    // setLoader(true);
    // setCurrentStepIndex(0);
    
    // console.log(newSteps.length - 1);
    // let index = 0;
    // const intervalId = setInterval(() => {
    //   if (index >= newSteps.length - 1) {
    //     clearInterval(intervalId);
    //     setLoader(false);
    //     return;
    //   }
    //   setCurrentStepIndex(++index);
    // }, 1000);
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    // if(parseFloat(e.target.value) < 0 || Number.isInteger(parseFloat(e.target.value)) === false) {
    //   setError(true);
    //   return 
    // } else {
    //   setError(false);
    //   setInput(parseInt(e.target.value));
    // }
  }

  return (
    <SolutionLayout title="Очередь">
      <div className={styles.container}>
        <div className={styles.main}>
          <div className={styles.inputContainer}>
            <Input
              isLimitText={true}  
              max={4}
              maxLength={4}
              placeholder='Введите текст'
              type={'text'}
              onChange={onChange}
              extraClass={styles.input}
            />
            <Button
              text={"Добавить"}
              onClick={startAlgorithm}
              isLoader={isLoader}
              disabled={isDisabled}
            />
            <Button
              text={"Удалить"}
              onClick={startAlgorithm}
              isLoader={isLoader}
              disabled={isDisabled}
            />
          </div>
          <Button
            text={"Очистить"}
            onClick={startAlgorithm}
            isLoader={isLoader}
            disabled={isDisabled}
          />         
        </div>
        {/* <ul className={styles.circles}>
          {steps?.map((number, index) => {
            while(index <= currentStepIndex) {
              return (
                <li key={index} className={styles.circle}>
                  <Circle letter={number.toString()} index={index}/>
                </li>
              );
            }
          })}
        </ul> */}
      </div>
    </SolutionLayout>
  );
};
